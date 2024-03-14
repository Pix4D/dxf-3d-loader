export { DxfLoader } from './DxfLoader';

/** See TextRenderer.DefaultOptions for default values and documentation. */
export type TextRendererOptions = {
  curveSubdivision: number;
  fallbackChar: string;
};

/** See DxfScene.DefaultOptions for default values and documentation. */
export type DxfSceneOptions = {
    arcTessellationAngle: number,
    minArcTessellationSubdivisions: number,
    wireframeMesh: boolean,
    suppressPaperSpace: boolean,
    textOptions: TextRendererOptions,
}

/** See DxfLoader.DefaultOptions for default values and documentation. */
export type DxfLoaderOptions = {
    canvasWidth: number,
    canvasHeight: number,
    autoResize: boolean,
    clearColor: THREE.Color,
    clearAlpha: number,
    canvasAlpha: boolean,
    canvasPremultipliedAlpha: boolean,
    antialias: boolean,
    colorCorrection?: boolean,
    blackWhiteInversion?: boolean,
    pointSize?: number,
    sceneOptions?: DxfSceneOptions,
    retainParsedDxf: boolean,
    preserveDrawingBuffer: boolean,
    fileEncoding: string
}

export type DxfLoaderLoadParams = {
    url: string,
    fonts: string[] | null,
    progressCbk: ((phase: "font" | "fetch" | "parse" | "prepare",
                   processedSize: number, totalSize: number) => void) | null,
    workerFactory: (() => Worker) | null
}

export type LayerInfo = {
    name: string,
    displayName: string,
    color: number
}

export type EventName = 'loaded' | 'cleared' | 'destroyed' | 'message';

export declare class DxfLoader {
    constructor(domContainer: HTMLElement, options: DxfLoaderOptions | null)
    Clear(): void
    Destroy(): void
    FitView(minX: number, maxX: number, minY: number, maxY: number, padding: number): void
    GetCamera(): THREE.OrthographicCamera
    GetCanvas(): HTMLCanvasElement
    GetLayers(): Iterable<LayerInfo>
    GetOrigin(): THREE.Vector2
    GetBounds(): {maxX: number, maxY: number, minX: number, minY: number} | null
    GetRenderer(): THREE.WebGLRenderer | null
    GetScene(): THREE.Scene
    HasRenderer(): boolean
    Load(params: DxfLoaderLoadParams): Promise<void>
    Render(): void
    SetSize(width: number, height: number): void
    SetView(center: THREE.Vector3, width: number): void
    ShowLayer(name: string, show: boolean): void
    Subscribe(eventName: EventName, eventHandler: (event: any) => void): void
    Unsubscribe(eventName: EventName, eventHandler: (event: any) => void): void
    GetIsFlat(): boolean
    bounds: DxfBounds
    origin: { x: number; y: number }
}

export declare namespace DxfLoader {
  export function SetupWorker(): void;
}

export type PatternLineDef = {
    angle: number
    base?: THREE.Vector2
    offset: THREE.Vector2
    dashes?: number[]
}

export class Pattern {
    constructor(lines: PatternLineDef[], name: string | null)

    static ParsePatFile(content: String): Pattern
}

export function RegisterPattern(pattern: Pattern, isMetric: boolean): void

/** @return {?Pattern} */
export function LookupPattern(name: string, isMetric: boolean): Pattern | null
