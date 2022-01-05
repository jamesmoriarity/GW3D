import { INPUTMODE_VALUES } from "./GridInputModes"

export function validateKey(key: string, inputMode: string): number{
    let translatedKey: number = translateKey(key)
    if (translatedKey === -1) { return -1 }
    if (isUnacceptibleZero(translatedKey, inputMode)) { return -1 }
    return translatedKey
}

function isUnacceptibleZero(key: number, inputMode: string): boolean {
    return (key === 0 && (inputMode !== INPUTMODE_VALUES))
}

function translateKey(key: string): number{
    key = (key === "Backspace") ? "0" : key
    key = (key === "Enter") ? "0" : key
    let keyNum = parseInt(key)
    if (isNaN(keyNum)) {
        return -1
    }
    return keyNum
}