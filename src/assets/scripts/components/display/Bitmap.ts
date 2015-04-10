///<reference path='DisplayObject.ts'/>
///<reference path='../../utils/NumberUtil.ts'/>

module namespace {

    export class Bitmap extends DisplayObject {

        private _image:HTMLImageElement = null;

        public ready:boolean = false;

        constructor(image:HTMLImageElement) {
            super();

            this._image = image;
            this.width = this._image.width;
            this.height = this._image.height;
        }

        public render():void {
            this.context.translate(this.x + this.width * 0.5, this.y + this.height * 0.5);
            this.context.scale(this.scaleX, this.scaleY);
            this.context.rotate(NumberUtil.degreesToRadians(this.rotation));
            this.context.translate(-(this.width * 0.5), -(this.height * 0.5));
            this.context.drawImage(this._image, 0, 0);
        }

    }
}