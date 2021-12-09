const INITIAL_VELOCITY = 0.025
const VELOCITY_INCREASE = 0.00001


export default class Ball {

    constructor(ballElement){
        this.ballElement = ballElement;
        this.reset()
    }
    
    get x() {
       return parseFloat(getComputedStyle(this.ballElement).getPropertyValue('--x'))
    }

    set x(val) {
        return this.ballElement.style.setProperty('--x', val);
    }

    get y() {
        return parseFloat(getComputedStyle(this.ballElement).getPropertyValue('--y'))
     }
 
     set y(val) {
         return this.ballElement.style.setProperty('--y', val);
     }

    get rect() {
        return this.ballElement.getBoundingClientRect()
    }
    
    reset() {
        this.x = 50
        this.y = 50
        this.direction = { x: 0 }
        while( Math.abs(this.direction.x) <= 0.2 ||
        Math.abs(this.direction.x) >= 0.9){
            const heading = Math.random() * 2 * Math.PI
            this.direction.x = Math.cos(heading)
            this.direction.y = Math.sin(heading)
        }
        this.velocity = INITIAL_VELOCITY
      }

     update(delta, paddleRects){
         this.x += this.direction.x * this.velocity * delta
         this.y += this.direction.y * this.velocity * delta
         this.velocity += VELOCITY_INCREASE*delta
         const rect = this.ballElement.getBoundingClientRect()

         if(rect.left < 0 || rect.right > window.innerWidth){
            this.direction.x *= -1
         }

         if(rect.top < 0 || rect.bottom > window.innerHeight){
            this.direction.y *= -1
         }

         if(paddleRects.some(r => isCollision(rect, r))){
            this.direction.x *= -1
            this.velocity += VELOCITY_INCREASE
         }

     }

   

    }

function isCollision(rect1, rect2){
    return (rect1.left <= rect2.right &&
            rect1.right >= rect2.left &&
            rect1.top <= rect2.bottom &&
            rect1.bottom >= rect2.top)
}
    