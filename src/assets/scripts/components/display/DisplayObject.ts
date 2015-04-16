///<reference path='../../events/EventDispatcher.ts'/>

module namespace {

    export class DisplayObject extends EventDispatcher {

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
        public children:Array<DisplayObject> = [];
        public numChildren:number = 0;
        public name:string = null;

        constructor() {
            super();
        }

        public render():void {
            //Meant to be overridden.
        }

        public addChild(displayObject:DisplayObject):void {
            displayObject.parent = this;
            displayObject.ctx = this.ctx;
            displayObject.enable();

            this.children.push(displayObject);
            this.numChildren++;
        }

        public removeChild(displayObject:DisplayObject):void {
            displayObject.ctx = null;

            var index = this.children.indexOf(displayObject);
            if (index !== -1) {
                this.children.splice(index, 1);
            }

            this.numChildren = this.children.length;
        }

        public enable():any {
            if (this.isEnabled === true) { return this; }

            // Enable the child objects and add any event listeners.

            this.isEnabled = true;
            return this;
        }

        public disable():any {
            if (this.isEnabled === false) { return this; }

            // Disable the child objects and remove any event listeners.

            this.isEnabled = false;
            return this;
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