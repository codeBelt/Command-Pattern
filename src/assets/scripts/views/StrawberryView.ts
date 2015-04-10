///<reference path='../components/display/Bitmap.ts'/>
///<reference path='../events/BaseEvent.ts'/>

module namespace {

    export class StrawberryView extends Bitmap {

        constructor(image:HTMLImageElement) {
            super(image);
        }

        public attack():void {
            TweenLite.to(this, 0.3, { scaleX: 2, scaleY: 2, ease: Cubic.easeOut });
            TweenLite.to(this, 0.3, { scaleX: 1, scaleY: 1, delay: 0.3, ease: Cubic.easeIn, onComplete: this.animationComplete, onCompleteScope: this });
        }

        public gather():void {
            this.rotation = 0;
            TweenLite.to(this, 1, { rotation: 360, ease: Bounce.easeOut, onComplete: this.animationComplete, onCompleteScope: this });
        }

        public move(x:number, y:number):void {
            var xPos:number = x - this.width / 2;
            var yPos:number = y - this.height / 2;

            TweenLite.to(this, 2, { x: xPos, y: yPos, onComplete: this.animationComplete, onCompleteScope: this });
        }

        private animationComplete() {
            this.dispatchEvent(BaseEvent.COMPLETE);
        }
    }
}