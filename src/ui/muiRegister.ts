import type { UseFormRegisterReturn } from 'react-hook-form'

// מחבר את register של react-hook-form לשדה TextField של MUI
// (ב-MUI ה-ref של השדה עצמו נקרא inputRef)
export function muiRegister({ ref, ...rest }: UseFormRegisterReturn) {
    return { ...rest, inputRef: ref }
}
