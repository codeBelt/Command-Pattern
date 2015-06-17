import Sprite = require('../../vendor/structurejs/ts/display/Sprite');
import Bitmap = require('../../vendor/structurejs/ts/display/Bitmap');
import BulkLoader = require('../utils/BulkLoader');
import ImageLoader = require('../utils/ImageLoader');

/**
 * TODO: YUIDoc_comment
 *
 * @class CrayonButton
 * @extends Sprite
 * @module namespace
 * @constructor
 **/
class CrayonButton extends Sprite {

    /**
     * TODO: YUIDoc_comment
     *
     * @property active
     * @type {boolean}
     * @public
     */
    public active = false;

    /**
     * TODO: YUIDoc_comment
     *
     * @property _activeState
     * @type {Bitmap}
     * @private
     */
    private _activeState:Bitmap = null;

    /**
     * TODO: YUIDoc_comment
     *
     * @property _unActiveState
     * @type {Bitmap}
     * @private
     */
    private _unActiveState:Bitmap = null;


    constructor() {
        super();
    }

    /**
     * @overridden Sprite.create
     */
    public create():void {
        super.create();

        var item:Bitmap = new Bitmap(BulkLoader.getImage('paint_0010_crayon-outline.png'));
        item.scaleX = -1;
        this.addChild(item);

        this._activeState = new Bitmap(BulkLoader.getImage('paint_0001_crayon-over.png'));
        this._activeState.x = item.width + 10;
        this._activeState.y = (item.height / 2) - (this._activeState.height / 2);
        this.addChild(this._activeState);

        this._unActiveState = new Bitmap(BulkLoader.getImage('paint_0002_crayon-out.png'));
        this._unActiveState.x = item.width + 10;
        this._unActiveState.y = (item.height / 2) - (this._unActiveState.height / 2);
        this.addChild(this._unActiveState);
    }

    /**
     * @overridden Sprite.enable
     */
    public enable():void {
        if (this.isEnabled === true) { return; }

        this.addEventListener('click', this._onClick, this);

        super.enable();
    }

    /**
     * @overridden Sprite.disable
     */
    public disable():void {
        if (this.isEnabled === false) { return; }

        this.removeEventListener('click', this._onClick, this);

        super.disable();
    }

    /**
     * @overridden DOMElement.layout
     */
    public layout():void
    {
        if (this.active === true) {
            this._activeState.visible = true;
            this._unActiveState.visible = false;
        } else {
            this._activeState.visible = false;
            this._unActiveState.visible = true;
        }

        this.stage.update();
    }

    protected _onClick(event):void {
        this.active = !this.active;
        this.layout();
    }

}

export = CrayonButton;
