///<reference path='DisplayObject.ts'/>

module namespace {

    export class TempShape extends DisplayObject {

        public radius;
        public color;

        constructor(x, y, radius, color) {
            super();

            this.x = x;
            this.y = y;
            this.radius = radius;
            this.color = color;
        }

        public render():void {
            this.ctx.beginPath();
            this.ctx.fillStyle = this.color;
            this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            this.ctx.closePath();
            this.ctx.fill();
        }

    }
}