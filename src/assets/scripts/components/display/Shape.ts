///<reference path='DisplayObject.ts'/>

module namespace {

    export class Shape extends DisplayObject {

        constructor() {
            super();
        }

        public render():void {
            this.ctx.translate(this.x, this.y);
            this.ctx.beginPath();
            this.ctx.rect(0, 0, this.width, this.height);
//        this.ctx.fillStyle = 'red';
//        this.ctx.fill();
            this.ctx.lineWidth = 1;
            this.ctx.strokeStyle = '#000000';
            this.ctx.stroke();
        }

    }
}