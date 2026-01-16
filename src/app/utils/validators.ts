import { AbstractControl } from "@angular/forms";

export function passwordMatch(control: AbstractControl) {
    if (control && (control.value !== null || control.value !== undefined)) {
        const cnfPassword = control.value;
        const passControl = control.root.get('password');
        if (passControl) {
            const passwordValue = passControl.value;
            if (passwordValue !== cnfPassword) {
                return { 
                    passMismatch: true
                 }
            }
        }
    }
    return null;
}