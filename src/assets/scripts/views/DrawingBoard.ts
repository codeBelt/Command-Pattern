///<reference path='../components/display/CanvasElement.ts'/>
///<reference path='./ReceiverView.ts'/>
///<reference path='../components/display/Rectangle.ts'/>
///<reference path='../components/display/DisplayObject.ts'/>
///<reference path='../utils/BulkLoader.ts'/>

module namespace {

    export class DrawingBoard extends CanvasElement {

        private _strawberry:ReceiverView = null;

        public dragging = false;
        private _offset:any;
        private _currentItem:DisplayObject;

        constructor(canvasId:string) {
            super(canvasId);

            this.addEventListener('mouseup', this.onStageClick, this);
            this.addEventListener('mousedown', this.mouseDownListener, this);

            var image:HTMLImageElement = BulkLoader.getImage('crayon-background');
            this._strawberry = new ReceiverView(image);
            this.addChild(this._strawberry);

            this.makeShapes();
            this.update();
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