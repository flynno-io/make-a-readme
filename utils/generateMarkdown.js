// utils/generateMarkdown.js

function renderLicenseBadge(license) {
	let licenseBadge
	switch (license) {
		case "Hippocratic 3.0":
			licenseBadge =
				"[![License: Hippocratic 3.0](https://img.shields.io/badge/License-Hippocratic_3.0-lightgrey.svg)](https://firstdonoharm.dev)"
			break
		case "Apache2.0":
			licenseBadge =
				"[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)"
			break
		case "BSD":
			licenseBadge =
				"[![License](https://img.shields.io/badge/License-BSD_3--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)"
			break
		case "Boost1.0":
			licenseBadge =
				"[![License](https://img.shields.io/badge/License-Boost_1.0-lightblue.svg)](https://www.boost.org/LICENSE_1_0.txt)"
			break
		case "AN 4.0 Int":
			licenseBadge =
				"[![License: CC BY-NC 4.0](https://licensebuttons.net/l/by-nc/4.0/80x15.png)](https://creativecommons.org/licenses/by-nc/4.0/)"
			break
		case "CC0":
			licenseBadge =
				"[![License: CC0-1.0](https://licensebuttons.net/l/zero/1.0/80x15.png)](http://creativecommons.org/publicdomain/zero/1.0/)"
			break
		case "ISC":
			licenseBadge =
				"[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)"
			break
		case "EPL":
			licenseBadge =
				"[![License](https://img.shields.io/badge/License-EPL_1.0-red.svg)](https://opensource.org/licenses/EPL-1.0)"
			break
		case "Affero3.0":
			licenseBadge =
				"[![License: AGPL v3](https://img.shields.io/badge/License-AGPL_v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)"
			break
		case "LGPL":
			licenseBadge =
				"[![License: LGPL v3](https://img.shields.io/badge/License-LGPL_v3-blue.svg)](https://www.gnu.org/licenses/lgpl-3.0)"
			break
		case "IBM1.0":
			licenseBadge =
				"[![License: IPL 1.0](https://img.shields.io/badge/License-IPL_1.0-blue.svg)](https://opensource.org/licenses/IPL-1.0)"
			break
		case "MIT":
			licenseBadge =
				"[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)"
			break
		case "MPL":
			licenseBadge =
				"[![License: MPL 2.0](https://img.shields.io/badge/License-MPL_2.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)"
			break
		case "SIL1.1":
			licenseBadge =
				"[![License: Open Font-1.1](https://img.shields.io/badge/License-OFL_1.1-lightgreen.svg)](https://opensource.org/licenses/OFL-1.1)"
			break
		case "Uni":
			licenseBadge =
				"[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)"
			break
		default:
			licenseBadge = ""
	}
	return licenseBadge
}

function renderLicenseLink(license) {
	if (license) {
		return `[${license}](LICENSE.txt)`
	} else {
		return ""
	}
}

function renderLicenseSection(license) {
	if (license) {
		return `
            ## License
            Licensed under the ${renderLicenseLink(license)} license.
            `
	} else {
		return ""
	}
}

function renderTextAndImages(text, stringOfImages) {
	let str = text
	let counter = 0

	function splitImagesIntoArray(stringOfImages) {
		// if no comma found, return the single value
		if (!stringOfImages.includes(",")) {
			return stringOfImages.trim()
		}
		let images = stringOfImages.split(",")
		const imagesCleaned = images.map((img) => img.trim())
		return imagesCleaned
	}

    const images = splitImagesIntoArray(stringOfImages)

    while ((str.indexOf("<img>", 0)) !== -1) {
        const image = typeof(images) !== 'string' ? images[counter] : images
        const imageLink = `![alt application screenshot](/assets/images/${image})`
        str = str.replace("<img>", imageLink)
        counter += 1
    }

    return str
}

function renderCredits(names, links) {
	return "Credits have been **RENDERED**"
}

// generates Markdown to be passed into the writeFile function
function generateMarkdown(data) {
	const markDown = `
        # ${data.title} 
        ${renderLicenseBadge(data.license)}
        ${data.sections.includes("Badges") ? data.badges.join(" ") : ""}

        ## Description
        ${data.description}

        ## Table of Contents
        - [Installation](#installation)
        - [Usage](#usage)
        - [Credits](#credits)
        ${data.sections.includes("Features") ? "- [Features](#features)" : ""}
        ${
            data.sections.includes("Contributing")
                ? "- [Contributing](#contributing)"
                : ""
        }
        ${data.sections.includes("Testing") ? "- [Testing](#testing)" : ""}
        ${data.sections.includes("Sponsors") ? "- [Sponsors](#sponsors)" : ""}
        - [Questions](#questions)
        ${renderLicenseSection(data.license) ? "- [License](#license)" : ""}

        ## Installation
        ${
            data.installationImages
                ? renderTextAndImages(
                        data.installationText,
                        data.installationImages
                    )
                : data.installationText
        }

        ## Usage
        ${
            data.usageImages
                ? renderTextAndImages(data.usageText, data.usageImages)
                : data.usageText
        }

        ## Credits
        ${renderCredits(data.creditsNames, data.creditsLinks)}

        ${
            data.sections.includes("Features")
                ? "## Features\n" + data.features
                : ""
        }

        ${
            data.sections.includes("Contributing")
                ? "## Contributing\n" + data.Contributing
                : ""
        }

        ${
            data.sections.includes("Testing")
                ? "## Testing\n" + data.testing 
                : ""
        }

        ${
            data.sections.includes("Sponsors")
                ? "## Sponsors\n" + data.sponsorLogos
                    ? renderTextAndImages(data.sponsorNames, data.sponsorLogos)
                    : data.sponsorNames
                : ""
        }

        ${renderLicenseSection(data.license)}
    `

	return markDown.replace(/^ +/gm, "")
}

export default generateMarkdown
