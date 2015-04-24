///<reference path='DisplayObject.ts'/>
///<reference path='../util/MathUtil.ts'/>

module StructureJS {

    export class Bitmap extends DisplayObject {

        protected _image:HTMLImageElement;

        public ready:boolean = false;

        constructor(image:HTMLImageElement) {
            super();

            this._image = image;
            this.width = this._image.width;
            this.height = this._image.height;
        }

        public createChildren():void {
        }

        public layoutChildren():void {
        }

        public render():void {
            this.ctx.translate(this.parent.x, this.parent.y);
            this.ctx.translate(this.x + this.width * 0.5, this.y + this.height * 0.5);
            this.ctx.scale(this.parent.scaleX, this.parent.scaleY);
            this.ctx.scale(this.scaleX, this.scaleY);
            this.ctx.rotate(MathUtil.degreesToRadians(this.parent.rotation));
            this.ctx.rotate(MathUtil.degreesToRadians(this.rotation));
            this.ctx.translate(-(this.width * 0.5), -(this.height * 0.5));
            this.ctx.drawImage(this._image, 0, 0);
        }

    }
}