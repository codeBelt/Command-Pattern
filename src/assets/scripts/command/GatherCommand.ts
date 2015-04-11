///<reference path='../events/EventDispatcher.ts'/>
///<reference path='../interfaces/ICommand.ts'/>
///<reference path='../views/StrawberryView.ts'/>

module namespace {

    export class GatherCommand extends EventDispatcher implements ICommand {

        public view:StrawberryView;

        constructor(view:StrawberryView) {
            super();

            this.view = view;
        }

        public execute():void {
            var tweenLite:TweenLite = this.view.gather();
            tweenLite.eventCallback('onComplete', this.onComplete.bind(this));
        }

        private onComplete() {
            this.dispatchEvent(BaseEvent.COMPLETE);
        }

    }
}