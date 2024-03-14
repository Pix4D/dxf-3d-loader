import { Pattern, RegisterPattern } from "../../Pattern"

RegisterPattern(Pattern.ParsePatFile(`
*MAZE-01,MAZE-01 verbose
;By John Hyslop,    Tile2Hatch tool © CVH 2020
;Developed in inch as imperial QCAD3 pattern
180,0.95,0.92,0,1,0.25,-0.75
90,0.95,0.55,1,1,0.37,-0.63
90,0.83,0.55,1,1,0.25,-0.75
0,0.7,0.42,0,1,0.11,-0.89
180,0.57,0.8,0,1,0.38,-0.62
270,0.57,0.92,1,1,0.12,-0.88
0,0.07,0.92,0,1,0.5,-0.5
90,0.95,0.29,1,1,0.13,-0.87
180,0.45,0.05,0,1,0.38,-0.62
0,0.7,0.29,0,1,0.25,-0.75
270,0.45,0.17,1,1,0.12,-0.88
0,0.19,0.17,0,1,0.26,-0.74
90,0.7,0.17,1,1,0.12,-0.88
270,0.19,0.8,1,1,0.63,-0.37
0,0.31,0.29,0,1,0.26,-0.74
270,0.31,0.68,1,1,0.39,-0.61
180,0.7,0.68,0,1,0.39,-0.61
270,0.7,0.92,1,1,0.24,-0.76
180,0.95,0.17,0,1,0.25,-0.75
90,0.95,0.05,1,1,0.12,-0.88
0,0.57,0.05,0,1,0.38,-0.62
270,0.57,0.42,1,1,0.37,-0.63
270,0.7,0.55,1,1,0.13,-0.87
0,0.45,0.55,0,1,0.25,-0.75
90,0.45,0.42,1,1,0.13,-0.87
90,0.07,0.05,1,1,0.87,-0.13
`), false)
