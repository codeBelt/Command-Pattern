'use strict';
/*
 UMD Stuff
 @import ../util/Extend as Extend
 @import ../display/DisplayObjectContainer as DisplayObjectContainer
 @import ../event/BaseEvent as BaseEvent
 @import ../util/TemplateFactory as TemplateFactory
 @import ../util/ComponentFactory as ComponentFactory
 @import ../plugin/jquery.eventListener as jQuery
 @export DOMElement
 */
import DisplayObjectContainer = require('./DisplayObjectContainer');
import BaseEvent = require('../event/BaseEvent');
import TemplateFactory = require('../util/TemplateFactory');
import ComponentFactory = require('../util/ComponentFactory');
import jQuery = require('../plugin/jquery.eventListener');

/**
 * The {{#crossLink "DOMElement"}}{{/crossLink}} class is the base view class for all objects that can be placed into the HTML DOM.
 *
 * @class DOMElement
 * @param type [any=null] Either a jQuery object or JavaScript template string reference you want to use as the view. Check out the examples below.
 * @param params [any=null] Any data you would like to pass into the jQuery element or template that is being created.
 * @extends DisplayObjectContainer
 * @module StructureJS
 * @submodule view
 * @requires Extend
 * @requires DisplayObjectContainer
 * @requires BaseEvent
 * @requires TemplateFactory
 * @requires ComponentFactory
 * @requires jQuery
 * @constructor
 * @author Robert S. (www.codeBelt.com)
 * @example
 *     // Example: Using DOMElement without extending it.
 *     var aLink = new DOMElement('a', {text: 'Google', href: 'http://www.google.com', 'class': 'externalLink'});
 *     this.addChild(aLink);
 *
 *     // Example: A view passing in a jQuery object.
 *     var view = new CustomView($('.selector'));
 *     this.addChild(view);
 *
 *     // Example: A view extending DOMElement while passing in a jQuery object.
 *     var Extend = require('structurejs/util/Extend');
 *     var DOMElement = require('structurejs/display/DOMElement');
 *
 *     var ClassName = (function () {
 *
 *          var _super = Extend(ClassName, DOMElement);
 *
 *          function ClassName($element) {
 *              _super.call(this, $element);
 *          }
 *
 *          ClassName.prototype.create = function () {
 *              _super.prototype.create.call(this);
 *
 *              // Create and add your child objects to this parent class.
 *          };
 *
 *          ClassName.prototype.enable = function () {
 *              if (this.isEnabled === true) { return this; }
 *
 *              // Enable the child objects and add any event listeners.
 *
 *              return _super.prototype.enable.call(this);
 *          };
 *
 *          ClassName.prototype.disable = function () {
 *              if (this.isEnabled === false) { return this; }
 *
 *              // Disable the child objects and remove any event listeners.
 *
 *              return _super.prototype.disable.call(this);
 *          };
 *
 *          ClassName.prototype.layout = function () {
 *              // Layout or update the child objects in this parent class.
 *
 *              return this;
 *          };
 *
 *          ClassName.prototype.destroy = function () {
 *              // Destroy the child objects and references in this parent class to prevent memory leaks.
 *
 *              _super.prototype.destroy.call(this);
 *          };
 *
 *          return ClassName;
 *     })();
 *
 *     // Example: A view extending DOMElement with a JavaScript template reference passed in.
 *     var Extend = require('structurejs/util/Extend');
 *     var DOMElement = require('structurejs/display/DOMElement');
 *     var HomeTemplate = require('hbs!templates/home/homeTemplate');
 *
 *     var ClassName = (function () {
 *
 *          var _super = Extend(ClassName, DOMElement);
 *
 *          function ClassName() {
 *              _super.call(this);
 *          }
 *
 *          ClassName.prototype.create = function () {
 *              _super.prototype.create.call(this, HomeTemplate, {data: 'some data'});
 *
 *              // Create and add your child objects to this parent class.
 *          };
 *
 *          ClassName.prototype.enable = function () {
 *              if (this.isEnabled === true) { return this; }
 *
 *              // Enable the child objects and add any event listeners.
 *
 *              return _super.prototype.enable.call(this);
 *          };
 *
 *          ClassName.prototype.disable = function () {
 *              if (this.isEnabled === false) { return this; }
 *
 *              // Disable the child objects and remove any event listeners.
 *
 *              return _super.prototype.disable.call(this);
 *          };
 *
 *          ClassName.prototype.layout = function () {
 *              // Layout or update the child objects in this parent class.
 *
 *              return this;
 *          };
 *
 *          ClassName.prototype.destroy = function () {
 *              // Destroy the child objects and references in this parent class to prepare for garbage collection.
 *
 *              _super.prototype.destroy.call(this);
 *          };
 *
 *          return ClassName;
 *     })();
 */
class DOMElement extends DisplayObjectContainer
{
    /**
     * Tracks number of times an element's width has been checked
     * in order to determine if the element has been added
     * to the DOM.
     *
     * @property checkCount
     * @type {number}
     * @public
     */
    public checkCount:number = 0;

    /**
     * A cached reference to the DOM Element
     *
     * @property element
     * @type {HTMLElement}
     * @default null
     * @public
     */
    public element:HTMLElement = null;

    /**
     * A cached reference to the jQuery DOM element
     *
     * @property $element
     * @type {JQuery}
     * @default null
     * @public
     */
    public $element:JQuery = null;

    /**
     * If a jQuery object was passed into the constructor this will be set as true and
     * this class will not try to add the view to the DOM since it already exists.
     *
     * @property _isReference
     * @type {boolean}
     * @private
     */
    private _isReference:boolean = false;

    /**
     * Holds onto the value passed into the constructor.
     *
     * @property _type
     * @type {string}
     * @default null
     * @private
     */
    private _type:string = null;

    /**
     * Holds onto the value passed into the constructor.
     *
     * @property _params
     * @type {any}
     * @default null
     * @private
     */
    private _params:any = null;

    constructor(type:any = null, params:any = null)
    {
        super();

        if (type instanceof jQuery)
        {
            this.$element = type;
            this.element = this.$element[0];
            this._isReference = true;
        }
        else if (type)
        {
            this._type = type;
            this._params = params;
        }
    }

    /**
     * The create function is intended to provide a consistent place for the creation and adding
     * of children to the view. It will automatically be called the first time that the view is added
     * to another DisplayObjectContainer. It is critical that all subclasses call the super for this function in
     * their overridden methods.
     *
     * This method gets called once when the child view is added to another view. If the child view is removed
     * and added to another view the create method will not be called again.
     *
     * @method create
     * @param type [string=div] The HTML tag you want to create or the id/class selector of the template or the pre-compiled path to a template.
     * @param params [any=null] Any data you would like to pass into the jQuery element or template that is being created.
     * @returns {DOMElement} Returns an instance of itself.
     * @public
     * @chainable
     * @example
     *     // EXAMPLE 1: By default your view class will be a div element:
     *     ClassName.prototype.create = function () {
     *          _super.prototype.create.call(this);
     *
     *          this._childInstance = new DOMElement();
     *          this.addChild(this._childInstance);
     *     }
     *
     *     // EXAMPLE 2: But lets say you wanted the view to be a ul element:
     *     ClassName.prototype.create = function () {
     *          _super.prototype.create.call(this, 'ul');
     *     }
     *
     *     // Then you could nest other elements inside this base view/element.
     *     ClassName.prototype.create = function () {
     *          _super.prototype.create.call(this, 'ul', {id: 'myId', 'class': 'myClass anotherClass'});
     *
     *          var li = new DOMElement('li', {text: 'Robert is cool'});
     *          this.addChild(li);
     *     }
     *
     *     // EXAMPLE 3: So that's cool but what if you wanted a block of html to be your view. Let's say you had the below
     *     // inline Handlebar template in your html file.
     *     <script id="todoTemplate" type="text/template">
     *          <div id="htmlTemplate" class="js-todo">
     *              <div id="input-wrapper">
     *                  <input type="text" class="list-input" placeholder="{{ data.text }}">
     *                  <input type="button" class="list-item-submit" value="Add">
     *              </div>
     *          </div>
     *     </script>
     *
     *     // You would just pass in the id or class selector of the template which in this case is "#todoTemplate".
     *     // There is a second optional argument where you can pass data for the Handlebar template to use.
     *     ClassName.prototype.create = function () {
     *          _super.prototype.create.call(this, '#todoTemplate', { data: this.viewData });
     *
     *     }
     *
     *     // EXAMPLE 4: Let's say you wanted to use the Handlebar plugin within RequireJS. You can pass the template into create.
     *     var HomeTemplate = require('hbs!templates/HomeTemplate');
     *
     *     ClassName.prototype.create = function () {
     *          _super.prototype.create.call(this, HomeTemplate, {data: "some data"});
     *
     *     }
     *
     *     // EXAMPLE 5: Or maybe you're using grunt-contrib-handlebars, or similar, to precompile hbs templates
     *     require('templates'); // templates.js
     *
     *     ClassName.prototype.create = function () {
     *          _super.prototype.create.call(this, 'templates/HomeTemplate', {data: "some data"});
     *
     *     }
     */
    public create(type:string = 'div', params:any = null):any
    {
        // Use the data passed into the constructor first else use the arguments from create.
        type = this._type || type;
        params = this._params || params;

        if (this.isCreated === true)
        {
            throw new Error('[' + this.getQualifiedClassName() + '] You cannot call the create method manually. It is only called once automatically during the view lifecycle and should only be called once.');
        }

        if (this.$element == null)
        {
            var html:string = TemplateFactory.create(type, params);
            if (html)
            {
                this.$element = jQuery(html);
            }
            else
            {
                this.$element = jQuery("<" + type + "/>", params);
            }
        }

        this.element = this.$element[0];

        this.width = this.$element.width();
        this.height = this.$element.height();

        return this;
    }

    /**
     * @overridden DisplayObjectContainer.addChild
     * @method addChild
     * @param child {DOMElement} The DOMElement instance to add as a child of this object instance.
     * @returns {DOMElement} Returns an instance of itself.
     * @chainable
     * @example
     *     container.addChild(domElementInstance);
     */
    public addChild(child:DOMElement):any
    {
        super.addChild(child);

        if (this.$element == null)
        {
            throw new Error('[' + this.getQualifiedClassName() + '] You cannot use the addChild method if the parent object is not added to the DOM.');
        }

        // If an empty jQuery object is passed into the constructor then don't run the code below.
        if (child._isReference === true && child.$element.length === 0)
        {
            return this;
        }

        if (child.isCreated === false)
        {
            child.create();// Render the item before adding to the DOM
            child.isCreated = true;
        }

        // If the child object is not a reference of a jQuery object in the DOM then append it.
        if (child._isReference === false)
        {
            this.$element.append(child.$element);
        }

        this.onAddedToDom(child);

        return this;
    }

    /**
     * Adds the cid to the DOM element so we can know what what Class object the element belongs too.
     *
     * @method addClientSideId
     * @param child {DOMElement} The DOMElement instance to add the cid too.
     * @private
     */
    private addClientSideId(child:DOMElement):void
    {
        /* TODO: Calling the getChild method there is a chance that multiple DOMElement's have a reference to the same HTMLElement
         * in the DOM causing the cid to be overwritten with a new cid. Probably should handle that.
         */
        child.$element.attr('data-cid', child.cid);
    }

    /**
     * Called when the child object is added to the DOM.
     * The method will call {{#crossLink "DOMElement/layout:method"}}{{/crossLink}} and dispatch the BaseEvent.ADDED_TO_STAGE event.
     *
     * @method onDomAdded
     * @private
     */
    private onAddedToDom(child:DOMElement)
    {
        child.checkCount++;

        if (child.$element.width() === 0 && child.checkCount < 5)
        {
            setTimeout(() =>
            {
                this.onAddedToDom(child);
            }, 100);
            return;
        }

        this.addClientSideId(child);

        child.width = child.$element.width();
        child.height = child.$element.height();
        child.enable();
        child.layout();
        child.dispatchEvent(new BaseEvent(BaseEvent.ADDED_TO_STAGE));
    }

    /**
     * @overridden DisplayObjectContainer.addChildAt
     */
    public addChildAt(child:DOMElement, index:number):any
    {
        var children = this.$element.children();
        var length = children.length;

        // If an empty jQuery object is passed into the constructor then don't run the code below.
        if (child._isReference === true && child.$element.length === 0)
        {
            return this;
        }

        // If the index passed in is less than 0 and greater than
        // the total number of children then place the item at the end.
        if (index < 0 || index >= length)
        {
            this.addChild(child);
        }
        // Else get the child in the children array by the
        // index passed in and place the item before that child.
        else
        {
            if (child.isCreated === false)
            {
                child.create();// Render the item before adding to the DOM
                child.isCreated = true;
            }

            // Adds the child at a specific index but also will remove the child from another parent object if one exists.
            if (child.parent) {
                child.parent.removeChild(child, false);
            }
            this.children.splice(index, 0, child);
            this.numChildren = this.children.length;
            child.parent = this;

            // Adds the child before any child already added in the DOM.
            jQuery(children.get(index)).before(child.$element);

            this.onAddedToDom(child);
        }

        return this;
    }

    /**
     * @overridden DisplayObjectContainer.swapChildren
     */
    public swapChildren(child1:DOMElement, child2:DOMElement):any
    {
        var child1Index = child1.$element.index();
        var child2Index = child2.$element.index();

        this.addChildAt(child1, child2Index);
        this.addChildAt(child2, child1Index);

        return this;
    }

    /**
     * @overridden DisplayObjectContainer.getChildAt
     */
    public getChildAt(index:number):DOMElement
    {
        return <DOMElement>super.getChildAt(index);
    }

    /**
     * Returns a DOMElement object with the first found DOM element by the passed in selector.
     *
     * @method getChild
     * @param selector {string} DOM id name, DOM class name or a DOM tag name.
     * @returns {DOMElement}
     * @public
     */
    public getChild(selector:string):DOMElement
    {
        // Get the first match from the selector passed in.
        var jQueryElement:JQuery = this.$element.find(selector).first();
        if (jQueryElement.length === 0)
        {
            throw new TypeError('[' + this.getQualifiedClassName() + '] getChild(' + selector + ') Cannot find DOM $element');
        }

        // Check to see if the element has a cid value and is a child of this parent object.
        var cid:number = jQueryElement.data('cid');
        var domElement:DOMElement = <DOMElement>this.getChildByCid(cid);

        // Creates a DOMElement from the jQueryElement.
        if (domElement == null)
        {
            // Create a new DOMElement and assign the jQuery element to it.
            domElement = new DOMElement();
            domElement.$element = jQueryElement;
            domElement.$element.attr('data-cid', domElement.cid);
            domElement.element = jQueryElement[0];
            domElement.isCreated = true;

            // Added to the super addChild method because we don't need to append the element to the DOM.
            // At this point it already exists and we are just getting a reference to the DOM element.
            super.addChild(domElement);
        }

        return domElement;
    }

    /**
     * Gets all the HTML elements children of this object.
     *
     * @method getChildren
     * @param [selector] {string} You can pass in any type of jQuery selector. If there is no selector passed in it will get all the children of this parent element.
     * @returns {Array.<DOMElement>} Returns a list of DOMElement's. It will grab all children HTML DOM elements of this object and will create a DOMElement for each DOM child.
     * If the 'data-cid' property exists is on an HTML element a DOMElement will not be created for that element because it will be assumed it already exists as a DOMElement.
     * @public
     */
    public getChildren(selector:string = ''):Array<DOMElement>
    {
        //TODO: Make sure the index of the children added is the same as the what is in the actual DOM.
        var $child:JQuery;
        var domElement:DOMElement;
        var $list:JQuery = this.$element.children(selector);

        var listLength:number = $list.length;
        for (var i:number = 0; i < listLength; i++)
        {
            $child = jQuery($list[i]);

            // If the jQuery element already has cid data property then it must be an existing DisplayObjectContainer (DOMElement) in the children array.
            if (!$child.data('cid'))
            {
                domElement = new DOMElement();
                domElement.$element = $child;
                domElement.$element.attr('data-cid', domElement.cid);
                domElement.element = $child.get(0);
                domElement.isCreated = true;

                // Added to the super addChild method because we don't need to append the element to the DOM.
                // At this point it already exists and we are just getting a reference to the DOM element.
                super.addChild(domElement);
            }
        }

        return <Array<DOMElement>>this.children;
    }

    /**
     * Removes the specified child object instance from the child list of the parent object instance.
     * The parent property of the removed child is set to null and the object is garbage collected if there are no other references
     * to the child. The index positions of any objects above the child in the parent object are decreased by 1.
     *
     * @method removeChild
     * @param child {DOMElement} The DisplayObjectContainer instance to remove.
     * @returns {DOMElement} Returns an instance of itself.
     * @override
     * @public
     * @chainable
     */
    public removeChild(child:DOMElement, destroy:boolean = true):any
    {
        // Checks if destroy was called before removeChild so it doesn't error.
        if (child.$element != null)
        {
            child.$element.unbind();
            child.$element.remove();
        }

        if (destroy === true)
        {
            child.destroy();
        }
        else
        {
            child.disable();
        }

        super.removeChild(child);

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
     * The parent property of the removed children is set to null and the objects are garbage collected if no other
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
            this.removeChild(<DOMElement>this.children.pop(), destroy);
        }

        this.$element.empty();

        return this;
    }

    /**
     * @overridden DisplayObjectContainer.destroy
     */
    public destroy():void
    {
        // If the addChild method is never called before the $element is detroyed then it will be null and cause an TypeError.
        if (this.$element != null)
        {
            this.$element.unbind();
            this.$element.remove();
        }

        super.destroy();
    }

    /**
     * A way to instantiate view classes by found html selectors.
     *
     * Example: It will find all children elements of the {{#crossLink "DOMElement/$element:property"}}{{/crossLink}} property with the 'js-shareEmail' selector.
     * If any selectors are found the EmailShareComponent class will be instantiated and pass the found jQuery element into the contructor.
     *
     * @method createComponents
     * @param componentList (Array.<{ selector: string; componentClass: DisplayObjectContainer }>
     * @return {Array.<DOMElement>} Returns all the items created from this createComponents method.
     * @public
     * @chainable
     * @example
     *      ClassName.prototype.create = function () {
     *          _super.prototype.create.call(this);
     *
     *          this.createComponents([
     *              {selector: '.js-shareEmail', componentClass: EmailShareComponent},
     *              {selector: '.js-pagination', componentClass: PaginationComponent},
     *              {selector: '.js-carousel', componentClass: CarouselComponent}
     *          ]);
     *      };
     */
    public createComponents(componentList:Array<any>):Array<DOMElement>
    {
        var list:Array<DOMElement>;
        var createdChildren:Array<DOMElement> = [];
        var length:number = componentList.length;
        var obj:any;
        for (var i = 0; i < length; i++)
        {
            obj = componentList[i];
            list = <Array<DOMElement>>ComponentFactory.create(this.$element.find(obj.selector), obj.componentClass, this);
            createdChildren = createdChildren.concat(list);
        }

        return createdChildren;
    }
}

export = DOMElement;
