///<reference path='_declare/greensock.d.ts'/>
///<reference path='components/display/CanvasView.ts'/>
///<reference path='components/display/Bitmap.ts'/>
///<reference path='components/display/Shape.ts'/>
///<reference path='utils/ImageLoader.ts'/>
///<reference path='utils/BulkLoader.ts'/>
///<reference path='events/LoaderEvent.ts'/>

module namespace {

    export class CommandPatternExample {

        private static BASE_PATH:string = 'assets/media/images/';

        private _canvasView:CanvasView = null;
        private _strawberry:Bitmap = null;

        private _bulkLoader:BulkLoader = null;

        constructor()
        {
            this._bulkLoader = new BulkLoader();
            this._bulkLoader.addEventListener(LoaderEvent.LOAD_COMPLETE, this.init, this);
            this._bulkLoader.addFile(new ImageLoader(CommandPatternExample.BASE_PATH + 'strawberry.png'), 'strawberry');
            this._bulkLoader.load();
        }

        private init(event):void
        {
            this._canvasView = new CanvasView('canvasId');
            this._canvasView.element.addEventListener('mouseup', this.onStageClick.bind(this));

            var image:HTMLImageElement = this._bulkLoader.getImage('strawberry');
            this._strawberry = new Bitmap(image);
            this._canvasView.addChild(this._strawberry);
        }

        private onStageClick(evt):void
        {
            var mousePos = this._canvasView.getMousePos(evt);
            TweenLite.to(this._strawberry, 1, { x: mousePos.x - this._strawberry.width/2, y: mousePos.y - this._strawberry.height/2, ease: Cubic.easeOut });
        }

    }
}
