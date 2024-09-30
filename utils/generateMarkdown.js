// utils/generateMarkdown.js

function renderLicenseBadge(license) {
	let licenseBadge
	switch (license) {
		case "Hippocratic 3.0":
			licenseBadge =
				"[![Hippocratic License HL3-FULL](https://img.shields.io/static/v1?label=Hippocratic%20License&message=HL3-FULL&labelColor=5e2751&color=bc8c3d)](https://firstdonoharm.dev/version/3/0/full.html)"
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
    if (names) {
        const namesArray = names.split(",")
        const linksArray = links.split(",")
        const credits = namesArray.map((name, index) => {
            return `- [${name}](${linksArray[index]})`
        })
        return credits.join("\n")
    } else {
        return ""
    }
}

function renderSponsorLogos(logos) {
    if (logos) {
        const logosArray = logos.split(",")
        const sponsorLogos = logosArray.map((logo) => {
            return `![alt sponsor logo](/assets/images/${logo})`
        })
        return sponsorLogos.join("\n")
    } else {
        return ""
    }
}

function cleanMarkdown(markdown) {
    const cleanedMarkdown = markdown.replace(/^ +/gm, "").replace(/\n{2,}/g, '\n') // remove leading spaces and double new lines
    return cleanedMarkdown
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
        ${data.creditsNames !== "None"
            ?"- [Credits](#credits)"
            : ""
        }
        - [Credits](#credits)
        ${
            data.sections.includes("Features")
                ? "- [Features](#features)"
                : ""
        }
        ${
            data.sections.includes("Contributing")
                ? "- [Contributing](#contributing)"
                : ""
        }
        ${
            data.sections.includes("Testing")
                ? "- [Testing](#testing)"
                : ""
        }
        ${
            data.sections.includes("Sponsors")
                ? "- [Sponsors](#sponsors)"
                : ""
        }
        - [Questions](#questions)
        ${
            renderLicenseSection(data.license)
                ? "- [License](#license)"
                : ""
        }

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

        ${
            data.creditsNames !== "None"
                ? "## Credits\n" + "A special thanks to the following contributors:\n" + renderCredits(data.creditsNames, data.creditsLinks)
                : ""
        }
        
        

        ${
            data.sections.includes("Features")
                ? "## Features\n" + data.features
                : ""
        }

        ${
            data.sections.includes("Contributing")
                ? "## Contributing\n" + data.contributing
                : ""
        }

        ${
            data.sections.includes("Testing")
                ? "## Testing\n" + data.testing 
                : ""
        }

        ${
            data.sections.includes("Sponsors")
                ? "## Sponsors\n" + renderSponsorLogos(data.sponsorLogos)
                : ""
        }

        ## Questions
        Please direct all questions to me, [${data.username}](https://github.com/${data.username}). 
        Send me an email at ${data.email} with your name, email, and question(s). Thanks!

        ${renderLicenseSection(data.license)}
    `
    return cleanMarkdown(markDown)
}

export default generateMarkdown