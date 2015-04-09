module namespace {

    export class BaseEvent {

        public static ENTER_FRAME:string = "baseEventEnterFrame";

        public type:string = null;
        public target:any = null;
        public data:any = null;

        constructor(type:string, target:any, data:any = null)
        {
            this.type = type;
            this.target = target;
            this.data = data;
        }

    }
}