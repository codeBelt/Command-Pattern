///<reference path='../../../vendor/structurejs/ts/display/DOMElement.ts'/>
///<reference path='../../../vendor/structurejs/ts/display/DisplayObjectContainer.ts'/>
///<reference path='Sprite.ts'/>

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

        constructor($element:JQuery) {
            super($element);
        }

        /**
         * @overridden CanvasElement.createChildren
         */
        public createChildren():void {
            super.createChildren();

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

            super.destroy();
        }

        /**
         * TODO: YUIDoc_comment
         *
         * @method addChild
         * @param child {Sprite}
         * @returns {CanvasElement} Returns an instance of itself.
         * @override
         * @public
         * @chainable
         */
        public addChild(child:any):any {
            //If the child being passed in already has a parent then remove the reference from there.
            if (child.parent)
            {
                child.parent.removeChild(child, false);
            }

            this.children.push(child);
            this.numChildren = this.children.length;

            child.ctx = this.ctx;
            child.stage = this;
            child.parent = this;

            if (child.isCreated === false) {
                child.createChildren();
                child.isCreated = true;
            }

            child.enable();
            child.layoutChildren();

            return this;
        }

        /**
         * @overridden DOMElement.addChildAt
         */
        public addChildAt(child:any, index:number):any
        {
            //If the child being passed in already has a parent then remove the reference from there.
            if (child.parent)
            {
                child.parent.removeChild(child, false);
            }

            this.children.splice(index, 0, child);
            this.numChildren = this.children.length;

            child.ctx = this.ctx;
            child.stage = this;
            child.parent = this;

            if (child.isCreated === false) {
                child.createChildren();
                child.isCreated = true;
            }

            child.enable();
            child.layoutChildren();

            return this;
        }

        /**
         * @overridden DOMElement.swapChildren
         */
        public swapChildren(child1:any, child2:any):any
        {
            var child1Index = this.children.indexOf(child1);
            var child2Index = this.children.indexOf(child2);

            this.addChildAt(child1, child2Index);
            this.addChildAt(child2, child1Index);

            return this;
        }

        /**
         * @overridden DOMElement.getChildAt
         */
        public getChildAt(index:number):any
        {
            return <any>super.getChildAt(index);
        }

        /**
         * TODO: YUIDoc_comment
         *
         * @method removeChild
         * @param child {Sprite}
         * @returns {CanvasElement} Returns an instance of itself.
         * @override
         * @public
         * @chainable
         */
        public removeChild(child:any, destroy:boolean = true):any {
            var index = this.getChildIndex(child);
            if (index !== -1)
            {
                // Removes the child object from the parent.
                this.children.splice(index, 1);
            }

            this.numChildren = this.children.length;

            if (destroy === true)
            {
                child.destroy();
            }
            else
            {
                child.disable();
            }

            child.ctx = null;
            child.stage = null;
            child.parent = null;

            return this;
        }

        /**
         * Removes the child display object instance that exists at the specified index.
         *
         * @method removeChildAt
         * @param index {int} The index position of the child object.
         * @public
         * @chainable
         */
        public removeChildAt(index:number, destroy:boolean = true):any
        {
            this.removeChild(this.getChildAt(index), destroy);

            return this;
        }

        /**
         * Removes all child object instances from the child list of the parent object instance.
         * The parent property of the removed children is set to null , and the objects are garbage collected if no other
         * references to the children exist.
         *
         * @method removeChildren
         * @returns {DOMElement} Returns an instance of itself.
         * @override
         * @public
         * @chainable
         */
        public removeChildren(destroy:boolean = true):any
        {
            while (this.children.length > 0)
            {
                this.removeChild(<Sprite>this.children.pop(), destroy);
            }

            return this;
        }

        public update():void {
            this.render();

            for (var i:number = 0; i < this.numChildren; i++) {
                (<Sprite>this.children[i]).update();
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

        public getObjectUnderPoint(x:number, y:number):Sprite {
            var foundItem:Sprite = null;
            var sprite:Sprite;

            for (var i = this.numChildren - 1; i >= 0; i--) {
                sprite = (<Sprite>this.children[i]);
                if (sprite.visible === true) {
                    if (this.hitTest(sprite, x, y)) {
                        foundItem = sprite;
                        break;
                    }
                }
            }

            return foundItem;
        }

        public getObjectsUnderPoint(x:number, y:number):Array<Sprite> {
            var list = [];
            var sprite:Sprite;

            for (var i = this.numChildren - 1; i >= 0; i--) {
                sprite = (<Sprite>this.children[i]);
                if (this.hitTest(sprite, x, y)) {
                    list.push(sprite);
                }
            }
            return list;
        }

        public hitTest(sprite:Sprite, mouseX:number, mouseY:number):boolean {
            if(mouseX >= sprite.x && mouseX <= sprite.x + sprite.width && mouseY >= sprite.y && mouseY <= sprite.y + sprite.height){
                return true;
            } else {
                return false;
            }
        }

        protected onPressHandler(event:MouseEvent|JQueryEventObject):void {
            var mousePos = this.getMousePos(event);
            var sprite:Sprite = this.getObjectUnderPoint(mousePos.x, mousePos.y);

            event.target = <any>sprite;
            event.currentTarget = <any>this;

            if (sprite !== null) {
                sprite.dispatchEvent(event);
            }

            this.dispatchEvent(event);
        }

        protected onMoveHandler(event:MouseEvent|JQueryEventObject):void {
            var mousePos = this.getMousePos(event);
            var sprite:Sprite = this.getObjectUnderPoint(mousePos.x, mousePos.y);

            if (sprite === null) return;

            var spriteTarget:Sprite = this.getActualClickedOnChild(sprite, mousePos.x, mousePos.y);

            event.target = <any>spriteTarget;
            event.currentTarget = <any>sprite;
            event.bubbles = true;

            if (spriteTarget !== null && spriteTarget.mouseEnabled === true && spriteTarget.visible === true) {
                document.body.style.cursor = 'pointer';
            } else {
                document.body.style.cursor = 'default';
            }

            if (sprite !== null) {
                sprite.dispatchEvent(event);
            }

            this.dispatchEvent(event);
        }

        protected getActualClickedOnChild(sprite:Sprite, x, y):Sprite {
            var item;
            var newX;
            var newY;
            if (sprite.numChildren > 0) {
                for (var i = sprite.numChildren - 1; i >= 0; i--) {
                    item = (<Sprite>sprite.children[i]);
                    if (item.visible === true) {
                        newX = x - item.parent.x;
                        newY = y - item.parent.y;
                        if (this.hitTest(item, newX, newY)) {
                           return this.getActualClickedOnChild(item, newX, newY);
                        }
                    }
                }
            } else {
                return sprite;
            }
        }

        protected onReleaseHandler(event:MouseEvent|JQueryEventObject):void {
            var mousePos = this.getMousePos(event);
            var sprite:Sprite = this.getObjectUnderPoint(mousePos.x, mousePos.y);

            event.bubbles = true;

            if (sprite !== null) {
                var spriteTarget:Sprite = this.getActualClickedOnChild(sprite, mousePos.x, mousePos.y);

                event.target = <any>spriteTarget;
                event.currentTarget = <any>sprite;

                spriteTarget.dispatchEvent(event);
            } else {
                event.target = <any>this;
                event.currentTarget = <any>this;
            }

            this.dispatchEvent(event);
        }

        protected onCancelHandler(event:MouseEvent|JQueryEventObject):void {
            event.target = <any>this;
            event.currentTarget = <any>this;

            var mousePos = this.getMousePos(event);
            var sprite:Sprite = this.getObjectUnderPoint(mousePos.x, mousePos.y);

            if (sprite !== null) {
                sprite.dispatchEvent(event);
            }

            this.dispatchEvent(event);
        }

    }
}