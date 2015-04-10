///<reference path='../interfaces/ICommand.ts'/>
///<reference path='../events/EventDispatcher.ts'/>
///<reference path='../events/BaseEvent.ts'/>
///<reference path='../events/LoaderEvent.ts'/>

module namespace {

    export class CommandList {

        private commands:Array<ICommand> = [];
        private isBusy:boolean = false;

        public add(command:ICommand):void {
            command.addEventListener(BaseEvent.COMPLETE, this.executeNext, this);

            this.commands.push(command);

            this.attemptExecute();
        }

        private attemptExecute():void {
            if (this.isBusy === false) {
                this.executeNext();
            }
        }

        private executeNext(event:BaseEvent = null):void {
            if (event !== null) {
                event.target.removeEventListener(BaseEvent.COMPLETE, this.executeNext, this);
            }

            this.isBusy = false;

            if (this.commands.length > 0) {
                this.isBusy = true;

                var command:ICommand = this.commands.shift();
                command.execute();
            }
        }

    }
}