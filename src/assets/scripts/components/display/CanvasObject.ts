///<reference path='../../../vendor/structurejs/ts/display/DisplayObjectContainer.ts'/>
///<reference path='./CanvasElement.ts'/>

module namespace {

    import DisplayObjectContainer = StructureTS.DisplayObjectContainer;

    export class CanvasObject extends DisplayObjectContainer {

        public stage:CanvasElement = null;
        public ctx:CanvasRenderingContext2D = null;
        public scaleX:number = 1;
        public scaleY:number = 1;
        public rotation:number = 0;
        public alpha:number = 1;
        public visible:boolean = true;
        public mouseEnabled:boolean = false;

        constructor() {
            super();
        }

        public render():void {
            throw new Error('[' + this.getQualifiedClassName() + '] Error: The render method is meant to be overridden.');
        }

        protected readerStart():void {
            this.ctx.save();
        }

        public update():void {
            if (this.ctx === null || this.alpha <= 0 || this.visible === false) return;

            this.readerStart();
            this.ctx.globalAlpha = this.alpha;
            this.render();
            this.renderEnd();

            for (var i:number = 0; i < this.numChildren; i++) {
                (<CanvasObject>this.children[i]).update();
            }
        }

        protected renderEnd():void {
            this.ctx.restore();
        }

    }
}