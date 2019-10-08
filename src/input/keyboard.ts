import { isNullOrUndefined } from "util";

export const keyboard = {
    callbacksUp: {},
    callbacksDown: {},
    setup() {
        document.onkeyup = this.keyup;
        document.onkeydown = this.keydown;
    },
    bind(char: string, upFn: Function, downFn: Function) {
        this.callbacksUp[char] = upFn;
        this.callbacksDown[char] = downFn;
    },
    keyup(event: KeyboardEvent) {
        const callback = (keyboard.callbacksUp as any)[event.key];
        if (!isNullOrUndefined(callback)) {
            callback();
        }
    },
    keydown: (event: KeyboardEvent) => {
        const callback = (keyboard.callbacksDown as any)[event.key];
        if (!isNullOrUndefined(callback)) {
            callback();
        }
    }
};