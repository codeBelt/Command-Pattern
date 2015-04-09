///<reference path='DisplayObject.ts'/>

module namespace {

    export class CanvasView extends DisplayObject {

        public context:CanvasRenderingContext2D = null;

        constructor(canvasId:string)
        {
            super();

            this.stage = this;
            this.element = <HTMLCanvasElement> document.getElementById(canvasId);
            this.context = this.element.getContext("2d");

            this.width = this.element.width;
            this.height = this.element.height;
        }

        public getMousePos(event:MouseEvent):{x: number; y: number} {
            var rect = this.element.getBoundingClientRect();
            return {
                x: event.clientX - rect.left,
                y: event.clientY - rect.top
            };
        }

        /**
         * @override
         */
        public addChild(displayObject:DisplayObject):void
        {
            displayObject.parent = this;
            displayObject.stage = this.stage;
            displayObject.context = this.context;
            displayObject.createChildren();
        }

        public removeChild(displayObject:DisplayObject):void
        {
            displayObject.stage = null;
            displayObject.context = null;
        }

        public render():void
        {
            this.context.clearRect(0, 0, this.width, this.height);
        }

    }
}