// this.js

const UP_VECTOR = [0, 1, 0];
const ANGLE_STEP = radians(1);
const MAX_POLAR = radians(179.9);
const MIN_POLAR = radians(0.1);

class Camera {

    constructor(target, distance, azimuth = 0, polar = radians(90)) {
        this.target = target;
        this.distance = distance;
        this.azimuth = azimuth;
        this.polar = polar;
        this.roll = 0;

        // Set key down event
        document.onkeydown = (event) => {
            switch (event.keyCode) {
                case 87: // W
                    this.polar -= ANGLE_STEP;
                    this.polar = clamp(this.polar, MIN_POLAR, MAX_POLAR);
                    console.log(this.polar);
                    break;
                
                case 83: // S
                    this.polar += ANGLE_STEP;
                    this.polar = clamp(this.polar, MIN_POLAR, MAX_POLAR);
                    console.log(this.polar);
                    break;
    
                case 65: // A
                    this.azimuth -= ANGLE_STEP;
                    break;
    
                case 68: // D
                    this.azimuth += ANGLE_STEP;
                    break;

                case 81: // Q
                    this.roll -= ANGLE_STEP;
                    break;
                
                case 69: // E
                    this.roll += ANGLE_STEP;
                    break;
    
                default:
                    break;
            }
        };
    }

    getViewMatrix() {
        let eye = [this.target[0] + this.distance * Math.sin(this.polar) * Math.cos(this.azimuth),
                   this.target[1] + this.distance * Math.cos(this.polar),
                   this.target[2] + this.distance * Math.sin(this.polar) * Math.sin(this.azimuth)];
        return matMul(rotate2D(this.roll), lookAt(eye, this.target, UP_VECTOR));
    }

};
