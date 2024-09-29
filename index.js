// /index.js
import inquirer from "inquirer"
import fs from "node:fs"
import generateMarkdown from "./utils/generateMarkdown.js"
import licenseChoices from "./utils/licenseChoices.js"
import badgeChoices from "./utils/badgeChoices.js"
import { validEntry, validCommaSeparatedString, validEmail } from "./utils/validationFunc.js"

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
        validate: validCommaSeparatedString,
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
        validate: validCommaSeparatedString,
		when: (answers) => answers.usageText.includes("<img>"),
	},
	{
		name: "creditsNames",
		type: "input",
		message:
			"Include the names of any contributors, comma separated (click enter for none)",
        default: null,
		prefix: "Credits (1of2):",
        validate: validCommaSeparatedString, // FIXME: allow the answer 'Null' to be evaluated and return true
	},
	{
		name: "creditsLinks",
		type: "input",
		message:
			"Include the Github URLs for each of your contributors (comma separated) in the order you entered them above",
		prefix: "Credits (2of2):",
        validate: validCommaSeparatedString,
		when: (answers) => Boolean(answers.creditsNames),
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
		name: "Contributing",
		type: "editor",
		message: "What are the guidelines for contributing to this project?",
        default: 'Please read the [Contributor Covenant](https://www.contributor-covenant.org/) before contributing. Checkout a branch, commit changes, and open a pull request.',
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
        valid: (input) => { // custom validation function for Badges
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
		name: "sponsorNames",
		type: "input",
		message: "Add your sponsors (comma separated)",
		prefix: "Sponsors (1of2):",
        validate: validCommaSeparatedString,
		when: (answers) => answers.sections.includes("Sponsors"), // FIXME: update validation to allow for a single entry (no commas)
	},
	{
		name: "sponsorLogos",
		type: "input",
		message:
			"Add the file names of the logos you want in the sponsor order you added above (comma separated)\n  Note: Logos must be in the path /assets/images/ to show correctly",
		prefix: "Sponsors (2of2):",
        validate: validCommaSeparatedString,
		when: (answers) => answers.sections.includes("Sponsors"),
	},
	{
		name: "github",
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

// write the markdown to the README.md file
function writeToFile(fileName, data) {
	// write the README.md file
	fs.writeFile(fileName, data, (err) => {
		if (err) {
			console.error(err)
		}
		console.log("Your README.md file has been created successfully!")
	})
}

// application structure
function init() {
	// collect README.md details from the user
	inquirer.prompt(prompts).then((a) => {
        console.log(a)
		const markDown = generateMarkdown(a)

		// generate the README.md file
		writeToFile("results/README.md", markDown)
	})
}

// initialize app
init()
