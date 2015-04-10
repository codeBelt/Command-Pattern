///<reference path='DisplayObject.ts'/>

module namespace {

    export class Shape extends DisplayObject {

        constructor() {
            super();
        }

        public render():void {
            this.context.translate(this.x, this.y);
            this.context.beginPath();
            this.context.rect(0, 0, this.width, this.height);
//        this.context.fillStyle = 'red';
//        this.context.fill();
            this.context.lineWidth = 1;
            this.context.strokeStyle = '#000000';
            this.context.stroke();
        }

    }
}