export function randomChars(length) {
    let result = ''
    let characters = 'abcdefghijklmnopqrstuvwxyz0123456789'
    let charactersLength = characters.length
    for (let i = 0; i < length; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        )
    }
    return result
}

export function randomNum(length) {
    let result = ''
    let numbers = '0123456789'
    let numbersLength = numbers.length
    for (let i = 0; i < length; i++) {
        result += numbers.charAt(Math.floor(Math.random() * numbersLength))
    }
    return result
}

export function randomLetter(length) {
    let result = ''
    let letters = 'abcdefghijklmnopqrstuvwxyz'
    let lettersLength = letters.length
    for (let i = 0; i < length; i++) {
        result += letters.charAt(Math.floor(Math.random() * lettersLength))
    }
    return result
}
