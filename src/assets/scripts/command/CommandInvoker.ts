///<reference path='../interfaces/ICommand.ts'/>
///<reference path='../events/EventDispatcher.ts'/>
///<reference path='../events/BaseEvent.ts'/>
///<reference path='../events/LoaderEvent.ts'/>

module namespace {

    export class CommandInvoker {

        private _commands:Array<ICommand> = [];
        private _isBusy:boolean = false;

        public add(command:ICommand):void {
            command.addEventListener(BaseEvent.COMPLETE, this.executeNext, this);

            this._commands.push(command);

            this.attemptExecute();
        }

        private attemptExecute():void {
            if (this._isBusy === false) {
                this.executeNext();
            }
        }

        private executeNext(event:BaseEvent = null):void {
            if (event !== null) {
                event.target.removeEventListener(BaseEvent.COMPLETE, this.executeNext, this);
            }

            this._isBusy = false;

            if (this._commands.length > 0) {
                this._isBusy = true;

                var command:ICommand = this._commands.shift();
                command.execute();
            }
        }

    }
}