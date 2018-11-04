// program.js

class Program {

    constructor(gl, vertSource, fragSource) {
        // Initialize shaders
        this.gl = gl;
        let vertShader = this._initShader(gl.VERTEX_SHADER, vertSource);
        let fragShader = this._initShader(gl.FRAGMENT_SHADER, fragSource);

        // Create WebGL program
        this.program = this.gl.createProgram();
        this.gl.attachShader(this.program, vertShader);
        this.gl.attachShader(this.program, fragShader);
        this.gl.linkProgram(this.program);
        this.attributes = {};

        // Check link status
        if (!this.gl.getProgramParameter(this.program, this.gl.LINK_STATUS)) {
            alert("Unable to initialize!");
            return null;
        }
        this.use();
    }

    addAttribute(name) {
        let index;
        this.gl.bindAttribLocation(this.program, index, name);
        this.attributes[name] = index;
    }

    enableAttibuteArray(name) { this.gl.enableVertexAttribArray(this.attributes[name]); }

    setAttributePointer(name, size, type, stride = 0, offset = 0, normalized = false) {
        this.gl.vertexAttribPointer(this.attributes[name], size, type, normalized, stride, offset);
    }

    setVec3(name, vec) {
        this.gl.uniform3fv(this._getUniformLocation(name), vec);
    }

    setMat4(name, mat, transpose = false) {
        this.gl.uniformMatrix4fv(this._getUniformLocation(name), transpose, mat);
    }

    use() { this.gl.useProgram(this.program); }

    _initShader(type, source) {
        let shader = this.gl.createShader(type);
        this.gl.shaderSource(shader, source);
        this.gl.compileShader(shader);
        if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
            alert("Error occurred when compiling the shader: " + this.gl.getShaderInfoLog(shader));
            return null;
        }
        return shader;
    }

    _getUniformLocation(name) { return this.gl.getUniformLocation(this.program, name); }
};
