///<reference path='DisplayObject.ts'/>

module namespace {

    export class Rectangle extends DisplayObject {

        public color:string;

        constructor(x, y, width, height, color) {
            super();

            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.height = height;
            this.color = color;
        }

        public render():void {
            this.ctx.translate(this.x, this.y);
            this.ctx.beginPath();
            this.ctx.rect(0, 0, this.width, this.height);
            this.ctx.fillStyle = this.color;
            this.ctx.fill();
            this.ctx.lineWidth = 1;
            this.ctx.strokeStyle = '#000000';
            this.ctx.stroke();
        }

    }
}