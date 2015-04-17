///<reference path='../../../vendor/structurejs/ts/display/DisplayObjectContainer.ts'/>

module namespace {

    import DisplayObjectContainer = StructureTS.DisplayObjectContainer;

    export class CanvasObject extends DisplayObjectContainer {

        public canvas:HTMLCanvasElement = null;
        public $canvas:JQuery = null;
        public ctx:CanvasRenderingContext2D = null;
        public x:number = 0;
        public y:number = 0;
        public width:number = 0;
        public height:number = 0;
        public scaleX:number = 1;
        public scaleY:number = 1;
        public rotation:number = 0;
        public alpha:number = 1;
        public visible:boolean = true;
        public isEnabled:boolean = false;
        public mouseEnabled:boolean = false;
        public children:Array<CanvasObject> = [];
        public numChildren:number = 0;
        public name:string = null;

        constructor() {
            super();
        }

        public render():void {
            //Meant to be overridden.
        }

        private readerStart():void {
            this.ctx.save();
        }

        public update():void {
            if (this.ctx === null || this.alpha <= 0 || this.visible === false) return;

            this.readerStart();
            this.ctx.globalAlpha = this.alpha;
            this.render();
            this.renderEnd();

            for (var i:number = 0; i < this.numChildren; i++) {
                this.children[i].update();
            }
        }

        private renderEnd():void {
            this.ctx.restore();
        }

    }
}