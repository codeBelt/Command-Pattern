///<reference path='_declare/jquery.d.ts'/>
///<reference path='_declare/jquery.eventListener.d.ts'/>
///<reference path='_declare/greensock.d.ts'/>

///<reference path='components/display/CanvasElement.ts'/>
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

    export class CommandPatternExample extends CanvasElement {

        private static BASE_PATH:string = 'assets/media/images/';

        private _greensockManReceiver:ReceiverView = null;
        private _commandInvoker:CommandInvoker = null;

        constructor() {
            super('canvasId');

            this.init();
        }

        private init():void {
            this._commandInvoker = new CommandInvoker();

            this.addEventListener('mouseup', this.onStageClick, this);
            document.addEventListener('keyup', this.onKeyup.bind(this));

            BulkLoader.addEventListener(LoaderEvent.LOAD_COMPLETE, this.onAssetsLoadComplete, this);
            BulkLoader.addFile(new ImageLoader(CommandPatternExample.BASE_PATH + 'greensock.png'), 'greensock');
            BulkLoader.load();
        }

        private onAssetsLoadComplete(event:LoaderEvent):void {
            var image:HTMLImageElement = BulkLoader.getImage('greensock');
            this._greensockManReceiver = new ReceiverView(image);
            this.addChild(this._greensockManReceiver);

            this.update();
        }

        private onStageClick(event:MouseEvent):void {
            var mousePos = this.getMousePos(event);

            var command:MoveCommand = new MoveCommand(this._greensockManReceiver, mousePos.x, mousePos.y);
            this._commandInvoker.add(command);
        }

        private onKeyup(event:KeyboardEvent):void {
            var command:ICommand;

            switch (event.keyCode) {
                case 49: // Key 1
                    command = new GrowCommand(this._greensockManReceiver);
                    this._commandInvoker.add(command);
                    break;
                case 50: // Key 2
                    command = new SpinCommand(this._greensockManReceiver);
                    this._commandInvoker.add(command);
                    break;
            }
        }

    }
}
