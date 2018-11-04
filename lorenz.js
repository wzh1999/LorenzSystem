// lorenz.js

const MAX_PATH_SIZE = 6000
const STEP_PER_UPDATE = 3

class Lorenz {

    constructor(program, initialPos, color, dt = 0.01, sigma = 10.0, beta = 8.0 / 3.0, rho = 28.0) {
        this.pos = initialPos;
        this.color = color;
        this.dt = dt / STEP_PER_UPDATE;
        this.sigma = sigma;
        this.beta = beta;
        this.rho = rho;
        this.path = [];
        this.program = program;
        this.buffer = program.gl.createBuffer();
    }

    update() {
        for (let i = 0; i < STEP_PER_UPDATE; i++) {
            // Add current position to _path_ array
            this.path.push(this.pos[0], this.pos[1], this.pos[2]);
            if (this.path.length > 3 * MAX_PATH_SIZE)
                this.path.splice(0, 3);
        
            // Increment position
            this.pos[0] += this.sigma * (this.pos[1] - this.pos[0]) * this.dt;
            this.pos[1] += (this.pos[0] * (this.rho - this.pos[2]) - this.pos[1]) * this.dt;
            this.pos[2] += (this.pos[0] * this.pos[1] - this.beta * this.pos[2]) * this.dt;
        }
    }

    render() {
        let gl = this.program.gl;
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.path), gl.STATIC_DRAW);
        this.program.enableAttibuteArray("position");
        this.program.setAttributePointer("position", 3, gl.FLOAT);
        this.program.setVec3("color", this.color);
        gl.drawArrays(gl.LINE_STRIP, 0, this.path.length / 3);
    }

};