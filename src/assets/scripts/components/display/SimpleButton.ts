///<reference path='./CanvasObject.ts'/>

module namespace {

    /**
     * TODO: YUIDoc_comment
     *
     * @class SimpleButton
     * @extends CanvasObject
     * @module namespace
     * @constructor
     **/
    export class SimpleButton extends CanvasObject {

        public upState:CanvasObject = null;
        public overState:CanvasObject = null;
        public downState:CanvasObject = null;
        public hitTestState:CanvasObject = null;

        constructor(upState:CanvasObject = null, overState:CanvasObject = null, downState:CanvasObject = null, hitTestState:CanvasObject = null) {
            super();

            this.upState = upState;
            this.overState = overState;
            this.downState = downState;
            this.hitTestState = hitTestState;
        }

    }
}