///<reference path='_declare/jquery.d.ts'/>
///<reference path='_declare/jquery.eventListener.d.ts'/>
///<reference path='_declare/greensock.d.ts'/>
///<reference path='utils/ImageLoader.ts'/>
///<reference path='utils/BulkLoader.ts'/>
///<reference path='events/LoaderEvent.ts'/>
///<reference path='views/DrawingBoard.ts'/>

module namespace {

    export class CommandPatternExample {

        private static BASE_PATH:string = 'assets/media/images/';

        private _drawingBoard:DrawingBoard = null;

        constructor() {
            this.loadAssets();
        }

        private loadAssets():void {
            BulkLoader.addEventListener(LoaderEvent.LOAD_COMPLETE, this.onAssetsLoadComplete, this);
            BulkLoader.addFile(new ImageLoader(CommandPatternExample.BASE_PATH + 'crayon-outline.png'), 'crayon-outline');
            BulkLoader.addFile(new ImageLoader(CommandPatternExample.BASE_PATH + 'marker-outline.png'), 'marker-outline');
            BulkLoader.addFile(new ImageLoader(CommandPatternExample.BASE_PATH + 'eraser-outline.png'), 'eraser-outline');
            BulkLoader.addFile(new ImageLoader(CommandPatternExample.BASE_PATH + 'crayon-background.png'), 'crayon-background');
            BulkLoader.addFile(new ImageLoader(CommandPatternExample.BASE_PATH + 'marker-background.png'), 'marker-background');
            BulkLoader.addFile(new ImageLoader(CommandPatternExample.BASE_PATH + 'eraser-background.png'), 'eraser-background');
            BulkLoader.addFile(new ImageLoader(CommandPatternExample.BASE_PATH + 'crayon-texture.png'), 'crayon-texture');
            BulkLoader.addFile(new ImageLoader(CommandPatternExample.BASE_PATH + 'watermelon-duck-outline.png'), 'watermelon-duck-outline');
            BulkLoader.load();
        }

        private onAssetsLoadComplete(event:LoaderEvent):void {
            this._drawingBoard = new DrawingBoard('canvasId');
        }

    }
}
