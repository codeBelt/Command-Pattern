///<reference path='../utils/BulkLoader.ts'/>
///<reference path='../utils/ImageLoader.ts'/>
///<reference path='../components/display/Rectangle.ts'/>
///<reference path='../../vendor/structurejs/ts/display/Sprite.ts'/>
///<reference path='../../vendor/structurejs/ts/display/Bitmap.ts'/>

module namespace {

    import Sprite = StructureJS.Sprite;
    import Bitmap = StructureJS.Bitmap;

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
         * @overridden Sprite.create
         */
        public create():void {
            super.create();

            var ruler:Bitmap = new Bitmap(BulkLoader.getImage('paint_0009_ruler.png'));
            this.addChild(ruler);

            var large:Rectangle = new Rectangle(21, 5, 26, 50, '#FF0000');
            large.alpha = 0.5;
            large.mouseEnabled = true;
            //large.addEventListener('mouseup', this.onMouseUp, this);
            this.addChild(large);

            var large:Rectangle = new Rectangle(large.x + large.width, 5, 26, 50, '#FF0000');
            large.alpha = 0.5;
            this.addChild(large);

            var large:Rectangle = new Rectangle(large.x + large.width, 5, 26, 50, '#FF0000');
            large.alpha = 0.5;
            this.addChild(large);

            var large:Rectangle = new Rectangle(large.x + large.width, 5, 26, 50, '#FF0000');
            large.alpha = 0.5;
            this.addChild(large);
        }

        /**
         * @overridden Sprite.enable
         */
        public enable():void {
            if (this.isEnabled === true) { return; }

            // Enable the child objects and add any event listeners.
            //this.addEventListener('mouseup', this.onMouseUp, this);

            super.enable();
        }

        public onMouseUp(event):void {
            console.log("event", event);
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