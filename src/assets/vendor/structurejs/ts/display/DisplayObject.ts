///<reference path='../event/EventDispatcher.ts'/>

/**
 * The {{#crossLink "DisplayObject"}}{{/crossLink}} class is the base class for all objects that can be placed on the display list.
 *
 * @class DisplayObject
 * @extends EventDispatcher
 * @module StructureJS
 * @submodule view
 * @requires Extend
 * @requires EventDispatcher
 * @constructor
 * @author Robert S. (www.codeBelt.com)
 */
module StructureJS
{
    export class DisplayObject extends EventDispatcher
    {

        /**
         * The Stage of the display object.
         *
         * @property stage
         * @type {any}
         * @public
         */
        public stage:any = null;

        /**
         * The CanvasRenderingContext2D interface provides the 2D rendering context for the drawing surface of a <canvas> element.
         * This property is only used with the <canvas> specific display objects.
         *
         * @property ctx
         * @type {CanvasRenderingContext2D}
         * @public
         */
        public ctx:CanvasRenderingContext2D = null;

        /**
         * A property providing access to the x position.
         *
         * @property x
         * @type {number}
         * @default 0
         * @public
         */
        public x:number = 0;

        /**
         * A property providing access to the y position.
         *
         * @property y
         * @type {number}
         * @default 0
         * @public
         */
        public y:number = 0;

        /**
         * Indicates the width of the display object, in pixels.
         *
         * @property width
         * @type {number}
         * @default 0
         * @public
         */
        public width:number = 0;

        /**
         * Indicates the height of the display object, in pixels.
         *
         * @property height
         * @type {number}
         * @default 0
         * @public
         */
        public height:number = 0;

        /**
         * A property providing access to the unscaledWidth.
         *
         * @property unscaledWidth
         * @type {number}
         * @default 100
         * @public
         */
        public unscaledWidth:number = 100;

        /**
         * A property providing access to the unscaledHeight.
         *
         * @property unscaledHeight
         * @type {number}
         * @default 100
         * @public
         */
        public unscaledHeight:number = 100;

        /**
         * Indicates the horizontal scale (percentage) of the object as applied from the registration point.
         *
         * @property scaleX
         * @type {number}
         * @public
         */
        public scaleX:number = 1;

        /**
         * Indicates the vertical scale (percentage) of an object as applied from the registration point of the object.
         *
         * @property scaleY
         * @type {number}
         * @public
         */
        public scaleY:number = 1;

        /**
         * Indicates the rotation of the DisplayObject instance, in degrees, from its original orientation.
         *
         * @property rotation
         * @type {number}
         * @public
         */
        public rotation:number = 0;

        /**
         * Indicates the alpha transparency value of the object specified.
         *
         * @property alpha
         * @type {number}
         * @public
         */
        public alpha:number = 1;

        /**
         * Whether or not the display object is visible.
         *
         * @property visible
         * @type {boolean}
         * @public
         */
        public visible:boolean = true;

        /**
         * Specifies whether this object receives mouse
         *
         * @property mouseEnabled
         * @type {boolean}
         * @public
         */
        public mouseEnabled:boolean = false;

        /**
         * The isCreated property is used to keep track if it is the first time this DisplayObject is created.
         *
         * @property isCreated
         * @type {boolean}
         * @default false
         * @protected
         */
        public isCreated:boolean = false;

        constructor()
        {
            super();
        }

        public create():any {
            this.isCreated = true;

            return this;
        }

        /**
         * The setSize method sets the bounds within which the containing DisplayObject would
         * like that component to lay itself out. It is expected that calling setSize will automatically
         * call {{#crossLink "DisplayObject/layout:method"}}{{/crossLink}}.
         *
         * @param unscaledWidth {number} The width within which the component should lay itself out.
         * @param unscaledHeight {number} The height within which the component should lay itself out.
         * @returns {DisplayObject} Returns an instance of itself.
         * @public
         * @chainable
         */
        public setSize(unscaledWidth:number, unscaledHeight:number):any
        {
            this.unscaledWidth = unscaledWidth;
            this.unscaledHeight = unscaledHeight;

            return this;
        }

        /**
         * The layout method provides a common function to handle updating objects in the view.
         *
         * @method layout
         * @returns {DisplayObject} Returns an instance of itself.
         * @public
         * @chainable
         */
        public layout():any {
            return this;
        }

        protected readerStart():void {
            this.ctx.save();
        }

        public update():boolean {
            if (this.ctx === null || this.alpha <= 0 || this.visible === false) return false;

            this.readerStart();
            this.ctx.globalAlpha = this.alpha;
            this.layout();
            this.renderEnd();
        }

        protected renderEnd():void {
            this.ctx.restore();
        }

    }
}