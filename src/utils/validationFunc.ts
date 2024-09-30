
export const validEntry = (input: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        if (input) {
            resolve(true) // Valid entry
        } else {
            reject("Please enter a response.") // Error message
        }
    })
}

export const validListOfImages = (input: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        // Regular expression to validate a comma-separated list of image file names
        const imageFiles = /^([\w]+\.(jpg|jpeg|png|gif|bmp|webp|tiff))(,\s*[\w]+\.(jpg|jpeg|png|gif|bmp|webp|tiff))*$/

        if (imageFiles.test(input)) {
            resolve(true) // Valid comma-separated list
        } else {
            reject("Please separate items by commas and ensure all files are image file types.") // Error message
        }
    })
}

export const validCommaSeparatedString = (input: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        // Regular expression for basic email validation
        const commasSeparatedList = /^([^,]+)(,\s*[^,]+)*$/
        const singleAnswer = /^([^,]+)$/

        if (input === "none") {
            resolve(true) // Valid response
        } else if (singleAnswer.test(input)) {
            resolve(true)
        } else if (commasSeparatedList.test(input)) {
            resolve(true)
        } else if (!input) {
            reject("Please enter a response.") // Error message
        } else {
            reject("Please separate items by commas.") // Error message
        }
    })
}

export const validEmail = (input: string): Promise<boolean> => {
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

