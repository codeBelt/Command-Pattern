///<reference path='../../../vendor/structurejs/ts/display/Sprite.ts'/>

module namespace {

    import Sprite = StructureJS.Sprite;

    /**
     * TODO: YUIDoc_comment
     *
     * @class SimpleButton
     * @extends Sprite
     * @module namespace
     * @constructor
     **/
    export class SimpleButton extends Sprite {

        public upState:Sprite = null;
        public overState:Sprite = null;
        public downState:Sprite = null;
        public hitTestState:Sprite = null;

        constructor(upState:Sprite = null, overState:Sprite = null, downState:Sprite = null, hitTestState:Sprite = null) {
            super();

            this.mouseEnabled = true;

            this.upState = upState;
            this.overState = overState;
            this.downState = downState;
            this.hitTestState = hitTestState;
        }

        public create():void {
            this.addChild(this.upState);
        }

        /**
         * @overridden CanvasElement.enable
         */
        public enable():void {
            if (this.isEnabled === true) { return; }

            this.addEventListener('mouseover', this.onMouseOver, this);
            this.addEventListener('mouseout', this.onMouseOut, this);

            super.enable();
        }

        /**
         * @overridden CanvasElement.disable
         */
        public disable():void {
            if (this.isEnabled === false) { return; }

            this.removeEventListener('mousemove', this.onMouseOver, this);
            this.removeEventListener('mouseout', this.onMouseOut, this);

            super.disable();
        }

        public render():void {
            this.width = this.upState.width;
            this.height = this.upState.height;

            for (var i:number = 0; i < this.numChildren; i++) {
                (<Sprite>this.children[i]).update();
            }
        }

        protected onMouseOver(event):void {
            this.removeChild(this.upState);
            this.addChild(this.overState);

            this.stage.update();
        }

        protected onMouseOut(event):void {
            this.removeChild(this.overState);
            this.addChild(this.upState);

            this.stage.update();
        }

    }
}