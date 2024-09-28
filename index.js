// /index.js
import inquirer from "inquirer"
import fs from "node:fs"
import generateMarkdown from "./utils/generateMarkdown.js"
import licenseChoices from "./utils/licenseChoices.js"
import badgeChoices from "./utils/badgeChoices.js"

const prompts = [
	{
		name: "sections",
		type: "checkbox",
		message:
			"Select what sections you want to include? (sections installation, usage, credits, questions, and license are included)",
		choices: ["Badges", "Features", "Contributing", "Sponsors", "Testing"],
		default: null,
	},
	{
		name: "title",
		type: "input",
		message: "What is your application's name?",
	},
	{
		name: "description",
		type: "input",
		message: "What is the motivation and value behind your application?",
	},
	{
		name: "license",
		type: "rawlist",
		message: "What license do you want to use?",
		choices: licenseChoices,
	},
	{
		name: "installationText",
		type: "editor",
		message: "How is the application installed? (provide numbered steps)",
		prefix: "Installation (1of2):",
	},
    {
		name: "installationImages",
		type: "input",
		message: "Add the path(s) to images (separated by commas) to include in the Installation section ",
		prefix: "Installation (2of2):",
	},
	{
		name: "usageText",
		type: "editor",
		message: "How do you use the application? (provide numbered steps)",
	},
    {
		name: "usageImgs",
		type: "input",
		message: "Add the path(s) to the image(s) you want to include in order they should appear in your usage section",
        when: (answers) => answers.usageText.includes('<img>') === -1 ? false : true,
	},
	{
		name: "creditsNames",
		type: "input",
		message: "Include the names of any contributors, comma separated (click enter for none)",
        prefix: "Credits (1of2)",
        default: ''
	},
    {
		name: "creditsLinks",
		type: "input",
		message: "Include the Github URLs for each of your contributors (comma separated) in the order you entered them above",
        prefix: "Credits (2of2)",
        when: (answers) => Boolean(answers.creditsNames)
	},
    {
		type: "editor",
		message: "What are the main features of the application?",
		name: "features",
		when: (answers) => answers.sections.includes("Features"),
	},
	{
		type: "editor",
		message: "How do you contribute to the project?",
		name: "Contributing",
		when: (answers) => answers.sections.includes("Contributing"),
	},
	{
		type: "editor",
		message: "Describe how to test your application?",
		name: "testing",
		when: (answers) => answers.sections.includes("Testing"),
	},
	{
		type: "checkbox",
		message: "What badges do you want?",
		name: "badges",
        choices: badgeChoices,
		when: (answers) => answers.sections.includes("Badges"),
	},
	{
		type: "input",
		message: "Add your sponsors (comma separated)",
		name: "sponsorNames",
        prefix: "Sponsors (1of2)",
		when: (answers) => answers.sections.includes("Sponsors"),
	},
	{
		type: "input",
		message: "Add the logo paths for each of the sponsors in the order you entered previously (comma separated)",
		name: "sponsorLogos",
        prefix: "Sponsors (2of2)",
		when: (answers) => answers.sections.includes("Sponsors"),
	},
	{
		type: "input",
		message: "What is your GitHub username?",
		name: "github",
	},
	{
		type: "input",
		message: "What email should questions be sent to?",
		name: "email",
		validate: (input) => {
			return new Promise((resolve, reject) => {
				// Regular expression for basic email validation
				const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

				if (emailRegex.test(input)) {
					resolve(true) // Valid email
				} else {
					reject("Please enter a valid email address.") // Error message
				}
			})
		},
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

// Application runner
function init() {
	// collect README.md details from the user
	inquirer.prompt(prompts).then((a) => {
		const markDown = generateMarkdown(a)

        console.log(a)

		// generate the README.md file
		writeToFile("results/README.md", markDown)
	})
}

// Function call to initialize app
init()
