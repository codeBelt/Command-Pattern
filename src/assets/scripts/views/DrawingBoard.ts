///<reference path='../components/display/CanvasElement.ts'/>
///<reference path='./ReceiverView.ts'/>
///<reference path='../components/display/TempShape.ts'/>

module namespace {

    export class DrawingBoard extends CanvasElement {

        private _strawberry:ReceiverView = null;

        public dragIndex = null;
        public dragging = null;
        public mouseX = null;
        public mouseY = null;
        public dragHoldX = null;
        public dragHoldY = null;

        constructor(canvasId:string) {
            super(canvasId);
//http://simonsarris.com/blog/140-canvas-moving-selectable-shapes

            //this.canvas.addEventListener('mouseup', this.onStageClick.bind(this));
            //document.addEventListener('keyup', this.onKeyup.bind(this));


            var image:HTMLImageElement = BulkLoader.getImage('crayon-background');
            this._strawberry = new ReceiverView(image);
            this.addChild(this._strawberry);


            this.makeShapes();
            $(this.canvas).addEventListener('mousedown', this.mouseDownListener, this);


            this.update();

            //this.enable();
        }


        mouseDownListener(evt) {
            var i;
            //We are going to pay attention to the layering order of the objects so that if a mouse down occurs over more than object,
            //only the topmost one will be dragged.
            var highestIndex = -1;

            //getting mouse position correctly, being mindful of resizing that may have occured in the browser:
            var bRect = this.canvas.getBoundingClientRect();
            this.mouseX = (evt.clientX - bRect.left)*(this.canvas.width/bRect.width);
            this.mouseY = (evt.clientY - bRect.top)*(this.canvas.height/bRect.height);

            //find which shape was clicked
            for (i=0; i < this.numChildren; i++) {
                if	(this.hitTest(this.children[i], this.mouseX, this.mouseY)) {
                    this.dragging = true;
                    if (i > highestIndex) {
                        //We will pay attention to the point on the object where the mouse is 'holding' the object:
                        this.dragHoldX = this.mouseX - this.children[i].x;
                        this.dragHoldY = this.mouseY - this.children[i].y;
                        highestIndex = i;
                        this.dragIndex = i;
                    }
                }
            }

            if (this.dragging) {
                $(window).addEventListener('mousemove', this.mouseMoveListener, this);
            }
            $(this.canvas).removeEventListener('mousedown', this.mouseDownListener, this);
            $(window).addEventListener('mouseup', this.mouseUpListener, this);

            //code below prevents the mouse down from having an effect on the main browser window:
            if (evt.preventDefault) {
                evt.preventDefault();
            } //standard
            else if (evt.returnValue) {
                evt.returnValue = false;
            } //older IE
            return false;
        }

        mouseUpListener(evt) {
            $(this.canvas).addEventListener('mousedown', this.mouseDownListener, this);
            $(window).removeEventListener('mouseup', this.mouseUpListener, this);
            if (this.dragging) {
                this.dragging = false;
                $(window).removeEventListener('mousemove', this.mouseMoveListener, this);
            }
        }

        mouseMoveListener(evt) {
            var posX;
            var posY;
            var shapeRad = (<TempShape>this.children[this.dragIndex]).radius;
            var minX = shapeRad;
            var maxX = this.canvas.width - shapeRad;
            var minY = shapeRad;
            var maxY = this.canvas.height - shapeRad;
            //getting mouse position correctly
            var bRect = this.canvas.getBoundingClientRect();
            this.mouseX = (evt.clientX - bRect.left)*(this.canvas.width/bRect.width);
            this.mouseY = (evt.clientY - bRect.top)*(this.canvas.height/bRect.height);

            //clamp x and y positions to prevent object from dragging outside of canvas
            posX = this.mouseX - this.dragHoldX;
            posX = (posX < minX) ? minX : ((posX > maxX) ? maxX : posX);
            posY = this.mouseY - this.dragHoldY;
            posY = (posY < minY) ? minY : ((posY > maxY) ? maxY : posY);

            this.children[this.dragIndex].x = posX;
            this.children[this.dragIndex].y = posY;

            this.update();
        }

        hitTest(shape,mx,my) {
console.log("hitTest");
            var dx;
            var dy;
            dx = mx - shape.x;
            dy = my - shape.y;

            //a 'hit' will be registered if the distance away from the center is less than the radius of the circular object
            return (dx*dx + dy*dy < shape.radius*shape.radius);
        }

        makeShapes() {
            var tempShape;
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
                tempShape = {x:tempX, y:tempY, radius:tempRad, color:tempColor};
                //this.children.push(new TempShape(tempX, tempY, tempRad, tempColor));
                var dd = new TempShape(tempX, tempY, tempRad, tempColor);
                this.addChild(dd);
            }
        }


        public enable():void {
            // Add mouse event listeners to canvas element
            this.canvas.addEventListener('mousedown', this.onPress, false);
            this.canvas.addEventListener('mousemove', this.onDrag, false);
            this.canvas.addEventListener('mouseup', this.onRelease);
            this.canvas.addEventListener('mouseout', this.onCancel, false);

            // Add touch event listeners to canvas element
            this.canvas.addEventListener('touchstart', this.onPress, false);
            this.canvas.addEventListener('touchmove', this.onDrag, false);
            this.canvas.addEventListener('touchend', this.onRelease, false);
            this.canvas.addEventListener('touchcancel', this.onCancel, false);
        }

        private onStageClick(event:MouseEvent):void {
            var mousePos = this.getMousePos(event);
            console.log('mousePos', mousePos);
        }

        private onKeyup(event:KeyboardEvent):void {
            console.log('event.keyCode', event.keyCode);
        }

        private onPress(event:MouseEvent):void {
            console.log('onPress');
            // Mouse down location
            /*var sizeHotspotStartX,
             mouseX = e.pageX - this.offsetLeft,
             mouseY = e.pageY - this.offsetTop;

             if (mouseX < drawingAreaX) { // Left of the drawing area
             if (mouseX > mediumStartX) {
             if (mouseY > mediumStartY && mouseY < mediumStartY + mediumImageHeight) {
             curColor = colorPurple;
             } else if (mouseY > mediumStartY + mediumImageHeight && mouseY < mediumStartY + mediumImageHeight * 2) {
             curColor = colorGreen;
             } else if (mouseY > mediumStartY + mediumImageHeight * 2 && mouseY < mediumStartY + mediumImageHeight * 3) {
             curColor = colorYellow;
             } else if (mouseY > mediumStartY + mediumImageHeight * 3 && mouseY < mediumStartY + mediumImageHeight * 4) {
             curColor = colorBrown;
             }
             }
             } else if (mouseX > drawingAreaX + drawingAreaWidth) { // Right of the drawing area

             if (mouseY > toolHotspotStartY) {
             if (mouseY > sizeHotspotStartY) {
             sizeHotspotStartX = drawingAreaX + drawingAreaWidth;
             if (mouseY < sizeHotspotStartY + sizeHotspotHeight && mouseX > sizeHotspotStartX) {
             if (mouseX < sizeHotspotStartX + sizeHotspotWidthObject.huge) {
             curSize = 'huge';
             } else if (mouseX < sizeHotspotStartX + sizeHotspotWidthObject.large + sizeHotspotWidthObject.huge) {
             curSize = 'large';
             } else if (mouseX < sizeHotspotStartX + sizeHotspotWidthObject.normal + sizeHotspotWidthObject.large + sizeHotspotWidthObject.huge) {
             curSize = 'normal';
             } else if (mouseX < sizeHotspotStartX + sizeHotspotWidthObject.small + sizeHotspotWidthObject.normal + sizeHotspotWidthObject.large + sizeHotspotWidthObject.huge) {
             curSize = 'small';
             }
             }
             } else {
             if (mouseY < toolHotspotStartY + toolHotspotHeight) {
             curTool = 'crayon';
             } else if (mouseY < toolHotspotStartY + toolHotspotHeight * 2) {
             curTool = 'marker';
             } else if (mouseY < toolHotspotStartY + toolHotspotHeight * 3) {
             curTool = 'eraser';
             }
             }
             }
             }
             paint = true;
             addClick(mouseX, mouseY, false);
             redraw();*/
        }

        private onDrag():void {
            console.log('onDrag');
            /* if (paint) {
             addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
             redraw();
             }
             // Prevent the whole page from dragging if on mobile
             e.preventDefault();*/
        }

        private onRelease():void {
            console.log('onRelease');
            //paint = false;
            //redraw();
        }

        private onCancel():void {
            console.log('onCancel');

            //paint = false;
        }
    }
}