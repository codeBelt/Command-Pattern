///<reference path='../utils/BulkLoader.ts'/>
///<reference path='../utils/ImageLoader.ts'/>
///<reference path='../components/display/Sprite.ts'/>
///<reference path='../components/display/Bitmap.ts'/>

module namespace {

    /**
     * TODO: YUIDoc_comment
     *
     * @class RulerView
     * @extends Sprite
     * @module namespace
     * @constructor
     **/
    export class RulerView extends Sprite {

        constructor() {
            super();
        }

        /**
         * @overridden Sprite.createChildren
         */
        public createChildren():void {
            super.createChildren();

            var ruler:Bitmap = new Bitmap(BulkLoader.getImage('paint_0009_ruler.png'));
            this.addChild(ruler);
        }

        /**
         * @overridden Sprite.layoutChildren
         */
        public layoutChildren():void {
            // Layout or update the child objects in this parent class.
        }

        public render():void {
        }

        /**
         * @overridden Sprite.enable
         */
        public enable():void {
            if (this.isEnabled === true) { return; }

            // Enable the child objects and add any event listeners.

            super.enable();
        }

        /**
         * @overridden Sprite.disable
         */
        public disable():void {
            if (this.isEnabled === false) { return; }

            // Disable the child objects and remove any event listeners.

            super.disable();
        }

        /**
         * @overridden Sprite.destroy
         */
        public destroy():void {
            //  Destroy the child objects and references in this parent class to prevent memory leaks.

            super.destroy();
        }

    }
}