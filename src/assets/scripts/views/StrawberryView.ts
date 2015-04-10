///<reference path='../components/display/Bitmap.ts'/>

module namespace {

    export class StrawberryView extends Bitmap {

        constructor(image:HTMLImageElement) {
            super(image);
        }

        public move(x:number, y:number):void {
            var xPos:number = x - this.width / 2;
            var yPos:number = y - this.height / 2;

            TweenLite.to(this, 1, { x: xPos, y: yPos, ease: Cubic.easeOut });
        }
    }
}