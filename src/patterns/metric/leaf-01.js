import { Pattern, RegisterPattern } from "../../Pattern"

RegisterPattern(Pattern.ParsePatFile(`
*LEAF-01,LEAF-01
;By John Hyslop,    Using AutoCAD Lisp Tool
;Developed in mm as metric QCAD3 pattern
83.659808,22.86,5.08,25.244646742,2.804960862,2.30006779,-227.706714766
26.565051,22.352,4.826,34.077676066,11.35922544,0.567961272,-56.22816542
14.036243,21.336,4.572,80.085263502,6.160405002,1.047268924,-103.679614078
315,21.336,4.572,17.960512212,17.960512212,1.436840916,-34.484183508
83.659808,21.336,4.572,25.244646742,2.804960862,2.30006779,-227.706714766
0,20.066,4.572,0,25.4,1.27,-24.13
345.963757,20.828,3.048,24.6416195,6.160405002,1.047268924,-103.679614078
326.309932,20.066,3.556,56.357539812,7.04469254,0.915809954,-90.665192304
303.690068,19.558,4.318,35.223462446,7.04469254,0.915809954,-90.665192304
18.434949,18.796,4.064,56.225296744,8.032185358,0.803218612,-79.518633952
288.434949,18.542,4.826,56.225296744,8.032185358,0.803218612,-79.518633952
180,19.558,4.826,0,25.4,1.016,-24.384
258.690068,19.812,6.096,24.906749272,4.981349956,1.29515108,-128.219944728
243.434949,20.066,6.604,22.718450626,11.35922544,0.567961272,-56.22816542
225,20.828,7.366,17.960512212,17.960512212,1.077630814,-34.843393864
213.690068,21.59,7.874,35.223462446,7.04469254,0.915809954,-90.665192304
191.309932,22.86,8.128,104.608346536,4.981349956,1.29515108,-128.219944728
128.659808,7.62,10.668,35.701322044,3.966813504,1.626393496,-161.0129622
143.130102,8.636,9.906,91.44,5.08,1.27,-125.73
153.434949,9.652,9.398,22.718450626,11.35922544,1.135922544,-55.660204148
192.528808,9.652,9.398,104.69063898,2.755016842,2.341764176,-231.834664854
105.945396,9.652,9.398,80.246041438,3.488958224,1.84914794,-183.065643266
153.434949,10.668,8.89,22.718450626,11.35922544,1.135922544,-55.660204148
149.036243,11.938,8.128,56.628832894,4.356064186,1.481061808,-146.625116452
95.710593,11.938,8.128,229.992896122,2.527394488,2.552668504,-252.714172244
194.931417,11.938,8.128,289.599936166,1.636157764,3.94314045,-390.37089693
135,12.954,7.112,17.960512212,17.960512212,1.436840916,-34.484183508
123.690068,13.462,6.35,35.223462446,7.04469254,0.915809954,-90.665192304
199.653824,13.462,6.35,297.294468148,1.708588912,3.775981526,-373.822164724
71.565051,13.462,6.35,24.09655582,8.032185358,2.409655582,-77.912196982
119.054604,14.732,4.064,204.766485564,2.467066186,2.61509002,-258.893915536
288.434949,14.732,3.556,56.225296744,8.032185358,1.60643697,-78.715415594
21.801409,13.462,3.048,56.599939124,4.716661636,1.36783191,-135.415354264
11.309932,12.192,2.794,104.608346536,4.981349956,1.29515108,-128.219944728
0,11.43,2.794,0,25.4,0.762,-24.638
341.565051,9.906,3.302,24.09655582,8.032185358,1.60643697,-78.715415594
326.309932,8.382,4.318,56.357539812,7.04469254,1.831620162,-89.74938235
308.659808,7.366,5.588,35.701322044,3.966813504,1.626393496,-161.0129622
300.963757,6.604,6.858,91.477345366,4.356064186,1.481061808,-146.625116452
285.945396,6.096,8.636,80.246041438,3.488958224,1.84914794,-183.065643266
270,6.096,10.414,0,25.4,1.778,-23.622
279.462322,5.842,11.938,129.447762694,4.175734346,1.545021802,-152.95714646
285.945396,5.334,13.716,80.246041438,3.488958224,1.84914794,-183.065643266
123.690068,5.842,12.954,35.223462446,7.04469254,0.915809954,-90.665192304
161.565051,6.604,12.7,24.09655582,8.032185358,0.803218612,-79.518633952
171.869898,8.382,12.446,25.144717046,3.592102544,1.796051272,-177.809071102
171.869898,10.16,12.192,25.144717046,3.592102544,1.796051272,-177.809071102
161.565051,11.684,11.684,24.09655582,8.032185358,1.60643697,-78.715415594
161.565051,13.208,11.176,24.09655582,8.032185358,1.60643697,-78.715415594
146.309932,14.732,10.16,56.357539812,7.04469254,1.831620162,-89.74938235
119.744881,15.748,8.382,148.072666262,3.150482142,2.047813532,-202.733533318
111.801409,16.256,7.112,56.599939124,4.716661636,1.36783191,-135.415354264
90,16.256,6.096,0,25.4,1.016,-24.384
75.963757,16.002,5.08,24.6416195,6.160405002,1.047268924,-103.679614078
56.309932,15.494,4.318,56.357539812,7.04469254,0.915809954,-90.665192304
63.434949,15.24,3.81,22.718450626,11.35922544,0.567961272,-56.22816542
126.869898,16.002,2.794,35.56,5.08,1.27,-125.73
45,15.24,2.032,17.960512212,17.960512212,1.077630814,-34.843393864
233.130102,22.606,1.016,91.44,5.08,1.27,-125.73
258.690068,1.778,1.27,24.906749272,4.981349956,1.29515108,-128.219944728
258.690068,3.556,1.27,24.906749272,4.981349956,1.29515108,-128.219944728
198.434949,6.604,0.508,56.225296744,8.032185358,1.60643697,-78.715415594
225,7.874,0.508,17.960512212,17.960512212,0.718420458,-35.202603966
198.434949,8.636,0.762,56.225296744,8.032185358,0.803218612,-79.518633952
348.690068,7.366,1.016,24.906749272,4.981349956,1.29515108,-128.219944728
345.963757,6.35,1.27,24.6416195,6.160405002,1.047268924,-103.679614078
333.434949,5.334,1.778,22.718450626,11.35922544,1.135922544,-55.660204148
333.434949,3.81,2.54,22.718450626,11.35922544,1.703883816,-55.092242876
348.690068,2.54,2.794,24.906749272,4.981349956,1.29515108,-128.219944728
0,1.778,2.794,0,25.4,0.762,-24.638
8.130102,0,2.54,154.460405328,3.592102544,1.796051272,-177.809071102
236.309932,0.508,5.842,56.357539812,7.04469254,0.915809954,-90.665192304
236.309932,1.016,6.604,56.357539812,7.04469254,0.915809954,-90.665192304
213.690068,1.778,7.112,35.223462446,7.04469254,0.915809954,-90.665192304
0,0.762,7.112,0,25.4,1.016,-24.384
326.309932,0,7.62,56.357539812,7.04469254,0.915809954,-90.665192304
18.434949,0,6.604,56.225296744,8.032185358,0.803218612,-79.518633952
0,0,13.97,0,25.4,1.778,-23.622
14.036243,2.54,15.494,80.085263502,6.160405002,1.047268924,-103.679614078
21.801409,1.27,14.986,56.599939124,4.716661636,1.36783191,-135.415354264
30.963757,0,14.224,91.477345366,4.356064186,1.481061808,-146.625116452
254.054604,0.508,16.764,104.668749768,3.488958224,1.84914794,-183.065643266
158.198591,1.27,17.526,80.18324705,4.716661636,1.36783191,-135.415354264
153.434949,2.794,16.764,22.718450626,11.35922544,1.703883816,-55.092242876
158.198591,4.064,16.256,80.18324705,4.716661636,1.36783191,-135.415354264
180,5.334,16.256,0,25.4,1.27,-24.13
33.690068,4.572,15.748,35.223462446,7.04469254,0.915809954,-90.665192304
45,4.064,15.24,17.960512212,17.960512212,0.718420458,-35.202603966
53.130102,3.302,14.224,91.44,5.08,1.27,-125.73
56.309932,2.286,12.7,56.357539812,7.04469254,1.831620162,-89.74938235
51.340192,1.27,11.43,126.938033652,3.966813504,1.626393496,-161.0129622
38.659808,0,10.414,35.701322044,3.966813504,1.626393496,-161.0129622
180,20.828,12.192,0,25.4,2.54,-22.86
310.601295,20.828,12.192,35.815218692,2.755016842,2.341764176,-231.834664854
82.405357,20.828,12.192,204.774468022,1.678479244,3.843717484,-380.528029646
180,21.336,12.192,0,25.4,0.508,-24.892
194.036243,22.352,12.446,80.085263502,6.160405002,1.047268924,-103.679614078
198.434949,23.114,12.7,56.225296744,8.032185358,0.803218612,-79.518633952
0,21.082,9.398,0,25.4,2.032,-23.368
348.690068,19.812,9.652,24.906749272,4.981349956,1.29515108,-128.219944728
321.340192,18.542,10.668,126.938033652,3.966813504,1.626393496,-161.0129622
300.963757,17.78,11.938,91.477345366,4.356064186,1.481061808,-146.625116452
21.801409,16.51,11.43,56.599939124,4.716661636,1.36783191,-135.415354264
284.036243,16.256,12.446,80.085263502,6.160405002,1.047268924,-103.679614078
180,17.78,12.446,0,25.4,1.524,-23.876
261.869898,18.034,14.224,25.144717046,3.592102544,1.796051272,-177.809071102
248.198591,18.542,15.494,80.18324705,4.716661636,1.36783191,-135.415354264
225,19.558,16.51,17.960512212,17.960512212,1.436840916,-34.484183508
216.869898,20.574,17.272,35.56,5.08,1.27,-125.73
198.434949,22.86,18.034,56.225296744,8.032185358,2.409655582,-77.912196982
153.434949,9.144,16.51,22.718450626,11.35922544,1.703883816,-55.092242876
170.537678,10.668,16.256,25.054405568,4.175734346,1.545021802,-152.95714646
188.130102,12.446,16.51,154.460405328,3.592102544,1.796051272,-177.809071102
201.801409,13.716,17.018,56.599939124,4.716661636,1.36783191,-135.415354264
219.805571,15.24,18.288,35.773504272,3.252136752,1.9838035,-196.396538372
18.434949,24.638,6.35,56.225296744,8.032185358,0.803218612,-79.518633952
33.690068,23.876,5.842,35.223462446,7.04469254,0.915809954,-90.665192304
0,23.876,5.842,0,25.4,1.016,-24.384
80.537678,23.876,5.842,25.054405568,4.175734346,1.545021802,-152.95714646
36.869898,22.86,5.08,35.56,5.08,1.27,-125.73
341.565051,22.86,5.08,24.09655582,8.032185358,1.60643697,-78.715415594
53.130102,24.638,4.064,91.44,5.08,1.27,-125.73
38.659808,23.368,3.048,35.701322044,3.966813504,1.626393496,-161.0129622
9.462322,21.844,2.794,129.447762694,4.175734346,1.545021802,-152.95714646
180,24.13,8.128,0,25.4,1.27,-24.13
158.198591,25.4,7.62,80.18324705,4.716661636,1.36783191,-135.415354264
216.869898,23.622,1.778,35.56,5.08,1.27,-125.73
206.565051,24.638,2.286,34.077676066,11.35922544,1.135922544,-55.660204148
198.434949,25.4,2.54,56.225296744,8.032185358,0.803218612,-79.518633952
90,24.638,0,0,25.4,0.508,-24.892
26.565051,24.384,13.462,34.077676066,11.35922544,1.135922544,-55.660204148
56.309932,24.384,13.462,56.357539812,7.04469254,1.831620162,-89.74938235
36.869898,24.384,13.462,35.56,5.08,1.27,-125.73
30.963757,23.114,12.7,91.477345366,4.356064186,1.481061808,-146.625116452
78.690068,23.114,12.7,24.906749272,4.981349956,3.885452986,-125.629642822
156.037511,25.4,11.684,193.423444496,2.578979348,2.501609932,-247.659378188
30.963757,24.13,9.652,91.477345366,4.356064186,1.481061808,-146.625116452
14.036243,23.114,9.398,80.085263502,6.160405002,1.047268924,-103.679614078
180,25.4,18.034,0,25.4,2.54,-22.86
0,21.844,22.098,0,25.4,2.286,-23.114
11.309932,24.13,22.098,104.608346536,4.981349956,1.29515108,-128.219944728
135,25.4,20.828,17.960512212,17.960512212,1.796051272,-34.124973152
0,24.384,19.304,0,25.4,1.016,-24.384
345.963757,23.368,19.558,24.6416195,6.160405002,1.047268924,-103.679614078
333.434949,22.352,20.066,22.718450626,11.35922544,1.135922544,-55.660204148
315,21.844,20.574,17.960512212,17.960512212,0.718420458,-35.202603966
306.869898,21.082,21.59,35.56,5.08,1.27,-125.73
11.309932,19.812,21.336,104.608346536,4.981349956,1.29515108,-128.219944728
284.036243,19.558,22.352,80.085263502,6.160405002,1.047268924,-103.679614078
180,21.082,22.352,0,25.4,1.524,-23.876
14.036243,16.51,22.606,80.085263502,6.160405002,1.047268924,-103.679614078
18.434949,15.748,22.352,56.225296744,8.032185358,0.803218612,-79.518633952
33.690068,14.986,21.844,35.223462446,7.04469254,0.915809954,-90.665192304
230.194429,16.51,19.812,162.6068376,3.252136752,1.9838035,-196.396538372
239.036243,17.272,21.082,56.628832894,4.356064186,1.481061808,-146.625116452
236.309932,18.288,22.606,56.357539812,7.04469254,1.831620162,-89.74938235
213.690068,19.05,23.114,35.223462446,7.04469254,0.915809954,-90.665192304
198.434949,19.812,23.368,56.225296744,8.032185358,0.803218612,-79.518633952
0,18.796,23.368,0,25.4,1.016,-24.384
345.963757,17.78,23.622,24.6416195,6.160405002,1.047268924,-103.679614078
261.869898,21.336,24.13,25.144717046,3.592102544,1.796051272,-177.809071102
248.198591,21.844,25.4,80.18324705,4.716661636,1.36783191,-135.415354264
36.869898,13.97,21.082,35.56,5.08,1.27,-125.73
0,13.97,21.082,0,25.4,2.032,-23.368
78.690068,13.97,21.082,24.906749272,4.981349956,2.590301906,-126.924793648
33.690068,13.208,20.574,35.223462446,7.04469254,0.915809954,-90.665192304
30.963757,11.938,19.812,91.477345366,4.356064186,1.481061808,-146.625116452
336.037511,11.938,19.812,193.423444496,2.578979348,2.501609932,-247.659378188
79.380345,11.938,19.812,283.976346702,1.560309554,4.134820534,-409.347222706
26.565051,10.922,19.304,34.077676066,11.35922544,1.135922544,-55.660204148
9.462322,9.398,19.05,129.447762694,4.175734346,1.545021802,-152.95714646
318.814075,9.398,19.05,234.164238554,2.389431086,2.700057084,-267.30564649
82.405357,9.398,19.05,204.774468022,1.678479244,3.843717484,-380.528029646
0,8.382,19.05,0,25.4,1.016,-24.384
0,7.366,19.05,0,25.4,1.016,-24.384
0,5.08,19.304,0,25.4,1.524,-23.876
104.036243,5.334,18.288,80.085263502,6.160405002,1.047268924,-103.679614078
201.801409,6.604,18.796,56.599939124,4.716661636,1.36783191,-135.415354264
123.690068,7.62,17.272,35.223462446,7.04469254,1.831620162,-89.74938235
338.198591,16.51,24.13,80.18324705,4.716661636,1.36783191,-135.415354264
333.434949,14.986,24.892,22.718450626,11.35922544,1.703883816,-55.092242876
348.690068,13.716,25.146,24.906749272,4.981349956,1.29515108,-128.219944728
0,11.684,25.146,0,25.4,2.032,-23.368
18.434949,10.16,24.638,56.225296744,8.032185358,1.60643697,-78.715415594
26.565051,8.636,23.876,34.077676066,11.35922544,1.703883816,-55.092242876
45,7.366,22.606,17.960512212,17.960512212,1.796051272,-34.124973152
71.565051,6.858,21.082,24.09655582,8.032185358,1.60643697,-78.715415594
81.869898,6.604,19.304,25.144717046,3.592102544,1.796051272,-177.809071102
;0,5.08,19.304,0,25.4,1.524,-23.876
315,0,20.828,17.960512212,17.960512212,0.718420458,-35.202603966
198.434949,0.762,22.606,56.225296744,8.032185358,0.803218612,-79.518633952
343.300756,0.762,22.606,184.898786158,2.432878802,2.651837978,-262.531947376
74.744881,0.762,22.606,104.703186326,2.22772732,2.896045516,-286.708512434
206.565051,1.27,22.86,34.077676066,11.35922544,0.567961272,-56.22816542
213.690068,2.032,23.368,35.223462446,7.04469254,0.915809954,-90.665192304
216.869898,3.048,24.13,35.56,5.08,1.27,-125.73
352.874984,3.048,24.13,25.203858152,3.150482142,2.047813532,-202.733533318
78.690068,3.048,24.13,24.906749272,4.981349956,1.29515108,-128.219944728
213.690068,3.81,24.638,35.223462446,7.04469254,0.915809954,-90.665192304
213.690068,4.572,25.146,35.223462446,7.04469254,0.915809954,-90.665192304
206.565051,5.08,25.4,34.077676066,11.35922544,0.567961272,-56.22816542
45,7.112,25.146,17.960512212,17.960512212,0.359210356,-35.561814322
56.309932,6.604,24.384,56.357539812,7.04469254,0.915809954,-90.665192304
56.309932,5.588,22.86,56.357539812,7.04469254,1.831620162,-89.74938235
53.130102,4.826,21.844,91.44,5.08,1.27,-125.73
45,3.556,20.574,17.960512212,17.960512212,1.796051272,-34.124973152
36.869898,2.54,19.812,35.56,5.08,1.27,-125.73
18.434949,1.016,19.304,56.225296744,8.032185358,1.60643697,-78.715415594
0,0,19.304,0,25.4,1.016,-24.384
81.253838,24.13,22.098,179.594740378,1.931126186,3.340848284,-330.743991038
`))
