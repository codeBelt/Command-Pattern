///<reference path='DisplayObject.ts'/>

module namespace {

    export class Shape extends DisplayObject {

        constructor() {
            super();
        }

        public render():void {
            this.canvasContext.translate(this.x, this.y);
            this.canvasContext.beginPath();
            this.canvasContext.rect(0, 0, this.width, this.height);
//        this.canvasContext.fillStyle = 'red';
//        this.canvasContext.fill();
            this.canvasContext.lineWidth = 1;
            this.canvasContext.strokeStyle = '#000000';
            this.canvasContext.stroke();
        }

    }
}