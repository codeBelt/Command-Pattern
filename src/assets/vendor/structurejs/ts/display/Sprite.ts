'use strict';
/*
 UMD Stuff
 @import ../util/Extend as Extend
 @import ./DisplayObjectContainer as DisplayObjectContainer
 @export Sprite
 */
import DisplayObject = require('./DisplayObject');
import DisplayObjectContainer = require('./DisplayObjectContainer');

class Sprite extends DisplayObjectContainer
{

    constructor()
    {
        super();
    }

    public create():void
    {
        super.create();

        this.useHandCursor = true;
        this.mouseEnabled = true;
    }

    public update():any
    {
        var isRenderable:boolean = super.update();

        if (isRenderable === false) return;

        var newWidth:number;
        var newHeight:number;
        var child:DisplayObject;
        for (var i:number = 0; i < this.numChildren; i++)
        {
            child = this.children[i];
            child.update();

            newWidth = child.x + child.width;
            newHeight = child.y + child.height;
            this.width = (newWidth > this.width) ? newWidth : this.width;
            this.height = (newHeight > this.height) ? newHeight : this.height;
        }
    }

    public addChild(child:any):any
    {
        super.addChild(child);

        child.ctx = this.ctx;
        child.stage = this.stage;

        if (child.isCreated === false)
        {
            child.create();
            child.isCreated = true;
        }

        child.enable();

        return this;
    }

    public addChildAt(child:DisplayObject, index:number):any
    {
        // If the index passed in is less than 0 and greater than
        // the total number of children then place the item at the end.
        if (index < 0 || index >= this.numChildren)
        {
            this.addChild(child);
        }
        // Else get the child in the children array by the
        // index passed in and place the item before that child.
        else
        {
            child.ctx = this.ctx;
            child.stage = this.stage;

            if (child.isCreated === false)
            {
                child.create();// Render the item before adding to the DOM
                child.isCreated = true;
            }

            child.enable();

            // Adds the child at a specific index but also will remove the child from another parent object if one exists.
            super.addChildAt(child, index);
        }

        return this;
    }

    public removeChild(child:any):any
    {
        child.disable();
        child.ctx = null;
        child.stage = null;

        super.removeChild(child);

        return this;
    }

}

export = Sprite;
