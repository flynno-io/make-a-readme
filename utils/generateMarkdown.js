// utils/generateMarkdown.js

function renderLicenseBadge(license) {
    console.log(license)
    let licenseBadge
    switch (license) {
        case "Hippo3.0":
            licenseBadge = "[![License: Hippocratic 3.0](https://img.shields.io/badge/License-Hippocratic_3.0-lightgrey.svg)](https://firstdonoharm.dev)"
            break
        case "Apache2.0":
            licenseBadge = "[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)"
            break
        case "BSD":
            licenseBadge = "[![License](https://img.shields.io/badge/License-BSD_3--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)"
            break
        case "Boost1.0":
            licenseBadge = "[![License](https://img.shields.io/badge/License-Boost_1.0-lightblue.svg)](https://www.boost.org/LICENSE_1_0.txt)"
            break
        case "CDDL":
            licenseBadge = "![CDDL Badge](https://img.shields.io/badge/CDDL-025DF4?style=for-the-badge&logo=open-source-initiative&logoColor=white)"
            break
        case "CC0":
            licenseBadge = "[![License: CC0-1.0](https://licensebuttons.net/l/zero/1.0/80x15.png)](http://creativecommons.org/publicdomain/zero/1.0/)"
            break
        case "ISC":
            licenseBadge = "[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)"
            break
        case "EPL":
            licenseBadge = "[![License](https://img.shields.io/badge/License-EPL_1.0-red.svg)](https://opensource.org/licenses/EPL-1.0)"
            break
        case "Affero3.0":
            licenseBadge = "[![License: AGPL v3](https://img.shields.io/badge/License-AGPL_v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)"
            break
        case "LGPL":
            licenseBadge = "[![License: LGPL v3](https://img.shields.io/badge/License-LGPL_v3-blue.svg)](https://www.gnu.org/licenses/lgpl-3.0)"
            break
        case "IBM1.0":
            licenseBadge = "[![License: IPL 1.0](https://img.shields.io/badge/License-IPL_1.0-blue.svg)](https://opensource.org/licenses/IPL-1.0)"
            break
        case "MIT":
            licenseBadge = "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)"
            break
        case "MPL":
            licenseBadge = "[![License: MPL 2.0](https://img.shields.io/badge/License-MPL_2.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)"
            break
        case "SIL1.1":
            licenseBadge = "[![License: Open Font-1.1](https://img.shields.io/badge/License-OFL_1.1-lightgreen.svg)](https://opensource.org/licenses/OFL-1.1)"
            break
        case "Uni":
            licenseBadge = "[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)"
            break
        default:
            licenseBadge = ''
    }
    return licenseBadge
}

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

function renderSponsors(names, logos) {
    // return
}

// TODO: Create a function to generate markdown for README
function generateMarkdown(data) {
	const markDown = `
        # ${data.title} ${renderLicenseBadge(data.license)}
        ${data.badges.join(" ")}

        ## Description
        ${data.description}

        ## Table of Contents
        - [Installation](#installation)
        - [Usage](#usage)
        - [Credits](#credits)
        ${data.sections.includes('Features') ? '- [Features](#features)' : '' }
        ${data.sections.includes('Contribute') ? '- [Contribute](#contribute)' : '' }
        ${data.sections.includes('Testing') ? '- [Testing](#testing)' : '' }
        ${data.sections.includes('Sponsors') ? '- [Sponsors](#sponsors)' : '' }
        - [Questions](#questions)
        - [License](#license)

        ## Installation
        ${data.installation}

        ## Usage
        ${data.usage}

        ${data.sections.includes('Features') ? '## Features\n' + data.features : '' }

        ${data.sections.includes('Contribute') ? '## Contribute\n' + data.contribute : '' }

        ${data.sections.includes('Testing') ? '## Testing\n' + data.testing : '' }

        ${data.sections.includes('Sponsors') ? '## Sponsors\n' + renderSponsors(data.sponsorNames, data.sponsorLogos) : '' }

        ## License
        ${renderLicenseSection(data.license)}
    `

    return markDown.replace(/^ +/gm, '')
}

export default generateMarkdown
