///<reference path='../../../vendor/structurejs/ts/display/DisplayObjectContainer.ts'/>
///<reference path='./CanvasElement.ts'/>

module namespace {

    import DisplayObjectContainer = StructureTS.DisplayObjectContainer;

    export class Sprite extends DisplayObjectContainer {

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
                (<Sprite>this.children[i]).update();
            }
        }

        protected renderEnd():void {
            this.ctx.restore();
        }

        public addChild(child:any):any {
            //If the child being passed in already has a parent then remove the reference from there.
            if (child.parent)
            {
                child.parent.removeChild(child, false);
            }

            this.children.push(child);
            this.numChildren = this.children.length;

            child.ctx = this.ctx;
            child.stage = this.stage;
            child.parent = this;

            if (child.isCreated === false) {
                child.createChildren();
                child.isCreated = true;
            }

            child.enable();
            child.layoutChildren();

            return this;
        }

        public removeChild(child:any, destroy:boolean = true):any {
            var index = this.getChildIndex(child);
            if (index !== -1)
            {
                // Removes the child object from the parent.
                this.children.splice(index, 1);
            }

            this.numChildren = this.children.length;

            if (destroy === true)
            {
                child.destroy();
            }
            else
            {
                child.disable();
            }

            child.ctx = null;
            child.stage = null;
            child.parent = null;

            return this;
        }

    }
}