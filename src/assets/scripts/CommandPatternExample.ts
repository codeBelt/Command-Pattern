///<reference path='_declare/greensock.d.ts'/>
///<reference path='components/display/CanvasView.ts'/>
///<reference path='components/display/Bitmap.ts'/>
///<reference path='components/display/Shape.ts'/>
///<reference path='utils/ImageLoader.ts'/>
///<reference path='utils/BulkLoader.ts'/>
///<reference path='events/LoaderEvent.ts'/>
///<reference path='views/ReceiverView.ts'/>

///<reference path='interfaces/ICommand.ts'/>
///<reference path='command/CommandInvoker.ts'/>
///<reference path='command/GrowCommand.ts'/>
///<reference path='command/MoveCommand.ts'/>
///<reference path='command/SpinCommand.ts'/>

module namespace {

    export class CommandPatternExample {

        private static BASE_PATH:string = 'assets/media/images/';

        private _canvasView:CanvasView = null;
        private _strawberry:ReceiverView = null;
        private _commandInvoker:CommandInvoker = null;

        constructor() {
            this.init();
        }

        private init():void {
            this._commandInvoker = new CommandInvoker();

            this._canvasView = new CanvasView('canvasId');
            this._canvasView.canvas.addEventListener('mouseup', this.onStageClick.bind(this));
            document.addEventListener('keyup', this.onKeyup.bind(this));

            BulkLoader.addEventListener(LoaderEvent.LOAD_COMPLETE, this.onAssetsLoadComplete, this);
            BulkLoader.addFile(new ImageLoader(CommandPatternExample.BASE_PATH + 'greensock.png'), 'greensock');
            BulkLoader.load();
        }

        private onAssetsLoadComplete(event:LoaderEvent):void {
            var image:HTMLImageElement = BulkLoader.getImage('greensock');
            this._strawberry = new ReceiverView(image);
            this._canvasView.addChild(this._strawberry);
        }

        private onStageClick(event:MouseEvent):void {
            var mousePos = this._canvasView.getMousePos(event);

            var command:MoveCommand = new MoveCommand(this._strawberry, mousePos.x, mousePos.y);
            this._commandInvoker.add(command);
        }

        private onKeyup(event:KeyboardEvent):void {
            var command:ICommand;

            switch (event.keyCode) {
                case 49: // Key 1
                    command = new GrowCommand(this._strawberry);
                    this._commandInvoker.add(command);
                    break;
                case 50: // Key 2
                    command = new SpinCommand(this._strawberry);
                    this._commandInvoker.add(command);
                    break;
            }
        }

    }
}
