///<reference path='../../../vendor/structurejs/ts/display/DOMElement.ts'/>
///<reference path='../../../vendor/structurejs/ts/display/DisplayObjectContainer.ts'/>
///<reference path='CanvasObject.ts'/>

module namespace {

    import DOMElement = StructureTS.DOMElement;
    import DisplayObjectContainer = StructureTS.DisplayObjectContainer;

    export class CanvasElement extends DOMElement {

        /**
         * A cached jQuery object for the canvas element. This has the exact same reference as **{{#crossLink "DOMElement/$element:property"}}{{/crossLink}} property**.
         *
         * @property $canvas
         * @type {JQuery}
         * @public
         */
        public $canvas:JQuery = null;

        /**
         * A reference to the canvas element. This has the exact same reference as **{{#crossLink "DOMElement/element:property"}}{{/crossLink}} property**.
         *
         * @property canvas
         * @type {HTMLCanvasElement}
         * @public
         */
        public canvas:HTMLCanvasElement = null;

        /**
         * A reference to the canvas context object.
         *
         * @property ctx
         * @type {CanvasRenderingContext2D}
         * @public
         */
        public ctx:CanvasRenderingContext2D = null;

        /**
         * TODO: YUIDoc_comment
         *
         * @property _canvasContainer
         * @type {DisplayObjectContainer}
         * @protected
         */
        protected _canvasContainer:DisplayObjectContainer = null;

        constructor($element:JQuery) {
            super($element);
        }

        /**
         * @overridden CanvasElement.createChildren
         */
        public createChildren():void {
            super.createChildren();

            this._canvasContainer = new DisplayObjectContainer();

            this.$canvas = this.$element;
            this.canvas = <HTMLCanvasElement>this.element;
            this.ctx = this.canvas.getContext('2d');
        }

        /**
         * @overridden CanvasElement.layoutChildren
         */
        public layoutChildren():void {
            // Layout or update the child objects in this parent class.
        }

        /**
         * @overridden CanvasElement.enable
         */
        public enable():void {
            if (this.isEnabled === true) {
                return;
            }

            // Add mouse event listeners to $canvas element
            this.$canvas.addEventListener('mousedown', this.onPressHandler, this);
            this.$canvas.addEventListener('mousemove', this.onMoveHandler, this);
            this.$canvas.addEventListener('mouseup', this.onReleaseHandler, this);
            this.$canvas.addEventListener('mouseout', this.onCancelHandler, this);

            // Add touch event listeners to $canvas element
            this.$canvas.addEventListener('touchstart', this.onPressHandler, this);
            this.$canvas.addEventListener('touchmove', this.onMoveHandler, this);
            this.$canvas.addEventListener('touchend', this.onReleaseHandler, this);
            this.$canvas.addEventListener('touchcancel', this.onCancelHandler, this);

            super.enable();
        }

        /**
         * @overridden CanvasElement.disable
         */
        public disable():void {
            if (this.isEnabled === false) {
                return;
            }

            // Remove mouse event listeners on $canvas element
            this.$canvas.removeEventListener('mousedown', this.onPressHandler, this);
            this.$canvas.removeEventListener('mousemove', this.onMoveHandler, this);
            this.$canvas.removeEventListener('mouseup', this.onReleaseHandler, this);
            this.$canvas.removeEventListener('mouseout', this.onCancelHandler, this);

            // Remove touch event listeners on $canvas element
            this.$canvas.removeEventListener('touchstart', this.onPressHandler, this);
            this.$canvas.removeEventListener('touchmove', this.onMoveHandler, this);
            this.$canvas.removeEventListener('touchend', this.onReleaseHandler, this);
            this.$canvas.removeEventListener('touchcancel', this.onCancelHandler, this);

            super.disable();
        }

        /**
         * @overridden CanvasElement.destroy
         */
        public destroy():void {
            this._canvasContainer.destroy();

            super.destroy();
        }

        /**
         * TODO: YUIDoc_comment
         *
         * @method addChild
         * @param canvasObject {CanvasObject}
         * @returns {CanvasElement} Returns an instance of itself.
         * @override
         * @public
         * @chainable
         */
       public addChild(canvasObject:any):any {
           canvasObject.ctx = this.ctx;
           canvasObject.stage = this;

           this._canvasContainer.addChild(canvasObject);

           this.numChildren = this._canvasContainer.numChildren;
           this.children = this._canvasContainer.children;

            return this;
        }

        /**
         * TODO: YUIDoc_comment
         *
         * @method removeChild
         * @param canvasObject {CanvasObject}
         * @returns {CanvasElement} Returns an instance of itself.
         * @override
         * @public
         * @chainable
         */
        public removeChild(canvasObject:any, destroy:boolean = true):any {
            canvasObject.ctx = null;
            canvasObject.stage = null;

            this._canvasContainer.removeChild(canvasObject, destroy);

            this.numChildren = this._canvasContainer.numChildren;
            this.children = this._canvasContainer.children;

            return this;
        }

        public update():void {
            this.render();

            for (var i:number = 0; i < this._canvasContainer.numChildren; i++) {
                (<CanvasObject>this._canvasContainer.children[i]).update();
            }
        }

        public render():void {
            this.ctx.clearRect(0, 0, this.width, this.height);
        }


        public getMousePos(event:MouseEvent|JQueryEventObject):{x: number; y: number } {
            var rect = this.canvas.getBoundingClientRect();

            return {
                x: event.clientX - rect.left,
                y: event.clientY - rect.top
            };
        }

        public getObjectUnderPoint(x:number, y:number):CanvasObject {
            var foundItem:CanvasObject = null;
            var canvasObject:CanvasObject;

            for (var i = this._canvasContainer.numChildren - 1; i >= 0; i--) {
                canvasObject = (<CanvasObject>this._canvasContainer.children[i]);
                if (canvasObject.visible === true) {
                    if (this.hitTest(canvasObject, x, y)) {
                        foundItem = canvasObject;
                        break;
                    }
                }
            }

            return foundItem;
        }

        public getObjectsUnderPoint(x:number, y:number):Array<CanvasObject> {
            var list = [];
            var canvasObject:CanvasObject;

            for (var i = this.numChildren - 1; i >= 0; i--) {
                canvasObject = (<CanvasObject>this._canvasContainer.children[i]);
                if (this.hitTest(canvasObject, x, y)) {
                    list.push(canvasObject);
                }
            }
            return list;
        }

        public hitTest(canvasObject:CanvasObject, mouseX:number, mouseY:number):boolean {
            if(mouseX >= canvasObject.x && mouseX <= canvasObject.x + canvasObject.width && mouseY >= canvasObject.y && mouseY <= canvasObject.y + canvasObject.height){
                return true;
            } else {
                return false;
            }
        }

        protected onPressHandler(event:MouseEvent|JQueryEventObject):void {
            var mousePos = this.getMousePos(event);
            var canvasObject:CanvasObject = this.getObjectUnderPoint(mousePos.x, mousePos.y);

            event.target = <any>canvasObject;
            event.currentTarget = <any>this;
            if (canvasObject !== null) {
                canvasObject.dispatchEvent(event);
            }

            this.dispatchEvent(event);
        }

        protected onMoveHandler(event:MouseEvent|JQueryEventObject):void {
            event.target = <any>this;
            event.currentTarget = <any>this;

            var mousePos = this.getMousePos(event);
            var canvasObject:CanvasObject = this.getObjectUnderPoint(mousePos.x, mousePos.y);

            if (canvasObject !== null && canvasObject.mouseEnabled === true && canvasObject.visible === true) {
                document.body.style.cursor = 'pointer';
            } else {
                document.body.style.cursor = 'default';
            }

            if (canvasObject !== null) {
                canvasObject.dispatchEvent(event);
            }

            this.dispatchEvent(event);
        }

        protected onReleaseHandler(event:MouseEvent|JQueryEventObject):void {
            var mousePos = this.getMousePos(event);
            var canvasObject:CanvasObject = this.getObjectUnderPoint(mousePos.x, mousePos.y);

            event.target = <any>canvasObject;
            event.currentTarget = <any>this;

            if (canvasObject !== null) {
                canvasObject.dispatchEvent(event);
            }

            this.dispatchEvent(event);
        }

        protected onCancelHandler(event:MouseEvent|JQueryEventObject):void {
            event.target = <any>this;
            event.currentTarget = <any>this;

            var mousePos = this.getMousePos(event);
            var canvasObject:CanvasObject = this.getObjectUnderPoint(mousePos.x, mousePos.y);

            if (canvasObject !== null) {
                canvasObject.dispatchEvent(event);
            }

            this.dispatchEvent(event);
        }

    }
}