///<reference path='../events/EventDispatcher.ts'/>
///<reference path='../events/BaseEvent.ts'/>
///<reference path='../interfaces/ICommand.ts'/>
///<reference path='../views/StrawberryView.ts'/>

module namespace {

    export class MoveCommand extends EventDispatcher implements ICommand {

        public view:StrawberryView;
        public targetX:number;
        public targetY:number;

        constructor(view:StrawberryView, targetX:number, targetY:number) {
            super();

            this.view = view;
            this.view.addEventListener(BaseEvent.COMPLETE, this.onComplete, this);
            this.targetX = targetX;
            this.targetY = targetY;
        }

        public execute():void {
            this.view.move(this.targetX, this.targetY);
        }

        private onComplete(event:BaseEvent) {
            this.dispatchEvent(event);
        }

    }
}