import BaseObject = require('../BaseObject');

/**
 * TODO: YUIDoc_comment
 *
 * @class Graphics
 * @extends BaseObject
 * @constructor
 **/
class Graphics extends BaseObject
{
    /**
     * The CanvasRenderingContext2D interface provides the 2D rendering context for the drawing surface of a canvas element.
     * This property is only used with the canvas specific display objects.
     *
     * @property ctx
     * @type {CanvasRenderingContext2D}
     * @public
     */
    public ctx:CanvasRenderingContext2D = null;

    /**
     * TODO: YUIDoc_comment
     *
     * @property _lineWidth
     * @type {number}
     * @private
     */
    private _lineWidth:number = 1;

    /**
     * TODO: YUIDoc_comment
     *
     * @property _fillStyle
     * @type {string}
     * @private
     */
    private _fillStyle:string = '#000000';

    constructor()
    {
        super();
    }

    public render():void
    {
        this.ctx.fillStyle = this._fillStyle;
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method beginFill
     * @public
     */
    public beginFill(color:string, alpha:number = 1):void {
        this._fillStyle = color;

        console.log("ctx", this.ctx);
        //context.fillStyle = '#8ED6FF';

    }


    //context.closePath();
    //context.lineWidth = 5;
    //context.fillStyle = '#8ED6FF';
    //context.fill();
    //context.strokeStyle = 'blue';

}

export = Graphics;
