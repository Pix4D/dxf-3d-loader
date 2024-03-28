import * as three from 'three';
import { BatchingKey } from 'dxf-viewer/src/BatchingKey';
import { DxfWorker } from './DxfWorker';
import { MaterialKey } from 'dxf-viewer/src/MaterialKey';
import { ColorCode, DxfScene3D } from './DxfScene3D';
import { RBTree } from 'dxf-viewer/src/RBTree';

/** Level in "message" events. */
const MessageLevel = Object.freeze({
  INFO: 'info',
  WARN: 'warn',
  ERROR: 'error',
});

/** The representation class for the viewer, based on Three.js WebGL renderer. */
export class DxfLoader {
  /** @param domContainer Container element to create the canvas in. Usually empty div. Should not
   *  have padding if auto-resize feature is used.
   * @param options Some options can be overridden if specified. See DxfViewer.DefaultOptions.
   */
  constructor(domContainer, options = null) {
    this.domContainer = domContainer;
    this.options = Object.create(DxfLoader.DefaultOptions);
    if (options) {
      Object.assign(this.options, options);
    }
    options = this.options;

    this.clearColor = this.options.clearColor.getHex();

    this.scene = new three.Scene();

    this.isFlat = true;

    this.simpleColorMaterial = [];
    this.simplePointMaterial = [];
    for (let i = 0; i < InstanceType.MAX; i++) {
      this.simpleColorMaterial[i] = this._CreateSimpleColorMaterial(i);
      this.simplePointMaterial[i] = this._CreateSimplePointMaterial(i);
    }

    this.canvas = this.domContainer;

    /* Indexed by MaterialKey, value is {key, material}. */
    this.materials = new RBTree((m1, m2) => m1.key.Compare(m2.key));
    /* Indexed by layer name, value is Layer instance. */
    this.layers = new Map();
    /* Indexed by block name, value is Block instance. */
    this.blocks = new Map();

    /** Set during data loading. */
    this.worker = null;
  }

  GetIsFlat() {
    return this.isFlat;
  }

  GetCanvas() {
    return this.canvas;
  }

  /** Load DXF into the viewer. Old content is discarded, state is reset.
   * @param url {string} DXF file URL.
   * @param fonts {?string[]} List of font URLs. Files should have typeface.js format. Fonts are
   *  used in the specified order, each one is checked until necessary glyph is found. Text is not
   *  rendered if fonts are not specified.
   * @param progressCbk {?Function} (phase, processedSize, totalSize)
   *  Possible phase values:
   *  * "font"
   *  * "fetch"
   *  * "parse"
   *  * "prepare"
   * @param workerFactory {?Function} Factory for worker creation. The worker script should
   *  invoke DxfViewer.SetupWorker() function.
   */
  async Load({ url, fonts = null, progressCbk = null, workerFactory = null }) {
    if (url === null || url === undefined) {
      throw new Error('`url` parameter is not specified');
    }

    this.Clear();

    this.worker = new DxfWorker(workerFactory ? workerFactory() : null);
    const scene = await this.worker.Load(url, fonts, this.options, progressCbk);
    await this.worker.Destroy();
    this.worker = null;

    this.origin = scene.origin;
    this.bounds = scene.bounds;
    this.hasMissingChars = scene.hasMissingChars;

    for (const layer of scene.layers) {
      this.layers.set(layer.name, new Layer(layer.name, layer.color));
    }

    /* Load all blocks on the first pass. */
    for (const batch of scene.batches) {
      if (
        batch.key.blockName !== null &&
        batch.key.geometryType !== BatchingKey.GeometryType.BLOCK_INSTANCE &&
        batch.key.geometryType !== BatchingKey.GeometryType.POINT_INSTANCE
      ) {
        let block = this.blocks.get(batch.key.blockName);
        if (!block) {
          block = new Block();
          this.blocks.set(batch.key.blockName, block);
        }
        block.PushBatch(new Batch(this, scene, batch));
      }
    }

    if (scene.bounds) {
    const verticalExtent = scene.bounds.maxZ - scene.bounds.minZ;
    this.isFlat = verticalExtent < 0.000000001;

    console.log(`DXF scene:
                     isFlat ${this.isFlat}
                     vertical extent ${verticalExtent}
                     ${scene.batches.length} batches,
                     ${this.layers.size} layers,
                     ${this.blocks.size} blocks,
                     vertices ${scene.vertices.byteLength} B,
                     indices ${scene.indices.byteLength} B
                     transforms ${scene.transforms.byteLength} B`);
    } else {
      throw Error("Empty document")
    }



    /* Instantiate all entities. */
    for (const batch of scene.batches) {
      this._LoadBatch(scene, batch);
    }

    this._Emit('loaded');

    if (this.hasMissingChars) {
      this._Message(
        'Some characters cannot be properly displayed due to missing fonts',
        MessageLevel.WARN,
      );
    }
  }

  /** @return {Iterable<{name:String, color:number}>} List of layer names. */
  GetLayers() {
    const result = [];
    for (const lyr of this.layers.values()) {
      result.push({ name: lyr.name, color: this._TransformColor(lyr.color) });
    }
    return result;
  }

  ShowLayer(name, show) {
    const layer = this.layers.get(name);
    if (!layer) {
      return;
    }
    for (const obj of layer.objects) {
      obj.visible = show;
    }
  }

  /** Reset the viewer state. */
  Clear() {
    if (this.worker) {
      this.worker.Destroy(true);
      this.worker = null;
    }

    this.scene.clear();

    for (const layer of this.layers.values()) {
      layer.Dispose();
    }
    this.layers.clear();
    this.blocks.clear();
    this.materials.each(e => e.material.dispose());
    this.materials.clear();
    this._Emit('cleared');
  }

  /** Free all resources. The viewer object should not be used after this method was called. */
  Destroy() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    this.Clear();
    this._Emit('destroyed');
    for (const m of this.simplePointMaterial) {
      m.dispose();
    }
    for (const m of this.simpleColorMaterial) {
      m.dispose();
    }
    this.simplePointMaterial = null;
    this.simpleColorMaterial = null;
  }

  /** @return {Scene} three.js scene for the viewer. Can be used to add custom entities on the
   *      scene. Remember to apply scene origin available via GetOrigin() method.
   */
  GetScene() {
    return this.scene;
  }

  /** @return {Camera} three.js camera for the viewer. */
  GetCamera() {
    return this.camera;
  }

  /** @return {Vector2} Scene origin in global drawing coordinates. */
  GetOrigin() {
    return this.origin;
  }

  /** Subscribe to the specified event. The following events are defined:
   *  * "loaded" - new scene loaded.
   *  * "cleared" - current scene cleared.
   *  * "destroyed" - viewer instance destroyed.
   *  * "resized" - viewport size changed. Details: {width, height}
   *  * "pointerdown" - Details: {domEvent, position:{x,y}}, position is in scene coordinates.
   *  * "pointerup"
   *  * "viewChanged"
   *  * "message" - Some message from the viewer. {message: string, level: string}.
   *
   * @param eventName {string}
   * @param eventHandler {function} Accepts event object.
   */
  Subscribe(eventName, eventHandler) {
    this.canvas.addEventListener(EVENT_NAME_PREFIX + eventName, eventHandler);
  }

  /** Unsubscribe from previously subscribed event. The arguments should match previous
   * Subscribe() call.
   *
   * @param eventName {string}
   * @param eventHandler {function}
   */
  Unsubscribe(eventName, eventHandler) {
    this.canvas.removeEventListener(EVENT_NAME_PREFIX + eventName, eventHandler);
  }

  // /////////////////////////////////////////////////////////////////////////////////////////////

  _Emit(eventName, data = null) {
    this.canvas.dispatchEvent(new CustomEvent(EVENT_NAME_PREFIX + eventName, { detail: data }));
  }

  _Message(message, level = MessageLevel.INFO) {
    this._Emit('message', { message, level });
  }

  _LoadBatch(scene, batch) {
    if (
      batch.key.blockName !== null &&
      batch.key.geometryType !== BatchingKey.GeometryType.BLOCK_INSTANCE &&
      batch.key.geometryType !== BatchingKey.GeometryType.POINT_INSTANCE
    ) {
      /* Block definition. */
      return;
    }
    const objects = new Batch(this, scene, batch).CreateObjects();

    const layer = this.layers.get(batch.key.layerName);

    for (const obj of objects) {
      this.scene.add(obj);
      if (layer) {
        layer.PushObject(obj);
      }
    }
  }

  _GetSimpleColorMaterial(color, instanceType = InstanceType.NONE) {
    const key = new MaterialKey(instanceType, null, color, 0);
    let entry = this.materials.find({ key });
    if (entry !== null) {
      return entry.material;
    }
    entry = {
      key,
      material: this._CreateSimpleColorMaterialInstance(color, instanceType),
    };
    this.materials.insert(entry);
    return entry.material;
  }

  _CreateSimpleColorMaterial(instanceType = InstanceType.NONE) {
    const shaders = this._GenerateShaders(instanceType, false);
    return new three.RawShaderMaterial({
      uniforms: {
        color: {
          value: new three.Color(0xff00ff),
        },
        opacity: {
          value: 1,
        },
      },
      vertexShader: shaders.vertex,
      fragmentShader: shaders.fragment,
      depthTest: false,
      depthWrite: false,
      glslVersion: three.GLSL3,
      side: three.DoubleSide,
    });
  }

  /** @param color {number} Color RGB numeric value.
   * @param instanceType {number}
   */
  _CreateSimpleColorMaterialInstance(color, instanceType = InstanceType.NONE) {
    const src = this.simpleColorMaterial[instanceType];
    /* Should reuse compiled shaders. */
    const m = src.clone();
    m.uniforms.color = { value: new three.Color(color) };
    return m;
  }

  _GetSimplePointMaterial(color, instanceType = InstanceType.NONE) {
    const key = new MaterialKey(instanceType, BatchingKey.GeometryType.POINTS, color, 0);
    let entry = this.materials.find({ key });
    if (entry !== null) {
      return entry.material;
    }
    entry = {
      key,
      material: this._CreateSimplePointMaterialInstance(
        color,
        this.options.pointSize,
        instanceType,
      ),
    };
    this.materials.insert(entry);
    return entry.material;
  }

  _CreateSimplePointMaterial(instanceType = InstanceType.NONE) {
    const shaders = this._GenerateShaders(instanceType, true);
    return new three.RawShaderMaterial({
      uniforms: {
        color: {
          value: new three.Color(0xff00ff),
        },
        pointSize: {
          value: 2,
        },
        opacity: {
          value: 1,
        }
      },
      vertexShader: shaders.vertex,
      fragmentShader: shaders.fragment,
      depthTest: false,
      depthWrite: false,
      glslVersion: three.GLSL3,
    });
  }

  /** @param color {number} Color RGB numeric value.
   * @param size {number} Rasterized point size in pixels.
   * @param instanceType {number}
   */
  _CreateSimplePointMaterialInstance(color, size = 2, instanceType = InstanceType.NONE) {
    const src = this.simplePointMaterial[instanceType];
    /* Should reuse compiled shaders. */
    const m = src.clone();
    m.uniforms.color = { value: new three.Color(color) };
    m.uniforms.size = { value: size };
    return m;
  }

  _GenerateShaders(instanceType, pointSize) {
    const fullInstanceAttr =
      instanceType === InstanceType.FULL
        ? `
            /* First row. */
            in vec3 instanceTransform0;
            /* Second row. */
            in vec3 instanceTransform1;
            /* Third row. */
            in vec3 instanceTransform2;
            `
        : '';
    const fullInstanceTransform =
      instanceType === InstanceType.FULL
        ? `
            pos.xy = mat2(instanceTransform0[0], instanceTransform1[0],
                          instanceTransform0[1], instanceTransform1[1]) * pos.xy +
                     vec2(instanceTransform0[2], instanceTransform1[2]);  
            pos.z += instanceTransform2[2];
            `
        : '';

    const pointInstanceAttr =
      instanceType === InstanceType.POINT
        ? `
            in vec2 instanceTransform;
            `
        : '';
    const pointInstanceTransform =
      instanceType === InstanceType.POINT
        ? `
            pos.xy += instanceTransform;
            `
        : '';

    const pointSizeUniform = pointSize ? 'uniform float pointSize;' : '';
    const pointSizeAssigment = pointSize ? 'gl_PointSize = pointSize;' : '';

    return {
      vertex: `

            precision highp float;
            precision highp int;
            in vec3 position;
            ${fullInstanceAttr}
            ${pointInstanceAttr}
            uniform mat4 modelViewMatrix;
            uniform mat4 projectionMatrix;
            ${pointSizeUniform}

            void main() {
                vec4 pos = vec4(position, 1.0);
                ${fullInstanceTransform}
                ${pointInstanceTransform}

                gl_Position = projectionMatrix * modelViewMatrix * pos;
                ${pointSizeAssigment}
            }
            `,
      fragment: `

            precision highp float;
            precision highp int;
            uniform vec3 color;
            uniform float opacity;
            out vec4 fragColor;

            void main() {
                fragColor = vec4(color, opacity);
            }
            `,
    };
  }

  /** Ensure the color is contrast enough with current background color.
   * @param color {number} RGB value.
   * @return {number} RGB value to use for rendering.
   */
  _TransformColor(color) {
    if (!this.options.colorCorrection && !this.options.blackWhiteInversion) {
      return color;
    }
    /* Just black and white inversion. */
    const bkgLum = Luminance(this.clearColor);
    if (color === 0xffffff && bkgLum >= 0.8) {
      return 0;
    }
    if (color === 0 && bkgLum <= 0.2) {
      return 0xffffff;
    }
    if (!this.options.colorCorrection) {
      return color;
    }
    const fgLum = Luminance(color);
    const MIN_TARGET_RATIO = 1.5;
    const contrast = ContrastRatio(color, this.clearColor);
    const diff = contrast >= 1 ? contrast : 1 / contrast;
    if (diff < MIN_TARGET_RATIO) {
      let targetLum;
      if (bkgLum > 0.5) {
        targetLum = bkgLum / 2;
      } else {
        targetLum = bkgLum * 2;
      }
      if (targetLum > fgLum) {
        color = Lighten(color, targetLum / fgLum);
      } else {
        color = Darken(color, fgLum / targetLum);
      }
    }
    return color;
  }
}

DxfLoader.MessageLevel = MessageLevel;

DxfLoader.DefaultOptions = {
  canvasWidth: 400,
  canvasHeight: 300,
  /** Automatically resize canvas when the container is resized. This options
   *  utilizes ResizeObserver API which is still not fully standardized. The specified canvas size
   *  is ignored if the option is enabled.
   */
  autoResize: false,
  /** Frame buffer clear color. */
  clearColor: new three.Color('#000'),
  /** Frame buffer clear color alpha value. */
  clearAlpha: 1.0,
  /** Use alpha channel in a framebuffer. */
  canvasAlpha: false,
  /** Assume premultiplied alpha in a framebuffer. */
  canvasPremultipliedAlpha: true,
  /** Use antialiasing. May degrade performance on poor hardware. */
  antialias: true,
  /** Correct entities colors to ensure that they are always visible with the current background
   * color.
   */
  colorCorrection: false,
  /** Simpler version of colorCorrection - just invert pure white or black entities if they are
   * invisible on current background color.
   */
  blackWhiteInversion: true,
  /** Size in pixels for rasterized points (dot mark). */
  pointSize: 2,
  /** Scene generation options. */
  sceneOptions: DxfScene3D.DefaultOptions,
};

DxfLoader.SetupWorker = function () {
  new DxfWorker(self, true);
};

const InstanceType = Object.freeze({
  /** Not instanced. */
  NONE: 0,
  /** Full affine transform per instance. */
  FULL: 1,
  /** Point instances, 2D-translation vector per instance. */
  POINT: 2,

  /** Number of types. */
  MAX: 3,
});

class Batch {
  /**
   * @param viewer {DxfLoader}
   * @param scene Serialized scene.
   * @param batch Serialized scene batch.
   */
  constructor(viewer, scene, batch) {
    this.viewer = viewer;
    this.key = batch.key;

    if (batch.hasOwnProperty('verticesOffset')) {
      const verticesArray = new Float32Array(
        scene.vertices,
        batch.verticesOffset * Float32Array.BYTES_PER_ELEMENT,
        batch.verticesSize,
      );
      if (
        this.key.geometryType !== BatchingKey.GeometryType.POINT_INSTANCE ||
        scene.pointShapeHasDot
      ) {
        this.vertices = new three.BufferAttribute(verticesArray, 3);
      }
      if (this.key.geometryType === BatchingKey.GeometryType.POINT_INSTANCE) {
        this.transforms = new three.InstancedBufferAttribute(verticesArray, 3);
      }
    }

    if (batch.hasOwnProperty('chunks')) {
      this.chunks = [];
      for (const rawChunk of batch.chunks) {
        const verticesArray = new Float32Array(
          scene.vertices,
          rawChunk.verticesOffset * Float32Array.BYTES_PER_ELEMENT,
          rawChunk.verticesSize,
        );
        const indicesArray = new Uint16Array(
          scene.indices,
          rawChunk.indicesOffset * Uint16Array.BYTES_PER_ELEMENT,
          rawChunk.indicesSize,
        );

        this.chunks.push({
          vertices: new three.BufferAttribute(verticesArray, 3),
          indices: new three.BufferAttribute(indicesArray, 1),
        });
      }
    }

    if (batch.hasOwnProperty('transformsOffset')) {
      const transformsArray = new Float32Array(
        scene.transforms,
        batch.transformsOffset * Float32Array.BYTES_PER_ELEMENT,
        batch.transformsSize,
      );
      /* Each transform is 3x2 matrix which is split into two 3D vectors which will occupy two
       * attribute slots.
       */
      const buf = new three.InstancedInterleavedBuffer(transformsArray, 9);
      this.transforms0 = new three.InterleavedBufferAttribute(buf, 3, 0);
      this.transforms1 = new three.InterleavedBufferAttribute(buf, 3, 3);
      this.transforms2 = new three.InterleavedBufferAttribute(buf, 3, 6);
    }

    if (
      this.key.geometryType === BatchingKey.GeometryType.BLOCK_INSTANCE ||
      this.key.geometryType === BatchingKey.GeometryType.POINT_INSTANCE
    ) {
      const layer = this.viewer.layers.get(this.key.layerName);
      if (layer) {
        this.layerColor = layer.color;
      } else {
        this.layerColor = 0;
      }
    }
  }

  GetInstanceType() {
    switch (this.key.geometryType) {
      case BatchingKey.GeometryType.BLOCK_INSTANCE:
        return InstanceType.FULL;
      case BatchingKey.GeometryType.POINT_INSTANCE:
        return InstanceType.POINT;
      default:
        return InstanceType.NONE;
    }
  }

  /** Create scene objects corresponding to batch data.
   * @param instanceBatch {?Batch} Batch with instance transform. Null for non-instanced object.
   */
  *CreateObjects(instanceBatch = null) {
    if (
      this.key.geometryType === BatchingKey.GeometryType.BLOCK_INSTANCE ||
      this.key.geometryType === BatchingKey.GeometryType.POINT_INSTANCE
    ) {
      if (instanceBatch !== null) {
        throw new Error('Unexpected instance batch specified for instance batch');
      }
      yield* this._CreateBlockInstanceObjects();
      return;
    }
    yield* this._CreateObjects(instanceBatch);
  }

  *_CreateObjects(instanceBatch) {
    const color = instanceBatch ? instanceBatch._GetInstanceColor(this.key.color) : this.key.color;

    //XXX line type
    const materialFactory =
      this.key.geometryType === BatchingKey.GeometryType.POINTS ||
      this.key.geometryType === BatchingKey.GeometryType.POINT_INSTANCE
        ? this.viewer._GetSimplePointMaterial
        : this.viewer._GetSimpleColorMaterial;

    const material = materialFactory.call(
      this.viewer,
      this.viewer._TransformColor(color),
      instanceBatch?.GetInstanceType() ?? InstanceType.NONE,
    );

    let objConstructor;
    switch (this.key.geometryType) {
      case BatchingKey.GeometryType.POINTS:
      /* This method also called for creating dots for shaped point instances. */
      case BatchingKey.GeometryType.POINT_INSTANCE:
        objConstructor = three.Points;
        break;
      case BatchingKey.GeometryType.LINES:
      case BatchingKey.GeometryType.INDEXED_LINES:
        objConstructor = three.LineSegments;
        break;
      case BatchingKey.GeometryType.TRIANGLES:
      case BatchingKey.GeometryType.INDEXED_TRIANGLES:
        objConstructor = three.Mesh;
        break;
      default:
        throw new Error('Unexpected geometry type:' + this.key.geometryType);
    }

    function CreateObject(vertices, indices) {
      // console.log(vertices, indices);
      const geometry = instanceBatch
        ? new three.InstancedBufferGeometry()
        : new three.BufferGeometry();
      geometry.setAttribute('position', vertices);
      instanceBatch?._SetInstanceTransformAttribute(geometry);
      if (indices) {
        geometry.setIndex(indices);
      }
      const obj = new objConstructor(geometry, material);
      obj.frustumCulled = false;
      obj.matrixAutoUpdate = false;
      return obj;
    }

    if (this.chunks) {
      for (const chunk of this.chunks) {
        yield CreateObject(chunk.vertices, chunk.indices);
      }
    } else {
      yield CreateObject(this.vertices);
    }
  }

  /**
   * @param geometry {InstancedBufferGeometry}
   */
  _SetInstanceTransformAttribute(geometry) {
    if (!geometry.isInstancedBufferGeometry) {
      throw new Error('InstancedBufferGeometry expected');
    }
    if (this.key.geometryType === BatchingKey.GeometryType.POINT_INSTANCE) {
      geometry.setAttribute('instanceTransform', this.transforms);
    } else {
      geometry.setAttribute('instanceTransform0', this.transforms0);
      geometry.setAttribute('instanceTransform1', this.transforms1);
      geometry.setAttribute('instanceTransform2', this.transforms2);
    }
  }

  *_CreateBlockInstanceObjects() {
    const block = this.viewer.blocks.get(this.key.blockName);
    if (!block) {
      return;
    }
    for (const batch of block.batches) {
      yield* batch.CreateObjects(this);
    }
    if (this.hasOwnProperty('vertices')) {
      /* Dots for point shapes. */
      yield* this._CreateObjects();
    }
  }

  /**
   * @param defColor {number} Color value for block definition batch.
   * @return {number} RGB color value for a block instance.
   */
  _GetInstanceColor(defColor) {
    if (defColor === ColorCode.BY_BLOCK) {
      return this.key.color;
    } else if (defColor === ColorCode.BY_LAYER) {
      return this.layerColor;
    } else {
      return defColor;
    }
  }
}

class Layer {
  constructor(name, color) {
    this.name = name;
    this.color = color;
    this.objects = [];
  }

  PushObject(obj) {
    this.objects.push(obj);
  }

  Dispose() {
    for (const obj of this.objects) {
      obj.geometry.dispose();
    }
    this.objects = null;
  }
}

class Block {
  constructor() {
    this.batches = [];
  }

  /** @param batch {Batch} */
  PushBatch(batch) {
    this.batches.push(batch);
  }
}

/** Custom viewer event names are prefixed with this string. */
const EVENT_NAME_PREFIX = '__dxf_';

/** Transform sRGB color component to linear color space. */
function LinearColor(c) {
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

/** Transform linear color component to sRGB color space. */
function SRgbColor(c) {
  return c < 0.003 ? c * 12.92 : Math.pow(c, 1 / 2.4) * 1.055 - 0.055;
}

/** Get relative luminance value for a color.
 * https://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
 * @param color {number} RGB color value.
 * @return {number} Luminance value in range [0; 1].
 */
function Luminance(color) {
  const r = LinearColor(((color & 0xff0000) >>> 16) / 255);
  const g = LinearColor(((color & 0xff00) >>> 8) / 255);
  const b = LinearColor((color & 0xff) / 255);

  return r * 0.2126 + g * 0.7152 + b * 0.0722;
}

/**
 * Get contrast ratio for a color pair.
 * https://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef
 * @param c1
 * @param c2
 * @return {number} Contrast ratio between the colors. Greater than one if the first color color is
 *  brighter than the second one.
 */
function ContrastRatio(c1, c2) {
  return (Luminance(c1) + 0.05) / (Luminance(c2) + 0.05);
}

function HlsToRgb({ h, l, s }) {
  let r, g, b;
  if (s === 0) {
    /* Achromatic */
    r = g = b = l;
  } else {
    function hue2rgb(p, q, t) {
      if (t < 0) {
        t += 1;
      }
      if (t > 1) {
        t -= 1;
      }
      if (t < 1 / 6) {
        return p + (q - p) * 6 * t;
      }
      if (t < 1 / 2) {
        return q;
      }
      if (t < 2 / 3) {
        return p + (q - p) * (2 / 3 - t) * 6;
      }
      return p;
    }

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return (
    (Math.min(Math.floor(SRgbColor(r) * 256), 255) << 16) |
    (Math.min(Math.floor(SRgbColor(g) * 256), 255) << 8) |
    Math.min(Math.floor(SRgbColor(b) * 256), 255)
  );
}

function RgbToHls(color) {
  const r = LinearColor(((color & 0xff0000) >>> 16) / 255);
  const g = LinearColor(((color & 0xff00) >>> 8) / 255);
  const b = LinearColor((color & 0xff) / 255);

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s;
  const l = (max + min) / 2;

  if (max === min) {
    /* Achromatic */
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return { h, l, s };
}

function Lighten(color, factor) {
  const hls = RgbToHls(color);
  hls.l *= factor;
  if (hls.l > 1) {
    hls.l = 1;
  }
  return HlsToRgb(hls);
}

function Darken(color, factor) {
  const hls = RgbToHls(color);
  hls.l /= factor;
  return HlsToRgb(hls);
}
