///<reference path='../components/display/Bitmap.ts'/>
///<reference path='../events/BaseEvent.ts'/>

module namespace {

    export class ReceiverView extends Bitmap {

        constructor(image:HTMLImageElement) {
            super(image);
        }

        public grow():TweenLite {
            TweenLite.to(this, 0.3, { scaleX: 2, scaleY: 2, ease: Cubic.easeOut, onUpdate: this.updateAnimation, onUpdateScope: this });
            return TweenLite.to(this, 0.3, { scaleX: 1, scaleY: 1, delay: 0.3, ease: Cubic.easeIn, onUpdate: this.updateAnimation, onUpdateScope: this });
        }

        public spin():TweenLite {
            this.rotation = 0;
            return TweenLite.to(this, 1, { rotation: 360, ease: Bounce.easeOut, onUpdate: this.updateAnimation, onUpdateScope: this });
        }

        public move(x:number, y:number):TweenLite {
            var xPos:number = x - this.width / 2;
            var yPos:number = y - this.height / 2;

            return TweenLite.to(this, 1, { x: xPos, y: yPos, onUpdate: this.updateAnimation, onUpdateScope: this });
        }
        
        private updateAnimation():void {
            this.stage.update();
        }

    }
}