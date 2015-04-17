///<reference path='../components/display/CanvasElement.ts'/>
///<reference path='../components/display/Bitmap.ts'/>
///<reference path='../components/display/Rectangle.ts'/>
///<reference path='../components/display/CanvasObject.ts'/>
///<reference path='../utils/BulkLoader.ts'/>

module namespace {

    /**
     * TODO: YUIDoc_comment
     *
     * @class DrawingBoard
     * @extends CanvasElement
     * @module namespace
     * @constructor
     **/
    export class DrawingBoard extends CanvasElement {

        public dragging = false;
        private _offset:any;
        private _currentItem:CanvasObject;

        constructor($element:JQuery) {
            super($element);
        }

        /**
         * @overridden CanvasElement.createChildren
         */
        public createChildren():void {
            super.createChildren();

            var item:Bitmap = new Bitmap(BulkLoader.getImage('paint_0000_drawing-area.png'));
            this.addChild(item);

            var item:Bitmap = new Bitmap(BulkLoader.getImage('paint_0001_crayon-over.png'));
            this.addChild(item);

            var item:Bitmap = new Bitmap(BulkLoader.getImage('paint_0002_crayon-out.png'));
            this.addChild(item);

            var item:Bitmap = new Bitmap(BulkLoader.getImage('paint_0003_marker-over.png'));
            this.addChild(item);

            var item:Bitmap = new Bitmap(BulkLoader.getImage('paint_0004_marker-out.png'));
            this.addChild(item);

            var item:Bitmap = new Bitmap(BulkLoader.getImage('paint_0005_eraser-over.png'));
            this.addChild(item);

            var item:Bitmap = new Bitmap(BulkLoader.getImage('paint_0006_eraser-out.png'));
            this.addChild(item);

            var item:Bitmap = new Bitmap(BulkLoader.getImage('paint_0007_tools.png'));
            this.addChild(item);

            var item:Bitmap = new Bitmap(BulkLoader.getImage('paint_0008_colors.png'));
            this.addChild(item);

            var item:Bitmap = new Bitmap(BulkLoader.getImage('paint_0009_ruler.png'));
            this.addChild(item);

            var item:Bitmap = new Bitmap(BulkLoader.getImage('paint_0010_crayon-outline.png'));
            this.addChild(item);

            var item:Bitmap = new Bitmap(BulkLoader.getImage('paint_0011_marker-outline.png'));
            this.addChild(item);

            var item:Bitmap = new Bitmap(BulkLoader.getImage('paint_0012_eraser-outline.png'));
            this.addChild(item);

            var image:HTMLImageElement = BulkLoader.getImage('watermelon-duck-outline.png');
            var item:Bitmap = new Bitmap(image);
            this.addChild(item);


            this.makeShapes();

//            this.removeChild(this._strawberry);

            this.update()
        }

        /**
         * @overridden CanvasElement.layoutChildren
         */
        public layoutChildren():void {
            console.log("layoutChildren", this);
        }

        /**
         * @overridden CanvasElement.enable
         */
        public enable():void {
            if (this.isEnabled === true) { return; }

            this.addEventListener('mousedown', this.mouseDownListener, this);
            this.addEventListener('mouseup', this.onStageClick, this);

            super.enable();
        }

        /**
         * @overridden CanvasElement.disable
         */
        public disable():void {
            if (this.isEnabled === false) { return; }

            this.removeEventListener('mousedown', this.mouseDownListener, this);
            this.removeEventListener('mouseup', this.onStageClick, this);

            super.disable();
        }

       private makeShapes():void {
            var i;
            var tempX;
            var tempY;
            var tempRad;
            var tempR;
            var tempG;
            var tempB;
            var tempColor;
            for (i=0; i < 10; i++) {
                tempRad = 10 + Math.floor(Math.random()*25);
                tempX = Math.random()*(this.canvas.width - tempRad);
                tempY = Math.random()*(this.canvas.height - tempRad);
                tempR = Math.floor(Math.random()*255);
                tempG = Math.floor(Math.random()*255);
                tempB = Math.floor(Math.random()*255);
                tempColor = 'rgb(' + tempR + ',' + tempG + ',' + tempB +')';
                var dd = new Rectangle(tempX, tempY, tempRad, tempRad, tempColor);
                this.addChild(dd);
            }
        }

        private mouseDownListener(event:JQueryEventObject):void {
            event.preventDefault();

            var mousePos = this.getMousePos(event);
            this._currentItem = this.getObjectUnderPoint(mousePos.x, mousePos.y);

            this._currentItem.x = mousePos.x;

            console.log("this._currentItem", this._currentItem);
            this._currentItem.y = mousePos.y;
            if (this._currentItem !== null) {
                this.dragging = true;

                this._offset = {
                    x: this._currentItem.x - mousePos.x,
                    y: this._currentItem.y - mousePos.y
                };

                this.addEventListener('mousemove', this.mouseMoveListener, this);
                this.removeEventListener('mousedown', this.mouseDownListener, this);
                this.addEventListener('mouseup', this.mouseUpListener, this);
            }

            this.update();
        }

        private mouseUpListener(event:JQueryEventObject):void {
            this.addEventListener('mousedown', this.mouseDownListener, this);
            this.removeEventListener('mouseup', this.mouseUpListener, this);
            if (this.dragging) {
                this.dragging = false;
                this.removeEventListener('mousemove', this.mouseMoveListener, this);
            }
        }

        private mouseMoveListener(event:JQueryEventObject):void {
            var mousePos = this.getMousePos(event);

            this._currentItem.x = mousePos.x + this._offset.x;
            this._currentItem.y = mousePos.y + this._offset.y;

            this.update();
        }

        private onStageClick(event:MouseEvent):void {
            var mousePos = this.getMousePos(event);
            console.log('mousePos', mousePos);
        }

    }
}