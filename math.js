// math.js

// Basic functions
function clamp(value, min, max) {
    if (value < min) return min;
    if (value > max) return max;
    return value;
}

function radians(degree) { return degree / 180.0 * Math.PI; }

// Vector functions
function length(vec3) {
    let x = vec3[0];
    let y = vec3[1];
    let z = vec3[2];
    return Math.sqrt(x * x + y * y + z * z);
}

function normalize(vec3) {
    let len = length(vec3);
    return [vec3[0] / len, vec3[1] / len, vec3[2] / len];
}

function dot(vec3a, vec3b) {
    return vec3a[0] * vec3b[0] + vec3a[1] * vec3b[1] + vec3a[2] * vec3b[2];
}

function cross(vec3a, vec3b) {
    return [vec3a[1] * vec3b[2] - vec3b[1] * vec3a[2], 
            vec3a[2] * vec3b[0] - vec3b[2] * vec3a[0],
            vec3a[0] * vec3b[1] - vec3b[0] * vec3a[1]];
}

// Transform matrices
function matMul(mat1, mat2) {
    let ret = [];
    for (let j = 0; j < 4; j++)
        for (let i = 0; i < 4; i++)
            ret[4 * j + i] = mat1[i] * mat2[4 * j] + mat1[i + 4] * mat2[4 * j + 1] +
                             mat1[i + 8] * mat2[4 * j + 2] + mat1[i + 12] * mat2[4 * j + 3];
    return ret;
}

function rotate2D(angle) {
    return [Math.cos(angle), Math.sin(angle), 0, 0,
            -Math.sin(angle), Math.cos(angle), 0, 0, 
            0, 0, 1, 0,
            0, 0, 0, 1];
}

function lookAt(eye, center, up) {
    let f = normalize([center[0] - eye[0], center[1] - eye[1], center[2] - eye[2]]);
    let s = normalize(cross(f, up));
    let u = cross(s, f);
    return [s[0], u[0], -f[0], 0,
            s[1], u[1], -f[1], 0, 
            s[2], u[2], -f[2], 0, 
            -dot(s, eye), -dot(u, eye), dot(f, eye), 1];
}

function perspective(fov, aspect, near, far) {
    let tanHalfFov = Math.tan(fov / 2.0);
    return [1.0 / (aspect * tanHalfFov), 0, 0, 0, 
            0, 1.0 / tanHalfFov, 0, 0, 
            0, 0, - (far + near) / (far - near), -1.0,
            0, 0, - (2 * far * near) / (far - near), 0];
}

// Color space conversion
function HSVtoRGB(hsv) {
    let [h, s, v] = hsv;
    let k, aa, bb, cc, f, r, g, b;
    if (s <= 0.0)
        r = g = b = v; // Have gray scale if s = 0.
    else {
        if (h == 1.0) h = 0.0;
        h *= 6.0;
        k = Math.floor(h);
        f = h - k;
        aa = v * (1.0 - s);
        bb = v * (1.0 - (s * f));
        cc = v * (1.0 - (s * (1.0 - f)));
        switch (k) {
            case 0: r = v; g = cc; b = aa; break;
            case 1: r = bb; g = v; b = aa; break;
            case 2: r = aa; g = v; b = cc; break;
            case 3: r = aa; g = bb; b = v; break;
            case 4: r = cc; g = aa; b = v; break;
            case 5: r = v; g = aa; b = bb; break;
        }
    }
    return [r, g, b];
}