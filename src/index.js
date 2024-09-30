// /index.js
import inquirer from "inquirer"
import fs from 'node:fs/promises'
import generateMarkdown from "./utils/generateMarkdown.js"
import licenseChoices from "./utils/licenseChoices.js"
import badgeChoices from "./utils/badgeChoices.js"
import {
	validEntry,
	validCommaSeparatedString,
	validListOfImages,
	validEmail,
} from "./utils/validationFunc.js"

// Collection questions for building the README.md file
const prompts = [
	{
		name: "sections",
		type: "checkbox",
		message:
			"Select what sections you want to include? (sections installation, usage, credits, questions, and license are included)",
		choices: ["Badges", "Features", "Contributing", "Sponsors", "Testing"],
		default: null,
		prefix: "Sections",
	},
	{
		name: "title",
		type: "input",
		message: "What is your application's name?",
		prefix: "Title:",
		validate: validEntry,
	},
	{
		name: "description",
		type: "input",
		message: "What is the motivation and value behind your application?",
		prefix: "Description:",
		validate: validEntry,
	},
	{
		name: "license",
		type: "rawlist",
		message: "What license do you want to use?",
		choices: licenseChoices,
		default: "MIT",
		prefix: "License:",
	},
	{
		name: "installationText",
		type: "editor",
		message:
			"How do you install the application?\n  To include images, use the '<img>' tag as a placeholder.\n  In the next step, you will specify which images to add.",
		prefix: "Installation (1of2):",
		validate: validEntry,
	},
	{
		name: "installationImages",
		type: "input",
		message:
			"Add the file names of the images you want in the order you want them (comma separated)\n  Note: images must be in the path /assets/images/ to show correctly",
		prefix: "Installation (2of2):",
		validate: validListOfImages,
		when: (answers) => answers.installationText.includes("<img>"),
	},
	{
		name: "usageText",
		type: "editor",
		message:
			"How do you use the application?\n  To include images, use the '<img>' tag as a placeholder.\n  In the next step, you will specify which images to add.",
		prefix: "Usage (1of2):",
		validate: validEntry,
	},
	{
		name: "usageImages",
		type: "input",
		message:
			"Add the file names of the images you want in the order you want them (comma separated)\n  Note: images must be in the path /assets/images/ to show correctly",
		prefix: "Usage (2of2):",
		validate: validListOfImages,
		when: (answers) => answers.usageText.includes("<img>"),
	},
	{
		name: "creditsNames",
		type: "input",
		message:
			"Include the names of any contributors, comma separated (click enter for none)",
		default: "None",
		prefix: "Credits (1of2):",
		validate: validCommaSeparatedString,
	},
	{
		name: "creditsLinks",
		type: "input",
		message:
			"Include the Github URLs for each of your contributors (comma separated) in the order you entered them above",
		prefix: "Credits (2of2):",
		validate: validCommaSeparatedString,
		when: (answers) => Boolean((answers.creditsNames === "None") === false),
	},
	{
		name: "features",
		type: "editor",
		message: "What are the main features of the application?",
		prefix: "Features:",
		validate: validEntry,
		when: (answers) => answers.sections.includes("Features"),
	},
	{
		name: "contributing",
		type: "editor",
		message: "What are the guidelines for contributing to this project?",
		default:
			"Please read the [Contributor Covenant](https://www.contributor-covenant.org/) before contributing. To begin contributing to the repo, please checkout a branch, commit changes, and open a pull request.",
		prefix: "Contributing:",
		validate: validEntry,
		when: (answers) => answers.sections.includes("Contributing"),
	},
	{
		name: "testing",
		type: "editor",
		message: "Outline how to test your application?",
		prefix: "Testing:",
		validate: validEntry,
		when: (answers) => answers.sections.includes("Testing"),
	},
	{
		name: "badges",
		type: "checkbox",
		message: "What badges do you want?",
		choices: badgeChoices,
		prefix: "Badges:",
		valid: (input) => {
			// custom validation function for Badges
			return new Promise((resolve, reject) => {
				if (input.length > 0) {
					resolve(true) // Valid entry
				} else {
					reject("Please select at least one badge.") // Error message
				}
			})
		},
		when: (answers) => answers.sections.includes("Badges"),
	},
	{
		name: "sponsorLogos",
		type: "input",
		message:
			"Add the logos of your sponsors (comma separated)\n Note: images must be in the path /assets/images/ to show correctly",
		prefix: "Sponsors:",
		validate: validListOfImages,
		when: (answers) => answers.sections.includes("Sponsors"),
	},
	{
		name: "username",
		type: "input",
		message: "What is your GitHub username?",
		prefix: "Github Username:",
		validate: validEntry,
	},
	{
		name: "email",
		type: "input",
		message: "What email should questions be sent to?",
		prefix: "Questions:",
		validate: validEmail,
	},
]

// create the LICENSE.txt file

async function createLicense(license) {
    let licenseName = ""

	// get the license type
	switch (license) {
		case "Apache 2.0":
			licenseName = "apache_v2"
			break
		case "BSD":
			licenseName = "bsd_3_clause"
			break
		case "Boost 1.0":
			licenseName = "boost_v1"
			break
		case "AN 4.0 Int":
			licenseName = "cc_by_nc_v4"
			break
		case "Hippocratic 3.0":
			licenseName = "hippocratic_v3"
			break
		case "CC0":
			licenseName = "cc0"
			break
		case "ISC":
			licenseName = "isc"
			break
		case "EPL":
			licenseName = "epl"
			break
		case "Affero 3.0":
			licenseName = "agpl_v3"
			break
		case "LGPL":
			licenseName = "lgpl_v3"
			break
		case "IBM 1.0":
			licenseName = "ibm_v1"
			break
		case "MIT":
			licenseName = "mit"
			break
		case "MPL":
			licenseName = "mpl_v2"
			break
		case "SIL 1.1":
			licenseName = "ofl_v1"
			break
		case "Unlicense":
			licenseName = "unlicense"
			break
		default:
			licenseName = "mit"
	}

    try {
        // read the content of the license file
        const data = await fs.readFile(`./licenses/${licenseName}.txt`, { encoding: "utf8"})

        // write the content to the LICENSE.txt file
        await fs.writeFile("LICENSE.txt", data)

        console.log("Your LICENSE.txt file has been created successfully!")
    } catch(err) {
        console.error(`error creating LICENSE.txt file: ${err}`)
    }
}

// write the markdown to the README.md file
async function createREADME(fileName, data) {
    try {
        // write the README.md file
        await fs.writeFile(fileName, data)
        console.log("Your README.md file has been created successfully!")
    } catch(err) {
        console.error(`error writing to file: ${err}`)
    }
}

// application structure
function init() {
    try {
        // collect README.md details from the user
        inquirer.prompt(prompts).then((a) => {
            // generate the markdown
            const markDown = generateMarkdown(a)

            // generate the LICENSE.txt file
            createLicense(a.license)

            // generate the README.md file
            createREADME("README.md", markDown)
        })
    } catch(err) {
        console.error(`error running app: ${err}`)
    }
	
}

// initialize app
init()
