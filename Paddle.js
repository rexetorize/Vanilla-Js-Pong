const PADDLE_SPEED = 0.09;

export default class Paddle {

    constructor(paddleElement){
        this.paddleElement = paddleElement;
        this.reset();
    }

    get pos(){
        return parseFloat(getComputedStyle(this.paddleElement).getPropertyValue('--p1Pos'));
    }
    set pos(val){
       
        return this.paddleElement.style.setProperty('--p1Pos', val);
    }

    get posComp(){
        return parseFloat(getComputedStyle(this.paddleElement).getPropertyValue('--p2Pos'));
    }
    set posComp(val){
       
        return this.paddleElement.style.setProperty('--p2Pos', val);
    }

    update(val){
        
        this.pos = val;
    }

    rect(){
        return this.paddleElement.getBoundingClientRect();
    }

    reset(){
        this.pos = 30;
        this.posComp = 30;
    }

    computerMove(ballHt, delta){
       
       this.posComp += (ballHt - this.posComp) * delta * PADDLE_SPEED;
    }

}
