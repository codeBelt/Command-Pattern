///<reference path='../events/EventDispatcher.ts'/>
///<reference path='../events/BaseEvent.ts'/>
///<reference path='../interfaces/ICommand.ts'/>
///<reference path='../views/ReceiverView.ts'/>

module namespace {

    export class MoveCommand extends EventDispatcher implements ICommand {

        public view:ReceiverView;
        public targetX:number;
        public targetY:number;

        constructor(view:ReceiverView, targetX:number, targetY:number) {
            super();

            this.view = view;
            this.targetX = targetX;
            this.targetY = targetY;
        }

        public execute():void {
            var tweenLite:TweenLite = this.view.move(this.targetX, this.targetY);
            tweenLite.eventCallback('onComplete', this.onComplete.bind(this));
        }

        private onComplete() {
            this.dispatchEvent(BaseEvent.COMPLETE);
        }

    }
}