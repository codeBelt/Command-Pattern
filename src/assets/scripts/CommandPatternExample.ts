///<reference path='_declare/greensock.d.ts'/>
///<reference path='components/display/CanvasView.ts'/>
///<reference path='components/display/Bitmap.ts'/>
///<reference path='components/display/Shape.ts'/>
///<reference path='utils/ImageLoader.ts'/>
///<reference path='utils/BulkLoader.ts'/>
///<reference path='events/LoaderEvent.ts'/>
///<reference path='views/StrawberryView.ts'/>

///<reference path='interfaces/ICommand.ts'/>
///<reference path='command/CommandList.ts'/>
///<reference path='command/AttackCommand.ts'/>
///<reference path='command/MoveCommand.ts'/>
///<reference path='command/GatherCommand.ts'/>

module namespace {

    export class CommandPatternExample {

        private static BASE_PATH:string = 'assets/media/images/';

        private _canvasView:CanvasView = null;
        private _strawberry:StrawberryView = null;
        private _commandList:CommandList = null;

        constructor() {
            this.init();
        }

        private init():void {
            this._commandList = new CommandList();

            this._canvasView = new CanvasView('canvasId');
            this._canvasView.element.addEventListener('mouseup', this.onStageClick.bind(this));
            document.addEventListener('keyup', this.onKeyup.bind(this));

            BulkLoader.addEventListener(LoaderEvent.LOAD_COMPLETE, this.onAssetsLoadComplete, this);
            BulkLoader.addFile(new ImageLoader(CommandPatternExample.BASE_PATH + 'strawberry.png'), 'strawberry');
            BulkLoader.load();
        }

        private onAssetsLoadComplete(event:LoaderEvent):void {
            var image:HTMLImageElement = BulkLoader.getImage('strawberry');
            this._strawberry = new StrawberryView(image);
            this._canvasView.addChild(this._strawberry);
        }

        private onStageClick(event:MouseEvent):void {
            var mousePos = this._canvasView.getMousePos(event);

            var command:MoveCommand = new MoveCommand(this._strawberry, mousePos.x, mousePos.y);
            this._commandList.add(command);
        }

        private onKeyup(event:KeyboardEvent):void {
            var command:ICommand;

            switch (event.keyCode) {
                case 49: // Key 1
                    command = new AttackCommand(this._strawberry);
                    this._commandList.add(command);
                    break;
                case 50: // Key 2
                    command = new GatherCommand(this._strawberry);
                    this._commandList.add(command);
                    break;
            }
        }

    }
}
