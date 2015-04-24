///<reference path='../../../vendor/structurejs/ts/display/DisplayObjectContainer.ts'/>
///<reference path='./CanvasElement.ts'/>

module namespace {

    import DisplayObjectContainer = StructureTS.DisplayObjectContainer;

    export class Sprite extends DisplayObjectContainer {

        constructor() {
            super();
        }

        public createChildren():void {
            // This method is meant to be overridden.
        }

        public update():any {
            var isRendable:boolean = super.update();

            if (isRendable === false) return;

            var newWidth:number;
            var newHeight:number;
            var child:Sprite;
            for (var i:number = 0; i < this.numChildren; i++) {
                child = <Sprite>this.children[i];
                child.update();

                newWidth = child.x + child.width;
                newHeight = child.y + child.height;
                this.width = (newWidth > this.width) ? newWidth : this.width;
                this.height = (newHeight > this.height) ? newHeight : this.height;
            }
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