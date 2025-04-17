import { Pattern, RegisterPattern } from "../../Pattern.js"

RegisterPattern(Pattern.ParsePatFile(`
*LATTICE-07
;By John Hyslop,    Tile2Hatch tool © CVH 2020
;Developed in mm as metric QCAD3 pattern
270,17.568333418,17.568333164,25.4,25.4,22.436666582,-2.963333418
270,20.531666836,17.568333164,25.4,25.4,22.436666582,-2.963333418
270,4.868333164,4.868333418,25.4,25.4,22.436666582,-2.963333418
270,7.831666582,4.868333418,25.4,25.4,22.436666582,-2.963333418
180,17.568333418,7.831666582,0,25.4,22.436666582,-2.963333418
180,17.568333418,4.868333164,0,25.4,22.436666582,-2.963333418
180,4.868333418,20.531666836,0,25.4,22.436666582,-2.963333418
180,4.868333418,17.568333418,0,25.4,22.436666582,-2.963333418
`))
