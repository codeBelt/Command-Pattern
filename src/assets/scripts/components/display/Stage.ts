///<reference path='DisplayObject.ts'/>

module namespace {

    export class Stage {

        public static canvas:any;

        constructor() {
        }

        public static update():void {
            Stage.canvas.update();
        }

    }
}