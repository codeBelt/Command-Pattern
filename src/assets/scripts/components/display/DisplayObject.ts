///<reference path='../../events/EventDispatcher.ts'/>

module namespace {

    export class DisplayObject extends EventDispatcher {

        public element:HTMLCanvasElement = null;
        public canvasContext:CanvasRenderingContext2D = null;
        public x:number = 0;
        public y:number = 0;
        public width:number = 0;
        public height:number = 0;
        public scaleX:number = 1;
        public scaleY:number = 1;
        public rotation:number = 0;
        public alpha:number = 1;
        public visible:boolean = true;

        constructor() {
            super();

            TweenLite.ticker.addEventListener("tick", this.update, this);
        }

        public render():void {
            //Meant to be overridden.
        }

        public addChild(displayObject:DisplayObject):void {
            displayObject.parent = this;
            displayObject.canvasContext = this.canvasContext;
        }

        public removeChild(displayObject:DisplayObject):void {
            displayObject.canvasContext = null;
        }

        private readerStart():void {
            this.canvasContext.save();
        }

        private update():void {
            if (this.canvasContext === null || this.alpha <= 0 || this.visible === false) return;

            this.readerStart();
            this.canvasContext.globalAlpha = this.alpha;
            this.render();
            this.renderEnd();
        }

        private renderEnd():void {
            this.canvasContext.restore();
        }

    }
}