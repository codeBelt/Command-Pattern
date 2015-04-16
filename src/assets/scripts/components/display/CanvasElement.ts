///<reference path='DisplayObject.ts'/>

module namespace {

    export class CanvasElement extends DisplayObject {

        constructor(canvasId:string) {
            super();

            this.canvas = <HTMLCanvasElement> document.getElementById(canvasId);
            this.$canvas = $(this.canvas);
            this.ctx = this.canvas.getContext('2d');

            this.width = this.canvas.width;
            this.height = this.canvas.height;

            // Add mouse event listeners to $canvas element
            this.$canvas.addEventListener('mousedown', this.onPressHandler, this);
            this.$canvas.addEventListener('mousemove', this.onMoveHandler, this);
            this.$canvas.addEventListener('mouseup', this.onReleaseHandler, this);
            this.$canvas.addEventListener('mouseout', this.onCancelHandler, this);

            // Add touch event listeners to $canvas element
            this.$canvas.addEventListener('touchstart', this.onPressHandler, this);
            this.$canvas.addEventListener('touchmove', this.onMoveHandler, this);
            this.$canvas.addEventListener('touchend', this.onReleaseHandler, this);
            this.$canvas.addEventListener('touchcancel', this.onCancelHandler, this);
        }

        /**
         * @overridden DisplayObject.disable
         */
        public disable():void {
            if (this.isEnabled === false) { return; }

            // Disable the child objects and remove any event listeners.

            super.disable();
        }

        public getMousePos(event:MouseEvent|JQueryEventObject):{x: number; y: number } {
            var rect = this.canvas.getBoundingClientRect();

            return {
                x: event.clientX - rect.left,
                y: event.clientY - rect.top
            };
        }

        public getObjectUnderPoint(x:number, y:number):DisplayObject {
            var foundItem:DisplayObject = null;

            for (var i = this.numChildren - 1; i >= 0; i--) {
                if (this.children[i].visible === true) {
                    if (this.hitTest(this.children[i], x, y)) {
                        foundItem = this.children[i];
                        break;
                    }
                }
            }

            return foundItem;
        }

        public getObjectsUnderPoint(x:number, y:number):Array<DisplayObject> {
            var list = [];

            for (var i = this.numChildren - 1; i >= 0; i--) {
                if (this.hitTest(this.children[i], x, y)) {
                    list.push(this.children[i]);
                }
            }
            return list;
        }

        /**
         * @overridden DisplayObject.render
         */
        public render():void {
            this.ctx.clearRect(0, 0, this.width, this.height);
        }

        public hitTest(displayObject:DisplayObject, mouseX:number, mouseY:number):boolean {
            if(mouseX >= displayObject.x && mouseX <= displayObject.x + displayObject.width && mouseY >= displayObject.y && mouseY <= displayObject.y + displayObject.height){
                return true;
            } else {
                return false;
            }
        }

        private onPressHandler(event:MouseEvent|JQueryEventObject):void {
            var mousePos = this.getMousePos(event);
            var displayObject:DisplayObject = this.getObjectUnderPoint(mousePos.x, mousePos.y);

            event.target = <any>displayObject;
            event.currentTarget = <any>this;

            if (displayObject !== null) {
                displayObject.dispatchEvent(event);
            }
        }

        private onMoveHandler(event:MouseEvent|JQueryEventObject):void {
            event.target = <any>this;
            event.currentTarget = <any>this;

            var mousePos = this.getMousePos(event);
            var displayObject:DisplayObject = this.getObjectUnderPoint(mousePos.x, mousePos.y);

            if (displayObject !== null && displayObject.mouseEnabled === true && displayObject.visible === true) {
                document.body.style.cursor = 'pointer';
            } else {
                document.body.style.cursor = 'default';
            }

            if (displayObject !== null) {
                displayObject.dispatchEvent(event);
            }
        }

        private onReleaseHandler(event:MouseEvent|JQueryEventObject):void {
            var mousePos = this.getMousePos(event);
            var displayObject:DisplayObject = this.getObjectUnderPoint(mousePos.x, mousePos.y);

            event.target = <any>displayObject;
            event.currentTarget = <any>this;

            if (displayObject !== null) {
                displayObject.dispatchEvent(event);
            }
        }

        private onCancelHandler(event:MouseEvent|JQueryEventObject):void {
            event.target = <any>this;
            event.currentTarget = <any>this;

            var mousePos = this.getMousePos(event);
            var displayObject:DisplayObject = this.getObjectUnderPoint(mousePos.x, mousePos.y);

            if (displayObject !== null) {
                displayObject.dispatchEvent(event);
            }
        }

    }
}