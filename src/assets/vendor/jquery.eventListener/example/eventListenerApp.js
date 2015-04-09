var EventListenerApp = (function () {

    function EventListenerApp(element) {
        this.$element = $(element);

        this._$stateTest = null;
        this._$rec = null;
        this._$enableButton = null;
        this._$disableButton = null;
        this.isEnabled = false;

        this.createChildren();
    }

    EventListenerApp.prototype.createChildren = function () {

        this._$stateTest = this.$element.find('.js-stateText');
        this._$rec = this.$element.find('.js-Square');
        this._$enableButton = this.$element.find('#js-enableButton');
        this._$disableButton = this.$element.find('#js-disableButton');

        this._$enableButton.addEventListener('click', this.enable, this);
        this._$disableButton.addEventListener('click', this.disable, this);

        this.layoutChildren();
    };

    EventListenerApp.prototype.layoutChildren = function () {
        var text = (this.isEnabled === true) ? 'enabled' : 'disabled';
        this._$stateTest.text(text);
    };

    EventListenerApp.prototype.enable = function () {
        if (this.isEnabled === true) return;
        this.isEnabled = true;

        this._$rec.addEventListener('click', this.changeColor, this);

        this.layoutChildren();
    };

    EventListenerApp.prototype.disable = function () {
        if (this.isEnabled === false) return;
        this.isEnabled = false;

        this._$rec.removeEventListener('click', this.changeColor, this);

        this.layoutChildren();
    };

    EventListenerApp.prototype.changeColor = function (event) {
        $(event.currentTarget).toggleClass('active');
    };

    return EventListenerApp;
})();