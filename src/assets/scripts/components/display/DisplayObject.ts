///<reference path='../../events/EventDispatcher.ts'/>

module namespace {

    export class DisplayObject extends EventDispatcher {

        public element:HTMLCanvasElement = null;
        public context:CanvasRenderingContext2D = null;
        public x:number = 0;
        public y:number = 0;
        public width:number = 0;
        public height:number = 0;
        public scaleX:number = 1;
        public scaleY:number = 1;
        public rotation:number = 0;
        public alpha:number = 1;
        public visible:boolean = true;

        constructor()
        {
            super();
            TweenLite.ticker.addEventListener("tick", this.update, this);
        }

        public createChildren():void
        {
            //Meant to be overridden.
        }

        public render():void
        {
            //Meant to be overridden.
        }

        private readerStart():void
        {
            this.context.save();
        }

        private update():void
        {
            if (!this.context || this.alpha <= 0 || !this.visible) return;

            this.readerStart();
            this.context.globalAlpha = this.alpha;
            this.render();
            this.renderEnd();
        }

        private renderEnd():void
        {
            this.context.restore();
        }

        public addChild(displayObject:DisplayObject):void
        {
            displayObject.parent = this;
            displayObject.context = this.context;
            displayObject.createChildren();
        }

        public removeChild(displayObject:DisplayObject):void
        {
            displayObject.context = null;
        }

    }
}