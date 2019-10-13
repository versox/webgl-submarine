import { isNullOrUndefined } from "util";

export const keyboard = {
    callbacksUp: {},
    callbacksDown: {},
    setup() {
        document.onkeyup = this.keyup;
        document.onkeydown = this.keydown;
    },
    bind(char: string, upFn: Function, downFn: Function) {
        const ups: Function[] = this.callbacksUp[char];
        if (isNullOrUndefined(ups)) {
            this.callbacksUp[char] = []; 
        }
        const downs: Function[] = this.callbacksDown[char];
        if (isNullOrUndefined(downs)) {
            this.callbacksDown[char] = [];
        }
        this.callbacksUp[char].push(upFn);
        this.callbacksDown[char].push(downFn);
    },
    keyup(event: KeyboardEvent) {
        const callbacks: Function[] = (keyboard.callbacksUp as any)[event.key];
        if (!isNullOrUndefined(callbacks)) {
            callbacks.forEach(c => {
                c();
            });
        }
    },
    keydown: (event: KeyboardEvent) => {
        const callbacks: Function[] = (keyboard.callbacksDown as any)[event.key];
        if (!isNullOrUndefined(callbacks)) {
            callbacks.forEach(c => {
                c();
            });
        }
    }
};