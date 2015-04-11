///<reference path='DisplayObject.ts'/>
///<reference path='../../utils/NumberUtil.ts'/>

module namespace {

    export class Bitmap extends DisplayObject {

        private _image:HTMLImageElement;

        public ready:boolean = false;

        constructor(image:HTMLImageElement) {
            super();

            this._image = image;
            this.width = this._image.width;
            this.height = this._image.height;
        }

        public render():void {
            this.canvasContext.translate(this.x + this.width * 0.5, this.y + this.height * 0.5);
            this.canvasContext.scale(this.scaleX, this.scaleY);
            this.canvasContext.rotate(NumberUtil.degreesToRadians(this.rotation));
            this.canvasContext.translate(-(this.width * 0.5), -(this.height * 0.5));
            this.canvasContext.drawImage(this._image, 0, 0);
        }

    }
}