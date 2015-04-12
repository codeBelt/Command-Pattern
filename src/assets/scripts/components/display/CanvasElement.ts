///<reference path='DisplayObject.ts'/>

module namespace {

    export class CanvasElement extends DisplayObject {

        constructor(canvasId:string) {
            super();

            this.canvas = <HTMLCanvasElement> document.getElementById(canvasId);
            this.ctx = this.canvas.getContext("2d");

            this.width = this.canvas.width;
            this.height = this.canvas.height;
        }

        public getMousePos(event:MouseEvent):{x: number; y: number } {
            var rect = this.canvas.getBoundingClientRect();

            return {
                x: event.clientX - rect.left,
                y: event.clientY - rect.top
            };
        }

        /**
         * @overridden
         */
        public render():void {
            this.ctx.clearRect(0, 0, this.width, this.height);
        }

    }
}