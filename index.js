// TODO: Include packages needed for this application
import inquirer from "inquirer";
import generateMarkdown from "./utils/generateMarkdown";

// TODO: Create an array of questions for user input
const questions = [
    // Description, Table of Contents, Installation, Usage, License, Contributing, Tests, and Questions
    {
        name: "title",
        type: "input",
        message: "What is your application's name? ",
    },
    {
        name: "description",
        type: "input",
        message: "Provide a brief description of the application e.g. purpose, functionality? ",
    },
    {
        name: "installation",
        type: "editor",
        message: "How do you install your project? ",
    },
    {
        name: "usage",
        type: "editor",
        message: "How do you use the application? ",
    },
    {
        name: "license",
        type: "rawlist",
        message: "What license do you want to use? ",
        choices: [
            "Affero General Public (AGPL)",
            "Apache 2.0",
            "BSD (3-Clause, 2-Clause)",
            "Boost Software License 1.0",
            "Common Development and Distribution (CDDL)",
            "Creative Commons Zero (CC0)",
            "Dual Licensing",
            "Eclipse Public (EPL)",
            "GNU General Public (GPL) 2.0 & 3.0",
            "GNU Lesser General Public (LGPL)",
            "Microsoft Public (Ms-PL)",
            "MIT",
            "Mozilla Public (MPL)",
            "Proprietary",
            "Unlicense",
        ]
    },
    {
        type: "editor",
        message: "How do you contribute to the project? ",
        name: "contribution"
    },
    {
        type: "editor",
        message: "How do you test the project? ",
        name: "tests"
    },
    {
        type: "input",
        message: "What is your GitHub username? ",
        name: "github"
    },
    {
        type: "input",
        message: "What email do you want to send questions to? ",
        name: "email"
    },
];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    // write the README.md file
    fs.writeFile(fileName, data, (err) => {
        if (err) {
            console.error(err);
        }
        console.log("Your README.md file has been created successfully!");
    });
}

// TODO: Create a function to initialize app
function init() {
    // collect README.md details from the user
    inquirer.prompt(questions).then((a) => {
        const markDown = generateMarkdown(a);

        // generate the README.md file
        writeToFile("README.md", markDown);
    })


}

// Function call to initialize app
init();

// *** GIVEN a command-line application that accepts user input ***

// WHEN I am prompted for information about my application repository
// THEN a high-quality, professional README.md is generated with the title of my project and sections entitled Description, Table of Contents, Installation, Usage, License, Contributing, Tests, and Questions

// WHEN I enter my project title
// THEN this is displayed as the title of the README

// WHEN I enter a description, installation instructions, usage information, contribution guidelines, and test instructions
// THEN this information is added to the sections of the README entitled Description, Installation, Usage, Contributing, and Tests

// WHEN I choose a license for my application from a list of options
// THEN a badge for that license is added near the top of the README and a notice is added to the section of the README entitled License that explains which license the application is covered under

// WHEN I enter my GitHub username
// THEN this is added to the section of the README entitled Questions, with a link to my GitHub profile

// WHEN I enter my email address
// THEN this is added to the section of the README entitled Questions, with instructions on how to reach me with additional questions

// WHEN I click on the links in the Table of Contents
// THEN I am taken to the corresponding section of the README

