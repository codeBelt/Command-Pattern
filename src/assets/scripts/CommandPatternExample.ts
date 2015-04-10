///<reference path='_declare/greensock.d.ts'/>
///<reference path='components/display/CanvasView.ts'/>
///<reference path='components/display/Bitmap.ts'/>
///<reference path='components/display/Shape.ts'/>
///<reference path='utils/ImageLoader.ts'/>
///<reference path='utils/BulkLoader.ts'/>
///<reference path='events/LoaderEvent.ts'/>
///<reference path='views/StrawberryView.ts'/>

module namespace {

    export class CommandPatternExample {

        private static BASE_PATH:string = 'assets/media/images/';

        private _canvasView:CanvasView = null;
        private _strawberry:StrawberryView = null;

        constructor() {
            this.init();
        }

        private init():void {
            this._canvasView = new CanvasView('canvasId');
            this._canvasView.element.addEventListener('mouseup', this.onStageClick.bind(this));
            document.addEventListener('keyup', this.onKeyup.bind(this));

            BulkLoader.addEventListener(LoaderEvent.LOAD_COMPLETE, this.onAssetsLoadComplete, this);
            BulkLoader.addFile(new ImageLoader(CommandPatternExample.BASE_PATH + 'strawberry.png'), 'strawberry');
            BulkLoader.addFile(new ImageLoader(CommandPatternExample.BASE_PATH + 'player-topdown.png'), 'player-topdown');
            BulkLoader.load();
        }

        private onAssetsLoadComplete(event:LoaderEvent):void {
            var image:HTMLImageElement = BulkLoader.getImage('strawberry');
            this._strawberry = new StrawberryView(image);
            this._canvasView.addChild(this._strawberry);
        }

        private onStageClick(event:MouseEvent):void {
            var mousePos = this._canvasView.getMousePos(event);

            this._strawberry.move(mousePos.x, mousePos.y);
        }

        private onKeyup(event:KeyboardEvent):void {
            switch (event.keyCode) {
                case 49:
                    console.log("1");
                    break;
                case 50:
                    console.log("2");
                    break;
            }
        }

    }
}
