///<reference path='Sprite.ts'/>
///<reference path='../../utils/NumberUtil.ts'/>

module namespace {

    export class Bitmap extends Sprite {

        protected _image:HTMLImageElement;

        public ready:boolean = false;

        constructor(image:HTMLImageElement) {
            super();

            this._image = image;
            this.width = this._image.width;
            this.height = this._image.height;
        }

        public render():void {
            this.ctx.translate(this.x + this.width * 0.5, this.y + this.height * 0.5);
            this.ctx.scale(this.scaleX, this.scaleY);
            this.ctx.rotate(NumberUtil.degreesToRadians(this.rotation));
            this.ctx.translate(-(this.width * 0.5), -(this.height * 0.5));
            this.ctx.drawImage(this._image, 0, 0);
        }

    }
}