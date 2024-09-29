
export const validCommaSeparatedString = (input) => {
    return new Promise((resolve, reject) => {
        // Regular expression for basic email validation
        const commasSeparatedList = /^([^,]+)(,\s*[^,]+)*$/

        if (commasSeparatedList.test(input)) {
            resolve(true) // Valid comma-separated list
        } else {
            reject("Please separate items by commas.") // Error message
        }
    })
}

export const validEmail = (input) => {
    return new Promise((resolve, reject) => {
        // Regular expression for basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if (emailRegex.test(input)) {
            resolve(true) // Valid email
        } else {
            reject("Please enter a valid email address.") // Error message
        }
    })
}

