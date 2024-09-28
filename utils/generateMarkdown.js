// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(license) {}

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) {}

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) {
    return 'rendered licenses section'
    // add renderLicenseLink()
    // add renderLicenseBadge()
}

// TODO: Create a function to generate markdown for README
function generateMarkdown(data) {
	const markDown = `
        # ${data.title}

        ## Description
        ${data.description}

        ## Table of Contents
        - [Installation](#installation)
        - [Usage](#usage)
        - [License](#license)
        - [Badges](#badges)
        - [Features](#features)
        - [Contribute](#contribute)
        - [Testing](#testing)
        - [Credits](#credits)
        - [Contacts](#Contact)

        ## Installation
        ${data.installation}

        ## Usage
        ${data.usage}

        ## License
        ${renderLicenseSection(data.license)}

        ## Badges
        Insert more badges

        ## Features
        ${data.features}

    `

    return markDown.replace(/^ +/gm, '')
}

export default generateMarkdown
