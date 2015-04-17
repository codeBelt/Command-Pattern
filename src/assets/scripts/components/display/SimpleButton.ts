///<reference path='./Sprite.ts'/>

module namespace {

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

            this.upState = upState;
            this.overState = overState;
            this.downState = downState;
            this.hitTestState = hitTestState;
        }

    }
}