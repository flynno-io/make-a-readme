// /index.js
import inquirer from "inquirer";
import generateMarkdown from "./utils/generateMarkdown";
import licenseChoices from "./utils/licenseChoices";


// TODO: Create an array of questions for user input
const questions = [
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
        choices: licenseChoices,
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

