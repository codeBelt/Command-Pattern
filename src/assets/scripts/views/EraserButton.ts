///<reference path='../utils/BulkLoader.ts'/>
///<reference path='../utils/ImageLoader.ts'/>
///<reference path='../components/display/Sprite.ts'/>
///<reference path='../components/display/Bitmap.ts'/>

module namespace {

    /**
     * TODO: YUIDoc_comment
     *
     * @class EraserButton
     * @extends Sprite
     * @module namespace
     * @constructor
     **/
    export class EraserButton extends Sprite {

        constructor() {
            super();
        }

        /**
         * @overridden Sprite.createChildren
         */
        public createChildren():void {
            super.createChildren();

            var item:Bitmap = new Bitmap(BulkLoader.getImage('paint_0012_eraser-outline.png'));
            item.scaleX = -1;
            this.addChild(item);

            var over:Bitmap = new Bitmap(BulkLoader.getImage('paint_0005_eraser-over.png'));
            over.x = item.width + 10;
            over.y = (item.height / 2) - (over.height / 2);
            this.addChild(over);

            var up:Bitmap = new Bitmap(BulkLoader.getImage('paint_0006_eraser-out.png'));
            up.x = item.width + 10;
            up.y = (item.height / 2) - (up.height / 2);
            this.addChild(up);
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