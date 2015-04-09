///<reference path='../interfaces/IDataStore.ts'/>
///<reference path='../events/EventDispatcher.ts'/>
///<reference path='../events/LoaderEvent.ts'/>

module namespace {

    export class ImageLoader extends EventDispatcher implements IDataStore {

        private _image:HTMLImageElement = null;

        public data:any;
        public src:string;
        public complete:boolean = false;

        constructor(path:string)
        {
            super();

            this.src = path;
            this.init();
        }

        private init():void
        {
            var self = this;

            this._image = new Image();
            this._image.onload = function() {
                self.onImageLoad();
            }
        }

        public load():void
        {
            this._image.src = this.src;
        }

        private onImageLoad():void
        {
            this.data = this._image;
            this.complete = true;
            this.dispatchEvent(LoaderEvent.COMPLETE);
        }
    }
}