///<reference path='../events/EventDispatcher.ts'/>
///<reference path='../interfaces/ICommand.ts'/>
///<reference path='../views/ReceiverView.ts'/>

module namespace {

    export class GrowCommand extends EventDispatcher implements ICommand {

        public view:ReceiverView;

        constructor(view:ReceiverView) {
            super();

            this.view = view;
        }

        public execute():void {
            var tweenLite:TweenLite = this.view.grow();
            tweenLite.eventCallback('onComplete', this.onComplete.bind(this));
        }

        private onComplete() {
            this.dispatchEvent(BaseEvent.COMPLETE);
        }

    }
}