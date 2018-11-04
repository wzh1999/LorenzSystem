// main.js

const vertexSource = `
attribute vec3 position;
uniform mat4 transform;
void main() {
    gl_Position = transform * vec4(position, 1.0);
}`;

const fragmentSource = `
precision mediump float;
uniform vec3 color;
void main() {
    gl_FragColor = vec4(color, 1.0);
}`;

const center = [0, 0, 25];
const NUM_PARTICLES = 10;

function main() {
    // Acquire canvas context
    let canvas = document.getElementById("myCanvas");
    let gl = canvas.getContext("webgl");
    gl.viewport(0, 0, canvas.clientWidth, canvas.clientHeight);
    const aspect = canvas.clientWidth / canvas.clientHeight;

    // Initialize program
    let camera = new Camera(center, 60);
    let program = new Program(gl, vertexSource, fragmentSource);
    program.addAttribute("position");
    let projection = perspective(radians(45), aspect, 0.1, 1000.0);
    let particles = [];
    for (let i = 0; i < NUM_PARTICLES; i++)
        particles.push(new Lorenz(program, [Math.random(), Math.random(), Math.random()], 
                                  HSVtoRGB([0.5 + 0.1 * Math.random(), 0.8, 1.0])));
    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    // Main render loop
    function render() {
        particles.forEach((p) => p.update());
        program.setMat4("transform", matMul(projection, camera.getViewMatrix()));
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.clear(gl.DEPTH_BUFFER_BIT);
        particles.forEach((p) => p.render());
        window.requestAnimationFrame(render);
    };
    render();
}

main();
