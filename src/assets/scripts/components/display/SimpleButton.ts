///<reference path='./DisplayObject.ts'/>

module namespace {

    /**
     * TODO: YUIDoc_comment
     *
     * @class SimpleButton
     * @extends DisplayObject
     * @module namespace
     * @constructor
     **/
    export class SimpleButton extends DisplayObject {

        public upState:DisplayObject = null;
        public overState:DisplayObject = null;
        public downState:DisplayObject = null;
        public hitTestState:DisplayObject = null;

        constructor(upState:DisplayObject = null, overState:DisplayObject = null, downState:DisplayObject = null, hitTestState:DisplayObject = null) {
            super();

            this.upState = upState;
            this.overState = overState;
            this.downState = downState;
            this.hitTestState = hitTestState;
        }

    }
}