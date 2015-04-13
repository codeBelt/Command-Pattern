///<reference path='DisplayObject.ts'/>

module namespace {

    export class CanvasElement extends DisplayObject {

        constructor(canvasId:string) {
            super();

            this.canvas = <HTMLCanvasElement> document.getElementById(canvasId);
            this.ctx = this.canvas.getContext('2d');

            this.width = this.canvas.width;
            this.height = this.canvas.height;
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
                if (this.hitTest(this.children[i], x, y)) {
                    foundItem = this.children[i];
                    break;
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
         * @overridden
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

    }
}