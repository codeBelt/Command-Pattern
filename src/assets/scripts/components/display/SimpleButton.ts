///<reference path='./Sprite.ts'/>

module namespace {

    /**
     * TODO: YUIDoc_comment
     *
     * @class SimpleButton
     * @extends Sprite
     * @module namespace
     * @constructor
     **/
    export class SimpleButton extends Sprite {

        public upState:Sprite = null;
        public overState:Sprite = null;
        public downState:Sprite = null;
        public hitTestState:Sprite = null;

        constructor(upState:Sprite = null, overState:Sprite = null, downState:Sprite = null, hitTestState:Sprite = null) {
            super();

            this.upState = upState;
            this.overState = overState;
            this.downState = downState;
            this.hitTestState = hitTestState;

            this.addChild(this.upState)
        }


        public render():void {
            console.log("this.children", this.children);
            console.log("render");
//            this.ctx.translate(this.x, this.y);
//            this.ctx.beginPath();
//            this.ctx.rect(0, 0, this.width, this.height);
//            this.ctx.fillStyle = this.color;
//            this.ctx.fill();
//            this.ctx.lineWidth = 1;
//            this.ctx.strokeStyle = '#000000';
//            this.ctx.stroke();
console.log("this.upState", this.upState, this.numChildren);
            for (var i:number = 0; i < this.numChildren; i++) {
                (<Sprite>this.children[i]).update();
            }
        }

    }
}