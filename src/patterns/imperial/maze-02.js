import { Pattern, RegisterPattern } from "../../Pattern"

RegisterPattern(Pattern.ParsePatFile(`
*MAZE-02,MAZE-02 verbose
;By John Hyslop,    Tile2Hatch tool © CVH 2020
;Developed in inch as imperial QCAD3 pattern
270,0.89999999,0.1,1,1,0.1,-0.9
0,0.69999999,0.1,0,1,0.2,-0.8
90,0,0.3,1,1,0.5,-0.5
270,0.89999999,0.9,1,1,0.5,-0.5
270,0.29999999,0.9,1,1,0.1,-0.9
180,0.29999999,0.9,0,1,0.4,-0.6
0,0.19999999,0.2,0,1,0.15,-0.85
90,0.19999999,0.3,1,1,0.2,-0.8
180,0.49999999,0.3,0,1,0.3,-0.7
90,0.49999999,0.1,1,1,0.2,-0.8
270,0.69999999,0.2,1,1,0.1,-0.9
0,0.59999999,0.2,0,1,0.1,-0.9
270,0.59999999,0.3,1,1,0.1,-0.9
180,0.69999999,0.3,0,1,0.1,-0.9
270,0.59999999,0.6,1,1,0.1,-0.9
0,0.29999999,0.6,0,1,0.3,-0.7
90,0.29999999,0.4,1,1,0.2,-0.8
180,0.69999999,0.4,0,1,0.4,-0.6
180,0.59999999,0.5,0,1,0.2,-0.8
270,0.79999999,0.8,1,1,0.5,-0.5
0,0.09999999,0.1,0,1,0.4,-0.6
0,0.09999999,0.8,0,1,0.7,-0.3
270,0.09999999,0.2,1,1,0.1,-0.9
90,0.09999999,0.3,1,1,0.5,-0.5
180,0.09999999,0.2,0,1,0.3,-0.7
180,0,0.3,0,1,0.20000001,-0.79999999
180,0.29999999,0,0,1,0.3,-0.7
270,0.69999999,0.7,1,1,0.2,-0.8
0,0.39999999,0,0,1,0.4,-0.6
0,0.19999999,0.7,0,1,0.5,-0.5
90,0.19999999,0.6,1,1,0.1,-0.9
270,0.59999999,0.1,1,1,0.1,-0.9
0,0.39999999,0.9,0,1,0.4,-0.6
270,0.39999999,1,1,1,0.1,-0.9
`), false)
