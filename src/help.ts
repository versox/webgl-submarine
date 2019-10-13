import { keyboard } from "./input/keyboard";

let helped = false;

export function setupHelp() {
    keyboard.bindDown('F1', showHelp);
}

function showHelp() {
    if (!helped) {
        const help = document.createElement('div');
        help.innerHTML =`
            Help<br/>
            ------------------<br/>
            S spins propeller<br/>
            F goes forward<br/>
            B goes backward<br/>
            Up raises the sub<br/>
            Down lowers the sub<br/>
            Right turns right<br/>
            Left turns left
        `;
        help.className = 'help';
        document.body.appendChild(help);
        helped = true;
    }
}