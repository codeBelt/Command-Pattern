///<reference path='DisplayObject.ts'/>
///<reference path='../../utils/NumberUtil.ts'/>

module namespace {

    export class Bitmap extends DisplayObject {

        private image:HTMLImageElement;

        public ready:boolean = false;

        constructor(image:HTMLImageElement) {
            super();

            this.image = image;
            this.width = this.image.width;
            this.height = this.image.height;
        }

        public render():void {
            this.canvasContext.translate(this.x + this.width * 0.5, this.y + this.height * 0.5);
            this.canvasContext.scale(this.scaleX, this.scaleY);
            this.canvasContext.rotate(NumberUtil.degreesToRadians(this.rotation));
            this.canvasContext.translate(-(this.width * 0.5), -(this.height * 0.5));
            this.canvasContext.drawImage(this.image, 0, 0);
        }

    }
}