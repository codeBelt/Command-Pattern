///<reference path='BaseEvent.ts'/>

module namespace {

    export class LoaderEvent extends BaseEvent {

        public static COMPLETE:string = "loaderEventComplete";
        public static LOAD_COMPLETE:string = "loaderEventLoadComplete";

        constructor(type:string, target:any)
        {
            super(type, target);
        }

    }
}