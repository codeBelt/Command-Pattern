///<reference path='DOMElement.ts'/>

/**
 * The {{#crossLink "Stage"}}{{/crossLink}} class should be extended by your main or root class.
 *
 * @class Stage
 * @extends DOMElement
 * @module StructureJS
 * @submodule view
 * @constructor
 * @author Robert S. (www.codeBelt.com)
 * @requires Extend
 * @requires DOMElement
 * @requires jQuery
 * @example
 *     // This example illustrates how to setup your main or root class when extending the {{#crossLink "Stage"}}{{/crossLink}} class.
 *     define(function (require, exports, module) {
 *         'use strict';
 *
 *         var Extend = require('structurejs/util/Extend');
 *         var Stage = require('replace/path/Stage');
 *
 *         var MainClass = (function () {
 *
 *         var _super = Extend(MainClass, Stage);
 *
 *             function MainClass() {
 *                 _super.call(this);
 *             }
 *
 *             MainClass.prototype.createChildren = function () {
 *                 _super.prototype.createChildren.call(this);
 *
 *                 // Create and add your child objects to this parent class.
 *             }
 *
 *             MainClass.prototype.layoutChildren = function () {
 *                 // Layout or update the child objects in this parent class.
 *
 *                 return this;
 *             }
 *
 *             MainClass.prototype.enable = function () {
 *                 if (this.isEnabled === true) { return this };
 *
 *                 // Enable the child objects and add any event listeners.
 *
 *                 return _super.prototype.enable.call(this);
 *             }
 *
 *             MainClass.prototype.disable = function () {
 *                 if (this.isEnabled === false) { return this };
 *
 *                 // Disable the child objects and remove any event listeners.
 *
 *                 return _super.prototype.disable.call(this);
 *             }
 *
 *             MainClass.prototype.destroy = function () {
 *                 // Destroy the child objects and references in this parent class to prevent memory leaks.
 *
 *                 _super.prototype.destroy.call(this);
 *             }
 *
 *             return MainClass;
 *         })();
 *
 *         module.exports = MainClass;
 *     });
 *
 * <b>Instantiation Example</b><br>
 * This example illustrates how to instantiation your main or root class.
 *
 *      var app = new MainClass();
 *      app.appendTo('body');
 *
 */
module StructureTS
{
    export class Stage extends DOMElement
    {
        constructor()
        {
            super();
        }

        /**
         * The selected HTML element where all the child elements will be created. This method also starts the lifecycle of the application.
         *
         * @method appendTo
         * @param type {any} A string value that you want the your code appended too. This can be an element id (#some-id), element class (.some-class) or a element tag (body).
         * @param [enabled=true] {boolean} Sets the enabled state of the object.
         * @chainable
         */
        public appendTo(type:any, enabled:boolean = true):any
        {
            this.$element = (type instanceof jQuery) ? type : jQuery(type);
            this.$element.attr('data-cid', this.cid);

            if (this.isCreated === false)
            {
                this.createChildren();
                this.isCreated = true;
                this.layoutChildren();
            }

            if (enabled === false)
            {
                this.disable();
            }
            else
            {
                this.enable();
            }

            return this;
        }
    }
}