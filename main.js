let cameras = [
    {
        "id": 0,
        "img_name": "0/Cam001.jpg",
        "width": 1019,
        "height": 745,
        "position": [
            0.007232260564530732,
            0.809987791156739,
            3.33903731414556
        ],
        "rotation": [
            [
                0.9999727319388764,
                -0.0007335337134094191,
                0.007348285990037004
            ],
            [
                -0.0008200432778977561,
                -0.9999303163911514,
                0.011776667224411872
            ],
            [
                0.007339135352509657,
                -0.011782372010060363,
                -0.9999036517595554
            ]
        ],
        "fy": 1834.5526065144063,
        "fx": 1834.8835144895522,
        "frame": 0
    },
    {
        "id": 1,
        "img_name": "0/Cam009.jpg",
        "width": 1019,
        "height": 745,
        "position": [
            -0.6165335488790487,
            0.80852137412157626,
            3.246431529494429
        ],
        "rotation": [
            [
                0.9640291111670818,
                0.005004204478405751,
                0.2657495639882487
            ],
            [
                0.004274028344180947,
                -0.999985335592201,
                0.0033258506080031756
            ],
            [
                0.265762310164777,
                -0.0020703956365682973,
                -0.9640363623628463
            ]
        ],
        "fy": 1825.012808725286,
        "fx": 1825.3419959565524,
        "frame": 0
    },
    {
        "id": 2,
        "img_name": "0/Cam017.jpg",
        "width": 1019,
        "height": 745,
        "position": [
            -1.6304168150914842,
            0.809851937782668,
            2.6231187060691143
        ],
        "rotation": [
            [
                0.7049323660760144,
                0.002671698432660171,
                0.7092694983473891
            ],
            [
                -0.0019439873362473955,
                -0.9999818717734322,
                0.005698862846190836
            ],
            [
                0.7092718661921595,
                -0.0053961237928818635,
                -0.7049143931544477
            ]
        ],
        "fy": 1817.6611443382017,
        "fx": 1817.989005510805,
        "frame": 0
    },
    {
        "id": 3,
        "img_name": "0/Cam025.jpg",
        "width": 1019,
        "height": 745,
        "position": [
            -2.0113168248144313,
            0.8078401534316492,
            2.149913842280183
        ],
        "rotation": [
            [
                0.4967182043663495,
                -0.00218371811231741,
                0.8679091293599089
            ],
            [
                -0.01592531770566215,
                -0.9998514102028582,
                0.006598618895572357
            ],
            [
                0.8677657573948417,
                -0.01709938275380775,
                -0.49667917351384416
            ]
        ],
        "fy": 1827.9648690495333,
        "fx": 1828.2945887595636,
        "frame": 0
    },
    {
        "id": 4,
        "img_name": "0/Cam033.jpg",
        "width": 1019,
        "height": 745,
        "position": [
            -2.302752155827769,
            0.8082668944746969,
            1012.006391196510424591
        ],
        "rotation": [
            [
                -0.003999597914543362,
                0.013100107953590788,
                0.9999061907939797
            ],
            [
                0.0048216494549179045,
                -0.9999023124884512,
                0.013119343610955977
            ],
            [
                0.9999803772640024,
                0.004873669239157387,
                0.00393604307540181
            ]
        ],
        "fy": 1824.661597380939,
        "fx": 1824.990721262354,
        "frame": 0
    },
];



let camera = cameras[0];

function getProjectionMatrix(fx, fy, width, height) {
    const znear = 0.2;
    const zfar = 200;
    return [
        [(2 * fx) / width, 0, 0, 0],
        [0, -(2 * fy) / height, 0, 0],
        [0, 0, zfar / (zfar - znear), 1],
        [0, 0, -(zfar * znear) / (zfar - znear), 0],
    ].flat();
}

function getViewMatrix(camera) {
    const R = camera.rotation.flat();
    const t = [
        camera.position[0],
        camera.position[1],
        camera.position[2]];
    const camToWorld = [
        [R[0], R[1], R[2], 0],
        [R[3], R[4], R[5], 0],
        [R[6], R[7], R[8], 0],
        [
            -t[0] * R[0] - t[1] * R[3] - t[2] * R[6],
            -t[0] * R[1] - t[1] * R[4] - t[2] * R[7],
            -t[0] * R[2] - t[1] * R[5] - t[2] * R[8],
            1,
        ],
    ].flat();
    return camToWorld;
}
// function translate4(a, x, y, z) {
//     return [
//         ...a.slice(0, 12),
//         a[0] * x + a[4] * y + a[8] * z + a[12],
//         a[1] * x + a[5] * y + a[9] * z + a[13],
//         a[2] * x + a[6] * y + a[10] * z + a[14],
//         a[3] * x + a[7] * y + a[11] * z + a[15],
//     ];
// }

function multiply4(a, b) {
    return [
        b[0] * a[0] + b[1] * a[4] + b[2] * a[8] + b[3] * a[12],
        b[0] * a[1] + b[1] * a[5] + b[2] * a[9] + b[3] * a[13],
        b[0] * a[2] + b[1] * a[6] + b[2] * a[10] + b[3] * a[14],
        b[0] * a[3] + b[1] * a[7] + b[2] * a[11] + b[3] * a[15],
        b[4] * a[0] + b[5] * a[4] + b[6] * a[8] + b[7] * a[12],
        b[4] * a[1] + b[5] * a[5] + b[6] * a[9] + b[7] * a[13],
        b[4] * a[2] + b[5] * a[6] + b[6] * a[10] + b[7] * a[14],
        b[4] * a[3] + b[5] * a[7] + b[6] * a[11] + b[7] * a[15],
        b[8] * a[0] + b[9] * a[4] + b[10] * a[8] + b[11] * a[12],
        b[8] * a[1] + b[9] * a[5] + b[10] * a[9] + b[11] * a[13],
        b[8] * a[2] + b[9] * a[6] + b[10] * a[10] + b[11] * a[14],
        b[8] * a[3] + b[9] * a[7] + b[10] * a[11] + b[11] * a[15],
        b[12] * a[0] + b[13] * a[4] + b[14] * a[8] + b[15] * a[12],
        b[12] * a[1] + b[13] * a[5] + b[14] * a[9] + b[15] * a[13],
        b[12] * a[2] + b[13] * a[6] + b[14] * a[10] + b[15] * a[14],
        b[12] * a[3] + b[13] * a[7] + b[14] * a[11] + b[15] * a[15],
    ];
}

function invert4(a) {
    let b00 = a[0] * a[5] - a[1] * a[4];
    let b01 = a[0] * a[6] - a[2] * a[4];
    let b02 = a[0] * a[7] - a[3] * a[4];
    let b03 = a[1] * a[6] - a[2] * a[5];
    let b04 = a[1] * a[7] - a[3] * a[5];
    let b05 = a[2] * a[7] - a[3] * a[6];
    let b06 = a[8] * a[13] - a[9] * a[12];
    let b07 = a[8] * a[14] - a[10] * a[12];
    let b08 = a[8] * a[15] - a[11] * a[12];
    let b09 = a[9] * a[14] - a[10] * a[13];
    let b10 = a[9] * a[15] - a[11] * a[13];
    let b11 = a[10] * a[15] - a[11] * a[14];
    let det =
        b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
    if (!det) return null;
    return [
        (a[5] * b11 - a[6] * b10 + a[7] * b09) / det,
        (a[2] * b10 - a[1] * b11 - a[3] * b09) / det,
        (a[13] * b05 - a[14] * b04 + a[15] * b03) / det,
        (a[10] * b04 - a[9] * b05 - a[11] * b03) / det,
        (a[6] * b08 - a[4] * b11 - a[7] * b07) / det,
        (a[0] * b11 - a[2] * b08 + a[3] * b07) / det,
        (a[14] * b02 - a[12] * b05 - a[15] * b01) / det,
        (a[8] * b05 - a[10] * b02 + a[11] * b01) / det,
        (a[4] * b10 - a[5] * b08 + a[7] * b06) / det,
        (a[1] * b08 - a[0] * b10 - a[3] * b06) / det,
        (a[12] * b04 - a[13] * b02 + a[15] * b00) / det,
        (a[9] * b02 - a[8] * b04 - a[11] * b00) / det,
        (a[5] * b07 - a[4] * b09 - a[6] * b06) / det,
        (a[0] * b09 - a[1] * b07 + a[2] * b06) / det,
        (a[13] * b01 - a[12] * b03 - a[14] * b00) / det,
        (a[8] * b03 - a[9] * b01 + a[10] * b00) / det,
    ];
}

function rotate4(a, rad, x, y, z) {
    let len = Math.hypot(x, y, z);
    x /= len;
    y /= len;
    z /= len;
    let s = Math.sin(rad);
    let c = Math.cos(rad);
    let t = 1 - c;
    let b00 = x * x * t + c;
    let b01 = y * x * t + z * s;
    let b02 = z * x * t - y * s;
    let b10 = x * y * t - z * s;
    let b11 = y * y * t + c;
    let b12 = z * y * t + x * s;
    let b20 = x * z * t + y * s;
    let b21 = y * z * t - x * s;
    let b22 = z * z * t + c;
    return [
        a[0] * b00 + a[4] * b01 + a[8] * b02,
        a[1] * b00 + a[5] * b01 + a[9] * b02,
        a[2] * b00 + a[6] * b01 + a[10] * b02,
        a[3] * b00 + a[7] * b01 + a[11] * b02,
        a[0] * b10 + a[4] * b11 + a[8] * b12,
        a[1] * b10 + a[5] * b11 + a[9] * b12,
        a[2] * b10 + a[6] * b11 + a[10] * b12,
        a[3] * b10 + a[7] * b11 + a[11] * b12,
        a[0] * b20 + a[4] * b21 + a[8] * b22,
        a[1] * b20 + a[5] * b21 + a[9] * b22,
        a[2] * b20 + a[6] * b21 + a[10] * b22,
        a[3] * b20 + a[7] * b21 + a[11] * b22,
        ...a.slice(12, 16),
    ];
}

function translate4(a, x, y, z) {
    return [
        ...a.slice(0, 12),
        a[0] * x + a[4] * y + a[8] * z + a[12],
        a[1] * x + a[5] * y + a[9] * z + a[13],
        a[2] * x + a[6] * y + a[10] * z + a[14],
        a[3] * x + a[7] * y + a[11] * z + a[15],
    ];
}

var SLICE_NUM
var TOTAL_CAP
var SLICE_CAP
var STREAM_GS_FMT
var STREAM_ROW_LENGTH
var VERTEX_ROW_LENGTH
var defaultViewMatrix

function setup_consts(config) {
    SLICE_NUM = config.SLICE_NUM;
    TOTAL_CAP = config.TOTAL_CAP;
    SLICE_CAP = Math.ceil(TOTAL_CAP / SLICE_NUM);
    STREAM_GS_FMT = config.STREAM_GS_FMT;
    STREAM_ROW_LENGTH = 0;
    for (const [k, v] of Object.entries(STREAM_GS_FMT)) {
        if (k == "ENDIAN") {
            continue;
        }
        STREAM_ROW_LENGTH += v.length * 4;
    }
    console.log("STREAM_ROW_LENGTH", STREAM_ROW_LENGTH);
    VERTEX_ROW_LENGTH = config.VERTEX_ROW_LENGTH;
    defaultViewMatrix = config.INIT_VIEW;
}
function GS_TO_VERTEX(gs, full_gs=false) {
    // input list of gs objects
    // output buffer of binary data
    const buffer = new ArrayBuffer(gs.length * VERTEX_ROW_LENGTH);
    const vertexCount = gs.length;
    console.time("build buffer");
    if (full_gs) {
        // for the full gs, sort by end frame
        gs.sort((a, b) => a.end_frame - b.end_frame);
    } else {
        // for the slice gs, sort by start frame
        gs.sort((a, b) => a.start_frame - b.start_frame);
    }
    let curFrame = gs[0].start_frame;
    let curSliceStart = 0;
    let frame_spans = [];
    for (let j = 0; j < vertexCount; j++) {
        let attrs = gs[j];
        if (! full_gs) { // for slice
            if (attrs.start_frame != curFrame || j == vertexCount - 1) {
                frame_spans.push(
                    {
                        frame: curFrame,
                        from: curSliceStart,
                        to: j,
                        total: j - curSliceStart -1
                    }
                )
                curFrame = gs[j].start_frame;
                curSliceStart = j;
            }
        } else {
            frame_spans.push(attrs.end_frame)
        }

        const position = new Float32Array(buffer, j * VERTEX_ROW_LENGTH, 3);
        const scales = new Float32Array(buffer, j * VERTEX_ROW_LENGTH + 4 * 3, 3);
        const rgba = new Uint8ClampedArray(
            buffer,
            j * VERTEX_ROW_LENGTH + 4 * 3 + 4 * 3,
            4,
        );
        const rot = new Uint8ClampedArray(
            buffer,
            j * VERTEX_ROW_LENGTH + 4 * 3 + 4 * 3 + 4,
            4,
        );

        const qlen = Math.sqrt(
            attrs.rotation[0] ** 2 +
                attrs.rotation[1] ** 2 +
                attrs.rotation[2] ** 2 +
                attrs.rotation[3] ** 2,
        );

        rot[0] = (attrs.rotation[0] / qlen) * 128 + 128;
        rot[1] = (attrs.rotation[1] / qlen) * 128 + 128;
        rot[2] = (attrs.rotation[2] / qlen) * 128 + 128;
        rot[3] = (attrs.rotation[3] / qlen) * 128 + 128;

        scales[0] = Math.exp(attrs.scaling[0]);
        scales[1] = Math.exp(attrs.scaling[1]);
        scales[2] = Math.exp(attrs.scaling[2]);


        position[0] = attrs.xyz[0];
        position[1] = attrs.xyz[1];
        position[2] = attrs.xyz[2];

        const SH_C0 = 0.28209479177387814;
        rgba[0] = (0.5 + SH_C0 * attrs.f_dc[0]) * 255;
        rgba[1] = (0.5 + SH_C0 * attrs.f_dc[1]) * 255;
        rgba[2] = (0.5 + SH_C0 * attrs.f_dc[2]) * 255;
        rgba[3] = (1 / (1 + Math.exp(-attrs.opacity))) * 255;
        
        // if (j >= 0) {
        //     console.log("Vertex -------------", j, gs[j].start_frame, gs[j].end_frame);
        // }
    }
    console.timeEnd("build buffer");
    return {all:new Uint8Array(buffer), spans:frame_spans};
}

function PARSE_RAW_BYTES(arrayLike) {
    const view = new DataView(arrayLike.buffer, arrayLike.byteOffset, arrayLike.byteLength);
    const jsonObjects = [];
    const sizeOfObject = 100; // total bytes for one object
    
    for (let offset = 0; offset < arrayLike.byteLength; offset += sizeOfObject) {
        const start_frame = view.getUint32(offset, false); // true for little-endian
        const end_frame = view.getUint32(offset + 4, false);
        
        const xyz = [
            view.getFloat32(offset + 8, false),
            view.getFloat32(offset + 12, false),
            view.getFloat32(offset + 16, false),
        ];
        
        const f_dc = [
            view.getFloat32(offset + 20, false),
            view.getFloat32(offset + 24, false),
            view.getFloat32(offset + 28, false),
        ];
        
        // we dont really need f_rest
        const f_rest = NaN;

        const scaling = [
            view.getFloat32(offset + 68, false),
            view.getFloat32(offset + 72, false),
            view.getFloat32(offset + 76, false),
        ];
        
        const rotation = [
            view.getFloat32(offset + 80, false),
            view.getFloat32(offset + 84, false),
            view.getFloat32(offset + 88, false),
            view.getFloat32(offset + 92, false),
        ];
        
        const opacity = view.getFloat32(offset + 96, false);
        
        jsonObjects.push({
            start_frame,
            end_frame,
            xyz,
            f_dc,
            f_rest,
            scaling,
            rotation,
            opacity,
        });
    }
    return jsonObjects;
}

function createWorker(self, SLICE_CAP, SLICE_NUM) {

    let buffer;
    let vertexCount = 0;
    let viewProj;
    // 6*4 + 4 + 4 = 8*4
    // XYZ - Position (Float32)
    // XYZ - Scale (Float32)
    // RGBA - colors (uint8)
    // IJKL - quaternion/rot (uint8)
    const rowLength = 3 * 4 + 3 * 4 + 4 + 4;
    let lastProj = [];
    let depthIndex = new Uint32Array();
    let lastVertexCount = 0;

    var _floatView = new Float32Array(1);
    var _int32View = new Int32Array(_floatView.buffer);

    function floatToHalf(float) {
        _floatView[0] = float;
        var f = _int32View[0];

        var sign = (f >> 31) & 0x0001;
        var exp = (f >> 23) & 0x00ff;
        var frac = f & 0x007fffff;

        var newExp;
        if (exp == 0) {
            newExp = 0;
        } else if (exp < 113) {
            newExp = 0;
            frac |= 0x00800000;
            frac = frac >> (113 - exp);
            if (frac & 0x01000000) {
                newExp = 1;
                frac = 0;
            }
        } else if (exp < 142) {
            newExp = exp - 112;
        } else {
            newExp = 31;
            frac = 0;
        }

        return (sign << 15) | (newExp << 10) | (frac >> 13);
    }

    function packHalf2x16(x, y) {
        return (floatToHalf(x) | (floatToHalf(y) << 16)) >>> 0;
    }

    function generateTexture(subset = null) {
        if (!buffer) return;
        const f_buffer = new Float32Array(buffer);
        const u_buffer = new Uint8Array(buffer);

        var texwidth = 1024 * 2; // Set to your desired width
        var texheight = Math.ceil((2 * vertexCount) / texwidth); // Set to your desired height
        var texdata = new Uint32Array(texwidth * texheight * 4); // 4 components per pixel (RGBA)
        var texdata_c = new Uint8Array(texdata.buffer);
        var texdata_f = new Float32Array(texdata.buffer);

        // Here we convert from a .splat file buffer into a texture
        // With a little bit more foresight perhaps this texture file
        // should have been the native format as it'd be very easy to
        // load it into webgl.
        // for each 8xUin32 Row in the texture buffer:

        // 0-2: XYZ in 4 Byte each      : 12B
        // 3: RGBA in 1 Byte each       : 4B
        // 4-6: texture in 4 Byte each  : 12B
        // 7: placeholder for future    : 4B

        for (let i = 0; i < vertexCount; i++) {
            // currently we generate the full texture, instead of selectively
            // if (subset && subset.size >0 && !subset.includes(i)) continue;
            // x, y, z
            texdata_f[8 * i + 0] = f_buffer[8 * i + 0];
            texdata_f[8 * i + 1] = f_buffer[8 * i + 1];
            texdata_f[8 * i + 2] = f_buffer[8 * i + 2];

            // r, g, b, a
            texdata_c[4 * (8 * i + 7) + 0] = u_buffer[32 * i + 24 + 0];
            texdata_c[4 * (8 * i + 7) + 1] = u_buffer[32 * i + 24 + 1];
            texdata_c[4 * (8 * i + 7) + 2] = u_buffer[32 * i + 24 + 2];
            texdata_c[4 * (8 * i + 7) + 3] = u_buffer[32 * i + 24 + 3];

            // quaternions
            let scale = [
                f_buffer[8 * i + 3 + 0],
                f_buffer[8 * i + 3 + 1],
                f_buffer[8 * i + 3 + 2],
            ];
            let rot = [
                (u_buffer[32 * i + 28 + 0] - 128) / 128,
                (u_buffer[32 * i + 28 + 1] - 128) / 128,
                (u_buffer[32 * i + 28 + 2] - 128) / 128,
                (u_buffer[32 * i + 28 + 3] - 128) / 128,
            ];

            // Compute the matrix product of S and R (M = S * R)
            const M = [
                1.0 - 2.0 * (rot[2] * rot[2] + rot[3] * rot[3]),
                2.0 * (rot[1] * rot[2] + rot[0] * rot[3]),
                2.0 * (rot[1] * rot[3] - rot[0] * rot[2]),

                2.0 * (rot[1] * rot[2] - rot[0] * rot[3]),
                1.0 - 2.0 * (rot[1] * rot[1] + rot[3] * rot[3]),
                2.0 * (rot[2] * rot[3] + rot[0] * rot[1]),

                2.0 * (rot[1] * rot[3] + rot[0] * rot[2]),
                2.0 * (rot[2] * rot[3] - rot[0] * rot[1]),
                1.0 - 2.0 * (rot[1] * rot[1] + rot[2] * rot[2]),
            ].map((k, i) => k * scale[Math.floor(i / 3)]);

            const sigma = [
                M[0] * M[0] + M[3] * M[3] + M[6] * M[6],
                M[0] * M[1] + M[3] * M[4] + M[6] * M[7],
                M[0] * M[2] + M[3] * M[5] + M[6] * M[8],
                M[1] * M[1] + M[4] * M[4] + M[7] * M[7],
                M[1] * M[2] + M[4] * M[5] + M[7] * M[8],
                M[2] * M[2] + M[5] * M[5] + M[8] * M[8],
            ];

            texdata[8 * i + 4] = packHalf2x16(4 * sigma[0], 4 * sigma[1]);
            texdata[8 * i + 5] = packHalf2x16(4 * sigma[2], 4 * sigma[3]);
            texdata[8 * i + 6] = packHalf2x16(4 * sigma[4], 4 * sigma[5]);
        }

        self.postMessage({ texdata, texwidth, texheight, subset}, [texdata.buffer]);
    }

    function runSort(viewProj, subset=null) {
        if (!buffer) return;
        let full_rebuild = !subset || subset.size == 0;
        const f_buffer = new Float32Array(buffer);
        if (lastVertexCount == vertexCount && full_rebuild) {
            let dot =
                lastProj[2] * viewProj[2] +
                lastProj[6] * viewProj[6] +
                lastProj[10] * viewProj[10];
            if (Math.abs(dot - 1) < 0.01) {
                return;
            }
        } else {
            generateTexture(subset);
            lastVertexCount = vertexCount;
        }

        console.time("sort");
        let maxDepth = -Infinity;
        let minDepth = Infinity;
        let sizeList = new Int32Array(vertexCount);
        for (let i = 0; i < vertexCount; i++) {
            let depth =
                ((viewProj[2] * f_buffer[8 * i + 0] +
                    viewProj[6] * f_buffer[8 * i + 1] +
                    viewProj[10] * f_buffer[8 * i + 2]) *
                    4096) |
                0;
            sizeList[i] = depth;
            if (depth > maxDepth) maxDepth = depth;
            if (depth < minDepth) minDepth = depth;
        }

        // This is a 16 bit single-pass counting sort
        let depthInv = (256 * 256) / (maxDepth - minDepth);
        let counts0 = new Uint32Array(256 * 256);
        for (let i = 0; i < vertexCount; i++) {
            sizeList[i] = ((sizeList[i] - minDepth) * depthInv) | 0;
            counts0[sizeList[i]]++;
        }
        let starts0 = new Uint32Array(256 * 256);
        for (let i = 1; i < 256 * 256; i++)
            starts0[i] = starts0[i - 1] + counts0[i - 1];
        depthIndex = new Uint32Array(vertexCount);
        for (let i = 0; i < vertexCount; i++)
            depthIndex[starts0[sizeList[i]]++] = i;

        console.timeEnd("sort");

        lastProj = viewProj;
        if (! full_rebuild) {
            let skipBind = true;
            self.postMessage({ depthIndex, viewProj, vertexCount, skipBind}, [
                depthIndex.buffer,
            ]);
        } else {
            self.postMessage({ depthIndex, viewProj, vertexCount }, [
                depthIndex.buffer,
            ]);
        }
    }

    function processPlyBuffer(inputBuffer) {
        const ubuf = new Uint8Array(inputBuffer);
        // 10KB ought to be enough for a header...
        const header = new TextDecoder().decode(ubuf.slice(0, 1024 * 10));
        const header_end = "end_header\n";
        const header_end_index = header.indexOf(header_end);
        if (header_end_index < 0)
            throw new Error("Unable to read .ply file header");
        const vertexCount = parseInt(/element vertex (\d+)\n/.exec(header)[1]);
        console.log("Vertex Count", vertexCount);
        let row_offset = 0,
            offsets = {},
            types = {};
        const TYPE_MAP = {
            double: "getFloat64",
            int: "getInt32",
            uint: "getUint32",
            float: "getFloat32",
            short: "getInt16",
            ushort: "getUint16",
            uchar: "getUint8",
        };
        for (let prop of header
            .slice(0, header_end_index)
            .split("\n")
            .filter((k) => k.startsWith("property "))) {
            const [p, type, name] = prop.split(" ");
            const arrayType = TYPE_MAP[type] || "getInt8";
            types[name] = arrayType;
            offsets[name] = row_offset;
            row_offset += parseInt(arrayType.replace(/[^\d]/g, "")) / 8;
        }
        console.log("Bytes per row", row_offset, types, offsets);

        let dataView = new DataView(
            inputBuffer,
            header_end_index + header_end.length,
        );
        let row = 0;
        const attrs = new Proxy(
            {},
            {
                get(target, prop) {
                    if (!types[prop]) throw new Error(prop + " not found");
                    return dataView[types[prop]](
                        row * row_offset + offsets[prop],
                        true,
                    );
                },
            },
        );

        console.time("calculate importance");
        let sizeList = new Float32Array(vertexCount);
        let sizeIndex = new Uint32Array(vertexCount);
        for (row = 0; row < vertexCount; row++) {
            sizeIndex[row] = row;
            if (!types["scale_0"]) continue;
            const size =
                Math.exp(attrs.scale_0) *
                Math.exp(attrs.scale_1) *
                Math.exp(attrs.scale_2);
            const opacity = 1 / (1 + Math.exp(-attrs.opacity));
            sizeList[row] = size * opacity;
        }
        console.timeEnd("calculate importance");

        console.time("sort");
        sizeIndex.sort((b, a) => sizeList[a] - sizeList[b]);
        console.timeEnd("sort");

        // 6*4 + 4 + 4 = 8*4
        // XYZ - Position (Float32)
        // XYZ - Scale (Float32)
        // RGBA - colors (uint8)
        // IJKL - quaternion/rot (uint8)
        const rowLength = 3 * 4 + 3 * 4 + 4 + 4;
        const buffer = new ArrayBuffer(rowLength * vertexCount);

        console.time("build buffer");
        for (let j = 0; j < vertexCount; j++) {
            row = sizeIndex[j];

            const position = new Float32Array(buffer, j * rowLength, 3);
            const scales = new Float32Array(buffer, j * rowLength + 4 * 3, 3);
            const rgba = new Uint8ClampedArray(
                buffer,
                j * rowLength + 4 * 3 + 4 * 3,
                4,
            );
            const rot = new Uint8ClampedArray(
                buffer,
                j * rowLength + 4 * 3 + 4 * 3 + 4,
                4,
            );

            if (types["scale_0"]) {
                const qlen = Math.sqrt(
                    attrs.rot_0 ** 2 +
                        attrs.rot_1 ** 2 +
                        attrs.rot_2 ** 2 +
                        attrs.rot_3 ** 2,
                );

                rot[0] = (attrs.rot_0 / qlen) * 128 + 128;
                rot[1] = (attrs.rot_1 / qlen) * 128 + 128;
                rot[2] = (attrs.rot_2 / qlen) * 128 + 128;
                rot[3] = (attrs.rot_3 / qlen) * 128 + 128;

                scales[0] = Math.exp(attrs.scale_0);
                scales[1] = Math.exp(attrs.scale_1);
                scales[2] = Math.exp(attrs.scale_2);
            } else {
                scales[0] = 0.01;
                scales[1] = 0.01;
                scales[2] = 0.01;

                rot[0] = 255;
                rot[1] = 0;
                rot[2] = 0;
                rot[3] = 0;
            }

            position[0] = attrs.x;
            position[1] = attrs.y;
            position[2] = attrs.z;

            if (types["f_dc_0"]) {
                const SH_C0 = 0.28209479177387814;
                rgba[0] = (0.5 + SH_C0 * attrs.f_dc_0) * 255;
                rgba[1] = (0.5 + SH_C0 * attrs.f_dc_1) * 255;
                rgba[2] = (0.5 + SH_C0 * attrs.f_dc_2) * 255;
            } else {
                rgba[0] = attrs.red;
                rgba[1] = attrs.green;
                rgba[2] = attrs.blue;
            }
            if (types["opacity"]) {
                rgba[3] = (1 / (1 + Math.exp(-attrs.opacity))) * 255;
            } else {
                rgba[3] = 255;
            }
        }
        console.timeEnd("build buffer");
        return buffer;
    }

    const throttledSort = () => {
        if (!sortRunning) {
            sortRunning = true;
            let lastView = viewProj;
            runSort(lastView);
            setTimeout(() => {
                sortRunning = false;
                if (lastView !== viewProj) {
                    throttledSort();
                }
            }, 0);
        }
    };

    let sortRunning;
    let slicePtr = new Array(SLICE_NUM).fill(0); // indicates the number of gaussians in the slice
    let slicePtrHistory = new Array(SLICE_NUM).fill(0); 
    function getSlice(sId){               // returns the slice with the given id
        return new Uint8Array(buffer, sId * SLICE_CAP * rowLength, SLICE_CAP * rowLength);
    }


    self.onmessage = (e) => {
        if (e.data.ply) {
            vertexCount = 0;
            runSort(viewProj);
            buffer = processPlyBuffer(e.data.ply);
            vertexCount = Math.floor(buffer.byteLength / rowLength);
            postMessage({ buffer: buffer });
        } else if (e.data.buffer) {
            buffer = e.data.buffer;
            vertexCount = e.data.vertexCount;
        } else if (e.data.vertexCount) {
            vertexCount = e.data.vertexCount;
        } else if (e.data.view) {
            viewProj = e.data.view;
            throttledSort();
        } else if (e.data.resetSlice) {
            // vertexCount should not change
            let sId = e.data.resetSlice.sliceId;
            let data = e.data.resetSlice.data;
            let num_of_gs = Math.floor(data.length / rowLength);
            let num_of_gs_capped = Math.min(num_of_gs, SLICE_CAP);
            let bufferSlice = getSlice(sId);
            // fill in the slice with data
            bufferSlice.set(data.slice(0, num_of_gs_capped * rowLength));
            if (num_of_gs_capped < SLICE_CAP) {
                // fill the rest with zeros
                bufferSlice.fill(0, num_of_gs_capped * rowLength);
            }
            slicePtr[sId] = num_of_gs_capped;
            console.log("slice #", e.data.resetSlice.sliceId, `: reset with ${slicePtr[sId]} gs`);
        } else if (e.data.appendSlice){
            let sId = e.data.appendSlice.sliceId;
            let data = e.data.appendSlice.data; // data is bufferView not buffer, no need to create a view
            if (slicePtr[sId] >= SLICE_CAP) return;
            let num_of_gs = Math.floor(data.length / rowLength);
            let num_of_gs_capped = Math.min(num_of_gs, SLICE_CAP - slicePtr[sId]);
            if (num_of_gs > num_of_gs_capped) {
                console.warn("slice #", e.data.appendSlice.sliceId, `overflow from frame #`, e.data.appendSlice.frame);
            }
            let bufferSlice = getSlice(sId);
            // fill in the slice with data
            bufferSlice.set(data.slice(0, num_of_gs_capped * rowLength), slicePtr[sId] * rowLength);
            console.log("slice #", e.data.appendSlice.sliceId, `: increase from ${slicePtr[sId]} gs to ${slicePtr[sId] + num_of_gs_capped} gs, with ${num_of_gs} gs`);
            slicePtr[sId] += num_of_gs_capped;
            // do not runSort here
        } else if (e.data.reSort) {
            const reset_slices = e.data.reSort.reset_slices;
            let newVertexSpans = []
            for (let i = 0; i < SLICE_NUM; i++) {
                if (reset_slices.includes(i)) {
                    newVertexSpans.push([i*SLICE_CAP, (i+1)*SLICE_CAP]);
                } else {
                    if (slicePtr[i] == slicePtrHistory[i]) {
                        continue;
                    } else {
                        if (slicePtr[i] < slicePtrHistory[i]) {
                            console.error(`slice #${i} has less gs ${slicePtr[i]} than before ${slicePtrHistory[i]}`);
                        }
                        newVertexSpans.push([i*SLICE_CAP + slicePtrHistory[i],
                                             i*SLICE_CAP + slicePtr[i]]);
                    }
                }
            }
            runSort(viewProj, newVertexSpans);
        }
    };
}

const vertexShaderSource = `
#version 300 es
precision highp float;
precision highp int;

uniform highp usampler2D u_texture;
uniform mat4 projection, view;
uniform vec2 focal;
uniform vec2 viewport;

in vec2 position;
in int index;

out vec4 vColor;
out vec2 vPosition;

void main () {
    uvec4 cen = texelFetch(u_texture, ivec2((uint(index) & 0x3ffu) << 1, uint(index) >> 10), 0);
    vec4 cam = view * vec4(uintBitsToFloat(cen.xyz), 1);
    vec4 pos2d = projection * cam;

    float clip = 1.2 * pos2d.w;
    if (pos2d.z < -clip || pos2d.x < -clip || pos2d.x > clip || pos2d.y < -clip || pos2d.y > clip) {
        gl_Position = vec4(0.0, 0.0, 2.0, 1.0);
        return;
    }

    uvec4 cov = texelFetch(u_texture, ivec2(((uint(index) & 0x3ffu) << 1) | 1u, uint(index) >> 10), 0);
    vec2 u1 = unpackHalf2x16(cov.x), u2 = unpackHalf2x16(cov.y), u3 = unpackHalf2x16(cov.z);
    mat3 Vrk = mat3(u1.x, u1.y, u2.x, u1.y, u2.y, u3.x, u2.x, u3.x, u3.y);

    mat3 J = mat3(
        focal.x / cam.z, 0., -(focal.x * cam.x) / (cam.z * cam.z), 
        0., -focal.y / cam.z, (focal.y * cam.y) / (cam.z * cam.z), 
        0., 0., 0.
    );

    mat3 T = transpose(mat3(view)) * J;
    mat3 cov2d = transpose(T) * Vrk * T;

    float mid = (cov2d[0][0] + cov2d[1][1]) / 2.0;
    float radius = length(vec2((cov2d[0][0] - cov2d[1][1]) / 2.0, cov2d[0][1]));
    float lambda1 = mid + radius, lambda2 = mid - radius;

    if(lambda2 < 0.0) return;
    vec2 diagonalVector = normalize(vec2(cov2d[0][1], lambda1 - cov2d[0][0]));
    vec2 majorAxis = min(sqrt(2.0 * lambda1), 1024.0) * diagonalVector;
    vec2 minorAxis = min(sqrt(2.0 * lambda2), 1024.0) * vec2(diagonalVector.y, -diagonalVector.x);

    vColor = clamp(pos2d.z/pos2d.w+1.0, 0.0, 1.0) * vec4((cov.w) & 0xffu, (cov.w >> 8) & 0xffu, (cov.w >> 16) & 0xffu, (cov.w >> 24) & 0xffu) / 255.0;
    vPosition = position;

    vec2 vCenter = vec2(pos2d) / pos2d.w;
    gl_Position = vec4(
        vCenter 
        + position.x * majorAxis / viewport 
        + position.y * minorAxis / viewport, 0.0, 1.0);

}
`.trim();

const fragmentShaderSource = `
#version 300 es
precision highp float;

in vec4 vColor;
in vec2 vPosition;

out vec4 fragColor;

void main () {
    float A = -dot(vPosition, vPosition);
    if (A < -4.0) discard;
    float B = exp(A) * vColor.a;
    fragColor = vec4(B * vColor.rgb, B);
}

`.trim();


let viewMatrix;
async function main(config) {
    viewMatrix = defaultViewMatrix;
    let carousel = true;
    const params = new URLSearchParams(location.search);
    try {
        viewMatrix = JSON.parse(decodeURIComponent(location.hash.slice(1)));
        carousel = false;
    } catch (err) {}
    // const url = new URL(
    //     // params.get("url") || "train.splat",
    //     // "https://huggingface.co/cakewalk/splat-data/resolve/main/",
    // );
    //    "https://huggingface.co/NeutrinoLiu/testGS/resolve/main/a02_600.dat"
    //    "http://127.0.0.1:5500/streamable.dat"
    //     "http://127.0.0.1:5500/cook_100_5.dat"
    const url = config.MODEL_URL;
    const req = await fetch(url, {
        mode: "cors", // no-cors, *cors, same-origin
        credentials: "omit", // include, *same-origin, omit
    });
    console.log(req);
    if (req.status != 200)
        throw new Error(req.status + " Unable to load " + req.url);

    const rowLength = 3 * 4 + 3 * 4 + 4 + 4;
    const reader = req.body.getReader();

    // TODO reduce the size of the buffer, we dont need a full size buffer
    // let splatData = new Uint8Array(req.headers.get("content-length"));

    // TODO we dont need it
    const downsample = 1;
        // splatData.length / rowLength > 500000 ? 1 : 1 / devicePixelRatio;
    // console.log(splatData.length / rowLength, downsample);

    const worker = new Worker(
        URL.createObjectURL(
            new Blob(["(", createWorker.toString(), `)(self, ${SLICE_CAP}, ${SLICE_NUM})`], {
                type: "application/javascript",
            }),
        ),
    );

    const canvas = document.getElementById("canvas");
    const fps = document.getElementById("fps");
    const camid = document.getElementById("camid");

    let projectionMatrix;

    const gl = canvas.getContext("webgl2", {
        antialias: false,
    });

    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderSource);
    gl.compileShader(vertexShader);
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS))
        console.error(gl.getShaderInfoLog(vertexShader));

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderSource);
    gl.compileShader(fragmentShader);
    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS))
        console.error(gl.getShaderInfoLog(fragmentShader));

    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS))
        console.error(gl.getProgramInfoLog(program));

    gl.disable(gl.DEPTH_TEST); // Disable depth testing

    // Enable blending
    gl.enable(gl.BLEND);
    gl.blendFuncSeparate(
        gl.ONE_MINUS_DST_ALPHA,
        gl.ONE,
        gl.ONE_MINUS_DST_ALPHA,
        gl.ONE,
    );
    gl.blendEquationSeparate(gl.FUNC_ADD, gl.FUNC_ADD);

    const u_projection = gl.getUniformLocation(program, "projection");
    const u_viewport = gl.getUniformLocation(program, "viewport");
    const u_focal = gl.getUniformLocation(program, "focal");
    const u_view = gl.getUniformLocation(program, "view");

    // positions
    const triangleVertices = new Float32Array([-2, -2, 2, -2, 2, 2, -2, 2]);
    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, triangleVertices, gl.STATIC_DRAW);
    const a_position = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(a_position);
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.vertexAttribPointer(a_position, 2, gl.FLOAT, false, 0, 0);

    var texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);

    var u_textureLocation = gl.getUniformLocation(program, "u_texture");
    gl.uniform1i(u_textureLocation, 0);

    const indexBuffer = gl.createBuffer();
    const a_index = gl.getAttribLocation(program, "index");
    gl.enableVertexAttribArray(a_index);
    gl.bindBuffer(gl.ARRAY_BUFFER, indexBuffer);
    gl.vertexAttribIPointer(a_index, 1, gl.INT, false, 0, 0);
    gl.vertexAttribDivisor(a_index, 1);

    const resize = () => {
        gl.uniform2fv(u_focal, new Float32Array([camera.fx, camera.fy]));

        projectionMatrix = getProjectionMatrix(
            camera.fx,
            camera.fy,
            innerWidth,
            innerHeight,
        );

        gl.uniform2fv(u_viewport, new Float32Array([innerWidth, innerHeight]));

        gl.canvas.width = Math.round(innerWidth / downsample);
        gl.canvas.height = Math.round(innerHeight / downsample);
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

        gl.uniformMatrix4fv(u_projection, false, projectionMatrix);
    };

    window.addEventListener("resize", resize);
    resize();

    worker.onmessage = (e) => {
        if (e.data.buffer) {
            splatData = new Uint8Array(e.data.buffer);
            const blob = new Blob([splatData.buffer], {
                type: "application/octet-stream",
            });
            const link = document.createElement("a");
            link.download = "model.splat";
            link.href = URL.createObjectURL(blob);
            document.body.appendChild(link);
            link.click();
        } else if (e.data.texdata) {
            const { texdata, texwidth, texheight, subset} = e.data;
            // console.log(texdata)
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texParameteri(
                gl.TEXTURE_2D,
                gl.TEXTURE_WRAP_S,
                gl.CLAMP_TO_EDGE,
            );
            gl.texParameteri(
                gl.TEXTURE_2D,
                gl.TEXTURE_WRAP_T,
                gl.CLAMP_TO_EDGE,
            );
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

            if (! subset || subset.size == 0)
                gl.texImage2D(
                    gl.TEXTURE_2D,
                    0,
                    gl.RGBA32UI,
                    texwidth,
                    texheight,
                    0,
                    gl.RGBA_INTEGER,
                    gl.UNSIGNED_INT,
                    texdata,
                );
            else {
                for (let i = 0; i < subset.length; i++) {
                    let subset_from = subset[i][0];
                    let subset_to = subset[i][1];
                    
                    // the updated texture subset is slightly larger than the original subset
                    const W = texwidth;
                    const startY = Math.floor((subset_from * 8) / (W * 4));
                    const endY = Math.ceil((subset_to * 8) / (W * 4));
                    const numRows = endY - startY;
                    const real_from = startY * W * 4;
                    const real_to = (startY + numRows) * W * 4;
                    const subsetData = texdata.slice(real_from, real_to);
                    gl.texSubImage2D(
                        gl.TEXTURE_2D,
                        0,
                        0,
                        startY,
                        W,   // full texture line update
                        numRows,
                        gl.RGBA_INTEGER,
                        gl.UNSIGNED_INT,
                        subsetData,
                    );
                }
            }
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, texture);
        } else if (e.data.depthIndex) {
            const { depthIndex, viewProj } = e.data;
            if (! e.data.skipBind)
                gl.bindBuffer(gl.ARRAY_BUFFER, indexBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, depthIndex, gl.DYNAMIC_DRAW);
            vertexCount = e.data.vertexCount;
        }
    };

    let activeKeys = [];
	let currentCameraIndex = 0;

    window.addEventListener("keydown", (e) => {
        // if (document.activeElement != document.body) return;
        carousel = false;
        if (!activeKeys.includes(e.code)) activeKeys.push(e.code);
        if (/\d/.test(e.key)) {
            currentCameraIndex = parseInt(e.key)
            camera = cameras[currentCameraIndex];
            viewMatrix = getViewMatrix(camera);
        }
		if (['-', '_'].includes(e.key)){
			currentCameraIndex = (currentCameraIndex + cameras.length - 1) % cameras.length;
			viewMatrix = getViewMatrix(cameras[currentCameraIndex]);
		}
		if (['+', '='].includes(e.key)){
			currentCameraIndex = (currentCameraIndex + 1) % cameras.length;
			viewMatrix = getViewMatrix(cameras[currentCameraIndex]);
		}
        camid.innerText = "cam  " + currentCameraIndex;
        if (e.code == "KeyV") {
            location.hash =
                "#" +
                JSON.stringify(
                    viewMatrix.map((k) => Math.round(k * 100) / 100),
                );
                camid.innerText =""
        } else if (e.code === "KeyP") {
            carousel = true;
            camid.innerText =""
        }
    });
    window.addEventListener("keyup", (e) => {
        activeKeys = activeKeys.filter((k) => k !== e.code);
    });
    window.addEventListener("blur", () => {
        activeKeys = [];
    });

    window.addEventListener(
        "wheel",
        (e) => {
            carousel = false;
            e.preventDefault();
            const lineHeight = 10;
            const scale =
                e.deltaMode == 1
                    ? lineHeight
                    : e.deltaMode == 2
                    ? innerHeight
                    : 1;
            let inv = invert4(viewMatrix);
            if (e.shiftKey) {
                inv = translate4(
                    inv,
                    (e.deltaX * scale) / innerWidth,
                    (e.deltaY * scale) / innerHeight,
                    0,
                );
            } else if (e.ctrlKey || e.metaKey) {
                // inv = rotate4(inv,  (e.deltaX * scale) / innerWidth,  0, 0, 1);
                // inv = translate4(inv,  0, (e.deltaY * scale) / innerHeight, 0);
                // let preY = inv[13];
                inv = translate4(
                    inv,
                    0,
                    0,
                    (-10 * (e.deltaY * scale)) / innerHeight,
                );
                // inv[13] = preY;
            } else {
                let d = 4;
                inv = translate4(inv, 0, 0, d);
                inv = rotate4(inv, -(e.deltaX * scale) / innerWidth, 0, 1, 0);
                inv = rotate4(inv, (e.deltaY * scale) / innerHeight, 1, 0, 0);
                inv = translate4(inv, 0, 0, -d);
            }

            viewMatrix = invert4(inv);
        },
        { passive: false },
    );

    let startX, startY, down;
    canvas.addEventListener("mousedown", (e) => {
        carousel = false;
        e.preventDefault();
        startX = e.clientX;
        startY = e.clientY;
        down = e.ctrlKey || e.metaKey ? 2 : 1;
    });
    canvas.addEventListener("contextmenu", (e) => {
        carousel = false;
        e.preventDefault();
        startX = e.clientX;
        startY = e.clientY;
        down = 2;
    });

    canvas.addEventListener("mousemove", (e) => {
        e.preventDefault();
        if (down == 1) {
            let inv = invert4(viewMatrix);
            let dx = (5 * (e.clientX - startX)) / innerWidth;
            let dy = (5 * (e.clientY - startY)) / innerHeight;
            let d = 4;

            inv = translate4(inv, 0, 0, d);
            inv = rotate4(inv, dx, 0, 1, 0);
            inv = rotate4(inv, -dy, 1, 0, 0);
            inv = translate4(inv, 0, 0, -d);
            // let postAngle = Math.atan2(inv[0], inv[10])
            // inv = rotate4(inv, postAngle - preAngle, 0, 0, 1)
            // console.log(postAngle)
            viewMatrix = invert4(inv);

            startX = e.clientX;
            startY = e.clientY;
        } else if (down == 2) {
            let inv = invert4(viewMatrix);
            // inv = rotateY(inv, );
            // let preY = inv[13];
            inv = translate4(
                inv,
                (-10 * (e.clientX - startX)) / innerWidth,
                0,
                (10 * (e.clientY - startY)) / innerHeight,
            );
            // inv[13] = preY;
            viewMatrix = invert4(inv);

            startX = e.clientX;
            startY = e.clientY;
        }
    });
    canvas.addEventListener("mouseup", (e) => {
        e.preventDefault();
        down = false;
        startX = 0;
        startY = 0;
    });

    let altX = 0,
        altY = 0;
    canvas.addEventListener(
        "touchstart",
        (e) => {
            e.preventDefault();
            if (e.touches.length === 1) {
                carousel = false;
                startX = e.touches[0].clientX;
                startY = e.touches[0].clientY;
                down = 1;
            } else if (e.touches.length === 2) {
                // console.log('beep')
                carousel = false;
                startX = e.touches[0].clientX;
                altX = e.touches[1].clientX;
                startY = e.touches[0].clientY;
                altY = e.touches[1].clientY;
                down = 1;
            }
        },
        { passive: false },
    );
    canvas.addEventListener(
        "touchmove",
        (e) => {
            e.preventDefault();
            if (e.touches.length === 1 && down) {
                let inv = invert4(viewMatrix);
                let dx = (4 * (e.touches[0].clientX - startX)) / innerWidth;
                let dy = (4 * (e.touches[0].clientY - startY)) / innerHeight;

                let d = 4;
                inv = translate4(inv, 0, 0, d);
                // inv = translate4(inv,  -x, -y, -z);
                // inv = translate4(inv,  x, y, z);
                inv = rotate4(inv, dx, 0, 1, 0);
                inv = rotate4(inv, -dy, 1, 0, 0);
                inv = translate4(inv, 0, 0, -d);

                viewMatrix = invert4(inv);

                startX = e.touches[0].clientX;
                startY = e.touches[0].clientY;
            } else if (e.touches.length === 2) {
                // alert('beep')
                const dtheta =
                    Math.atan2(startY - altY, startX - altX) -
                    Math.atan2(
                        e.touches[0].clientY - e.touches[1].clientY,
                        e.touches[0].clientX - e.touches[1].clientX,
                    );
                const dscale =
                    Math.hypot(startX - altX, startY - altY) /
                    Math.hypot(
                        e.touches[0].clientX - e.touches[1].clientX,
                        e.touches[0].clientY - e.touches[1].clientY,
                    );
                const dx =
                    (e.touches[0].clientX +
                        e.touches[1].clientX -
                        (startX + altX)) /
                    2;
                const dy =
                    (e.touches[0].clientY +
                        e.touches[1].clientY -
                        (startY + altY)) /
                    2;
                let inv = invert4(viewMatrix);
                // inv = translate4(inv,  0, 0, d);
                inv = rotate4(inv, dtheta, 0, 0, 1);

                inv = translate4(inv, -dx / innerWidth, -dy / innerHeight, 0);

                // let preY = inv[13];
                inv = translate4(inv, 0, 0, 3 * (1 - dscale));
                // inv[13] = preY;

                viewMatrix = invert4(inv);

                startX = e.touches[0].clientX;
                altX = e.touches[1].clientX;
                startY = e.touches[0].clientY;
                altY = e.touches[1].clientY;
            }
        },
        { passive: false },
    );
    canvas.addEventListener(
        "touchend",
        (e) => {
            e.preventDefault();
            down = false;
            startX = 0;
            startY = 0;
        },
        { passive: false },
    );

    let jumpDelta = 0;
    let vertexCount = 0;

    let lastFrame = 0;
    let avgFps = 0;
    let start = 0;

    window.addEventListener("gamepadconnected", (e) => {
        const gp = navigator.getGamepads()[e.gamepad.index];
        console.log(
            `Gamepad connected at index ${gp.index}: ${gp.id}. It has ${gp.buttons.length} buttons and ${gp.axes.length} axes.`,
        );
    });
    window.addEventListener("gamepaddisconnected", (e) => {
        console.log("Gamepad disconnected");
    });

    let leftGamepadTrigger, rightGamepadTrigger;
    let curFrame = 0;
    const frame = (now) => {
        let inv = invert4(viewMatrix);
        let shiftKey = activeKeys.includes("Shift") || activeKeys.includes("ShiftLeft") || activeKeys.includes("ShiftRight")

        if (activeKeys.includes("ArrowUp")) {
            if (shiftKey) {
                inv = translate4(inv, 0, -0.03, 0);
            } else {
                inv = translate4(inv, 0, 0, 0.1);
            }
        }
        if (activeKeys.includes("ArrowDown")) {
            if (shiftKey) {
                inv = translate4(inv, 0, 0.03, 0);
            } else {
                inv = translate4(inv, 0, 0, -0.1);
            }
        }
        if (activeKeys.includes("ArrowLeft"))
            inv = translate4(inv, -0.03, 0, 0);
        //
        if (activeKeys.includes("ArrowRight"))
            inv = translate4(inv, 0.03, 0, 0);
        // inv = rotate4(inv, 0.01, 0, 1, 0);
        if (activeKeys.includes("KeyA")) inv = rotate4(inv, -0.01, 0, 1, 0);
        if (activeKeys.includes("KeyD")) inv = rotate4(inv, 0.01, 0, 1, 0);
        if (activeKeys.includes("KeyQ")) inv = rotate4(inv, 0.01, 0, 0, 1);
        if (activeKeys.includes("KeyE")) inv = rotate4(inv, -0.01, 0, 0, 1);
        if (activeKeys.includes("KeyW")) inv = rotate4(inv, 0.005, 1, 0, 0);
        if (activeKeys.includes("KeyS")) inv = rotate4(inv, -0.005, 1, 0, 0);

        const gamepads = navigator.getGamepads ? navigator.getGamepads() : [];
        let isJumping = activeKeys.includes("Space");
        for (let gamepad of gamepads) {
            if (!gamepad) continue;

            const axisThreshold = 0.1; // Threshold to detect when the axis is intentionally moved
            const moveSpeed = 0.06;
            const rotateSpeed = 0.02;

            // Assuming the left stick controls translation (axes 0 and 1)
            if (Math.abs(gamepad.axes[0]) > axisThreshold) {
                inv = translate4(inv, moveSpeed * gamepad.axes[0], 0, 0);
                carousel = false;
            }
            if (Math.abs(gamepad.axes[1]) > axisThreshold) {
                inv = translate4(inv, 0, 0, -moveSpeed * gamepad.axes[1]);
                carousel = false;
            }
            if(gamepad.buttons[12].pressed || gamepad.buttons[13].pressed){
                inv = translate4(inv, 0, -moveSpeed*(gamepad.buttons[12].pressed - gamepad.buttons[13].pressed), 0);
                carousel = false;
            }

            if(gamepad.buttons[14].pressed || gamepad.buttons[15].pressed){
                inv = translate4(inv, -moveSpeed*(gamepad.buttons[14].pressed - gamepad.buttons[15].pressed), 0, 0);
                carousel = false;
            }

            // Assuming the right stick controls rotation (axes 2 and 3)
            if (Math.abs(gamepad.axes[2]) > axisThreshold) {
                inv = rotate4(inv, rotateSpeed * gamepad.axes[2], 0, 1, 0);
                carousel = false;
            }
            if (Math.abs(gamepad.axes[3]) > axisThreshold) {
                inv = rotate4(inv, -rotateSpeed * gamepad.axes[3], 1, 0, 0);
                carousel = false;
            }

            let tiltAxis = gamepad.buttons[6].value - gamepad.buttons[7].value;
            if (Math.abs(tiltAxis) > axisThreshold) {
                inv = rotate4(inv, rotateSpeed * tiltAxis, 0, 0, 1);
                carousel = false;
            }
            if (gamepad.buttons[4].pressed && !leftGamepadTrigger) {
                camera = cameras[(cameras.indexOf(camera)+1)%cameras.length]
                inv = invert4(getViewMatrix(camera));
                carousel = false;
            }
            if (gamepad.buttons[5].pressed && !rightGamepadTrigger) {
                camera = cameras[(cameras.indexOf(camera)+cameras.length-1)%cameras.length]
                inv = invert4(getViewMatrix(camera));
                carousel = false;
            }
            leftGamepadTrigger = gamepad.buttons[4].pressed;
            rightGamepadTrigger = gamepad.buttons[5].pressed;
            if (gamepad.buttons[0].pressed) {
                isJumping = true;
                carousel = false;
            }
            if(gamepad.buttons[3].pressed){
                carousel = true;
            }
        }

        if (
            ["KeyJ", "KeyK", "KeyL", "KeyI"].some((k) => activeKeys.includes(k))
        ) {
            let d = 4;
            inv = translate4(inv, 0, 0, d);
            inv = rotate4(
                inv,
                activeKeys.includes("KeyJ")
                    ? -0.05
                    : activeKeys.includes("KeyL")
                    ? 0.05
                    : 0,
                0,
                1,
                0,
            );
            inv = rotate4(
                inv,
                activeKeys.includes("KeyI")
                    ? 0.05
                    : activeKeys.includes("KeyK")
                    ? -0.05
                    : 0,
                1,
                0,
                0,
            );
            inv = translate4(inv, 0, 0, -d);
        }

        viewMatrix = invert4(inv);

        if (carousel) {
            let inv = invert4(defaultViewMatrix);

            // const t = Math.sin((Date.now() - start) / 5000);
            const t = 0;
            inv = translate4(inv, 2.5 * t, 0, 6 * (1 - Math.cos(t)));
            inv = rotate4(inv, -0.6 * t, 0, 1, 0);

            viewMatrix = invert4(inv);
        }

        if (isJumping) {
            jumpDelta = Math.min(1, jumpDelta + 0.05);
        } else {
            jumpDelta = Math.max(0, jumpDelta - 0.05);
        }

        let inv2 = invert4(viewMatrix);
        inv2 = translate4(inv2, 0, -jumpDelta, 0);
        inv2 = rotate4(inv2, -0.1 * jumpDelta, 1, 0, 0);
        let actualViewMatrix = invert4(inv2);

        const viewProj = multiply4(projectionMatrix, actualViewMatrix);
        worker.postMessage({ view: viewProj });

        const currentFps = 1000 / (now - lastFrame) || 0;
        avgFps = avgFps * 0.9 + currentFps * 0.1;

        if (vertexCount > 0) {
            document.getElementById("spinner").style.display = "none";
            gl.uniformMatrix4fv(u_view, false, actualViewMatrix);
            gl.clear(gl.COLOR_BUFFER_BIT);
            gl.drawArraysInstanced(gl.TRIANGLE_FAN, 0, 4, vertexCount);
        } else {
            gl.clear(gl.COLOR_BUFFER_BIT);
            document.getElementById("spinner").style.display = "";
            start = Date.now() + 2000;
        }
        // const progress = (100 * vertexCount) / (splatData.length / rowLength);
        // if (progress < 100) {
        //     document.getElementById("progress").style.width = progress + "%";
        // } else {
        //     document.getElementById("progress").style.display = "none";
        // }
        fps.innerText = Math.round(avgFps);
        const curFrameDOM = document.getElementById("frame");
        curFrameDOM.innerText = curFrame;
        if (isNaN(currentCameraIndex)){
            camid.innerText = "";
        }
        lastFrame = now;
        requestAnimationFrame(frame);
    };

    frame();

    const selectFile = (file) => {
        const fr = new FileReader();
        if (/\.json$/i.test(file.name)) {
            fr.onload = () => {
                cameras = JSON.parse(fr.result);
                viewMatrix = getViewMatrix(cameras[0]);
                projectionMatrix = getProjectionMatrix(
                    camera.fx / downsample,
                    camera.fy / downsample,
                    canvas.width,
                    canvas.height,
                );
                gl.uniformMatrix4fv(u_projection, false, projectionMatrix);

                console.log("Loaded Cameras");
            };
            fr.readAsText(file);
        } else {
            stopLoading = true;
            fr.onload = () => {
                splatData = new Uint8Array(fr.result);
                console.log("Loaded", Math.floor(splatData.length / rowLength));

                if (
                    splatData[0] == 112 &&
                    splatData[1] == 108 &&
                    splatData[2] == 121 &&
                    splatData[3] == 10
                ) {
                    // ply file magic header means it should be handled differently
                    worker.postMessage({ ply: splatData.buffer });
                } else {
                    worker.postMessage({
                        buffer: splatData.buffer,
                        vertexCount: Math.floor(splatData.length / rowLength),
                    });
                }
            };
            fr.readAsArrayBuffer(file);
        }
    };

    window.addEventListener("hashchange", (e) => {
        try {
            viewMatrix = JSON.parse(decodeURIComponent(location.hash.slice(1)));
            carousel = false;
        } catch (err) {}
    });

    const preventDefault = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };
    document.addEventListener("dragenter", preventDefault);
    document.addEventListener("dragover", preventDefault);
    document.addEventListener("dragleave", preventDefault);
    // TODO implement our own drag and drop
    document.addEventListener("drop", (e) => {
        e.preventDefault();
        e.stopPropagation();
        selectFile(e.dataTransfer.files[0]);
    });

    let bytesRead = 0;
    let gaussians = [];
    let rowBuffer = new Uint8Array(STREAM_ROW_LENGTH);
    let rowBufferOffset = 0;

    console.log("start reading");
    /* --------------------------------- step 0 --------------------------------- */
    // read frame 0, with sizing MAX_CAP
    while (bytesRead < TOTAL_CAP * STREAM_ROW_LENGTH) {
        let { done, value } = await reader.read();
        // if there is any reminding fro previous read  
        let value_offset = 0;
        if (rowBufferOffset > 0){
            if (value.length + rowBufferOffset < STREAM_ROW_LENGTH){
                rowBuffer.set(value, rowBufferOffset);
                rowBufferOffset += value.length;
                continue;
            }
            value_offset = STREAM_ROW_LENGTH - rowBufferOffset;
            rowBuffer.set(value.slice(0, STREAM_ROW_LENGTH - rowBufferOffset), rowBufferOffset);
            gaussians.push(PARSE_RAW_BYTES(rowBuffer)[0]);
            // console.log("load single gaussian #", gaussians.length);
            bytesRead += STREAM_ROW_LENGTH;
            rowBuffer.fill(0);
            rowBufferOffset = 0
        }
        // batch parse this read
        value = value.slice(value_offset);
        const num_of_gs = Math.floor(value.length / STREAM_ROW_LENGTH);
        let parsed = PARSE_RAW_BYTES(value.slice(0, num_of_gs * STREAM_ROW_LENGTH));
        gaussians = gaussians.concat(parsed);
        let value_rest = value.slice(num_of_gs * STREAM_ROW_LENGTH);
        rowBuffer.set(value_rest);
        rowBufferOffset = value_rest.length;
        bytesRead += num_of_gs * STREAM_ROW_LENGTH;
    }
    console.log("read " + gaussians.length  + " gaussians");
    console.log("finished reading");
    /* --------------------------------- step 1 --------------------------------- */
    // post frame 0 to worker
    let ret = GS_TO_VERTEX(gaussians.slice(0, TOTAL_CAP), full_gs = true);
    worker.postMessage({
        buffer: ret.all.buffer,
        vertexCount: TOTAL_CAP,
    });
    console.log(ret.spans)

    /* --------------------------------- step 2 --------------------------------- */



    // setup frame ticker
    curFrame ++;
    const FPS = config.FPS;
    const curFPS= document.getElementById("FPS");
    curFPS.innerText = FPS;
    let frameEvents = [];
    const MAX_FRAME = config.MAX_FRAME;
    const frame_ticker = setInterval(() => {
        let updated = false;
        let reset_slices = [];
        for (let i = 0; i < frameEvents.length; i++){
            if (frameEvents[i].frame == curFrame && frameEvents[i].type == "reset"){
                reset_slices.push(frameEvents[i].sliceId);
                worker.postMessage({
                    resetSlice: {
                        sliceId: frameEvents[i].sliceId,
                        data: frameEvents[i].data,
                        frame: frameEvents[i].frame,
                    }
                })
                updated = true;
            } else if (frameEvents[i].frame == curFrame && frameEvents[i].type == "append"){
                worker.postMessage({
                    appendSlice: {
                        sliceId: frameEvents[i].sliceId,
                        data: frameEvents[i].data,
                        frame: frameEvents[i].frame,
                    }
                });
                updated = true;
            }
        }

        if (updated) {
            console.log("frame #", curFrame, " : starts");
            worker.postMessage(
                {reSort: {
                    reset_slices: reset_slices,
                }});
                curFrame++;
        }

        if (curFrame >= MAX_FRAME){
            // clearInterval(frame_ticker);
            // return;
            console.log("restart ticker");
            let ret = GS_TO_VERTEX(init_gs.slice(0, TOTAL_CAP), full_gs = true)
            worker.postMessage({
                buffer: ret.all.buffer,
                vertexCount: TOTAL_CAP,
            });
            curFrame = 1;
        }
    }, Math.ceil(1000 / FPS));

    /* --------------------------------- step 3 --------------------------------- */
    // append per frame events based on received data

    bytesRead = 0;
    let init_gs = gaussians.splice(0, TOTAL_CAP);
    loadedFrame = 0;
    // should not touch rowBuffer and rowBufferOffset
    let data_left = false;
    const PREFETCH_FRAME = FPS * config.PREFETCH_SEC;
    while (bytesRead < SLICE_CAP * STREAM_ROW_LENGTH && loadedFrame < MAX_FRAME) {
        let { done, value } = await reader.read();
        // if there is any reminding fro previous read  
        let value_offset = 0;
        if (rowBufferOffset > 0){
            if (value.length + rowBufferOffset < STREAM_ROW_LENGTH){
                rowBuffer.set(value, rowBufferOffset);
                rowBufferOffset += value.length;
                continue;
            }
            value_offset = STREAM_ROW_LENGTH - rowBufferOffset;
            rowBuffer.set(value.slice(0, STREAM_ROW_LENGTH - rowBufferOffset), rowBufferOffset);
            gaussians.push(PARSE_RAW_BYTES(rowBuffer)[0]);
            // console.log("load single gaussian #", gaussians.length);
            bytesRead += STREAM_ROW_LENGTH;
            rowBuffer.fill(0);
            rowBufferOffset = 0
        }
        if (done) {
            data_left = value;
            break;
        }
        // batch parse this read
        value = value.slice(value_offset);
        const num_of_gs = Math.floor(value.length / STREAM_ROW_LENGTH);
        let parsed = PARSE_RAW_BYTES(value.slice(0, num_of_gs * STREAM_ROW_LENGTH));
        gaussians = gaussians.concat(parsed);
        let value_rest = value.slice(num_of_gs * STREAM_ROW_LENGTH);
        rowBuffer.set(value_rest);
        rowBufferOffset = value_rest.length;
        bytesRead += num_of_gs * STREAM_ROW_LENGTH;
        
        while (bytesRead >= SLICE_CAP * STREAM_ROW_LENGTH){
            loadedFrame++;
            let ret = GS_TO_VERTEX(gaussians.splice(0, SLICE_CAP));
            console.log("frame #", loadedFrame, " : spans", ret.spans);
            // frameEvents.push({
            //     frame: loadedFrame,
            //     data: ret.all,
            //     type: "reset"
            // });
            let curFrameOverwrite = false;
            for (let span of ret.spans){
                frameEvents.push({
                    frame: span.frame,
                    sliceId: (loadedFrame-1) % SLICE_NUM,
                    data: ret.all.slice(span.from * VERTEX_ROW_LENGTH, span.to * VERTEX_ROW_LENGTH),
                    type: (span.frame == loadedFrame) ? "reset": "append",
                });
                if (span.frame == loadedFrame) curFrameOverwrite = true;
            }
            if (!curFrameOverwrite){
                console.warn("frame #", loadedFrame, " has no starting gaussians")
                frameEvents.push({
                    frame: loadedFrame,
                    sliceId: (loadedFrame-1) % SLICE_NUM,
                    data: ret.all.slice(0, 0),
                    type: "reset",
                });
            }

            bytesRead -= SLICE_CAP * STREAM_ROW_LENGTH;
        }
        if (done) {
            break;
        }
        if (loadedFrame - curFrame > PREFETCH_FRAME){
            await new Promise(r => setTimeout(r, 10));
            continue;
        }
    }

}

async function entry_point() {
    const resp = await fetch("config.json")
    const config = await resp.json();
    console.log("config loaded: ", config);
    setup_consts(config);
    main(config).catch((err) => {
        document.getElementById("spinner").style.display = "none";
        document.getElementById("message").innerText = err.toString();
    });
}

entry_point();
