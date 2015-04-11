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

        private canvasView:CanvasView = null;
        private strawberry:ReceiverView = null;
        private commandInvoker:CommandInvoker = null;

        constructor() {
            this.init();
        }

        private init():void {
            this.commandInvoker = new CommandInvoker();

            this.canvasView = new CanvasView('canvasId');
            this.canvasView.element.addEventListener('mouseup', this.onStageClick.bind(this));
            document.addEventListener('keyup', this.onKeyup.bind(this));

            BulkLoader.addEventListener(LoaderEvent.LOAD_COMPLETE, this.onAssetsLoadComplete, this);
            BulkLoader.addFile(new ImageLoader(CommandPatternExample.BASE_PATH + 'strawberry.png'), 'strawberry');
            BulkLoader.load();
        }

        private onAssetsLoadComplete(event:LoaderEvent):void {
            var image:HTMLImageElement = BulkLoader.getImage('strawberry');
            this.strawberry = new ReceiverView(image);
            this.canvasView.addChild(this.strawberry);
        }

        private onStageClick(event:MouseEvent):void {
            var mousePos = this.canvasView.getMousePos(event);

            var command:MoveCommand = new MoveCommand(this.strawberry, mousePos.x, mousePos.y);
            this.commandInvoker.add(command);
        }

        private onKeyup(event:KeyboardEvent):void {
            var command:ICommand;

            switch (event.keyCode) {
                case 49: // Key 1
                    command = new GrowCommand(this.strawberry);
                    this.commandInvoker.add(command);
                    break;
                case 50: // Key 2
                    command = new SpinCommand(this.strawberry);
                    this.commandInvoker.add(command);
                    break;
            }
        }

    }
}
