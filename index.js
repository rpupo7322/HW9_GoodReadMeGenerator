const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');

// create writeFile function using promises instead of a callback function
const writeFileAsync = util.promisify(fs.writeFile);

const badges = ['[![License: GPL v3](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](http://www.gnu.org/licenses/gpl-3.0)','[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)','[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)']

// ```md
// GIVEN a command-line application that accepts user input
// WHEN I am prompted for information about my application repository
// THEN a high-quality, professional README.md is generated with the title of my project and 
// sections entitled Description, Table of Contents, Installation, Usage, License, Contributing, Tests, and Questions
// WHEN I enter my project title
// THEN this is displayed as the title of the README
// WHEN I enter a description, installation instructions, usage information, contribution guidelines, and test instructions
// THEN this information is added to the sections of the README entitled Description, Installation, 
// Usage, Contributing, and Tests
// WHEN I choose a license for my application from a list of options
// THEN a badge for that license is added near the top of the README and a notice is added to the 
// section of the README entitled License that explains which license the application is covered under
// WHEN I enter my GitHub username
// THEN this is added to the section of the README entitled Questions, with a link to my GitHub profile
// WHEN I enter my email address
// THEN this is added to the section of the README entitled Questions, with instructions on how to reach me 
// with additional questions
// WHEN I click on the links in the Table of Contents
// THEN I am taken to the corresponding section of the README
// ```

const promptUser = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'What is the title of your project?',
    },
    {
      type: 'input',
      name: 'description',
      message: 'Please enter a description of your project.',
    },
    {
      type: 'input',
      name: 'install',
      message: 'Please provide installation instructions.',
    },
    {
      type: 'input',
      name: 'usage',
      message: 'Please provide usage information.',
    },
    {
        type: 'input',
        name: 'contribution',
        message: 'Please provide contribution guidelines.',
    },
    {
        type: 'input',
        name: 'test',
        message: 'Please provide test instructions.',
    },
    {
      type: 'list',
      name: 'license',
      message: 'Choose your preferred license:',
      choices: ['GNU GPLv3', 'MIT License', 'Apache License 2.0']
    },
    {
      type: 'input',
      name: 'GitHub',
      message: 'Enter your GitHub username.',
    },
    {
        type: 'input',
        name: 'email',
        message: 'Enter your email address.',
    },
  ]);
};

var licenseBadge;


const createFile = (answers) => {
    githubLicense(answers);
    writeFileAsync('ReadME.md', generateReadME(answers));
}

const githubLicense = (answers) => {
    if (answers.license === 'GNU GPLv3') {
        licenseBadge = badges[0]
    } else if  (answers.license === 'MIT License') {
        licenseBadge = badges[1]
    } else {
        licenseBadge = badges[2]
    }
}

const generateReadME = (answers) =>
  `# ${answers.title}
${licenseBadge}
## Description
${answers.description}
## Table of Contents
* [Description](#description)
* [Table of contents](#table-of-contents)
* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Contributing](#contributing)
* [Tests](#tests)
* [Questions](#questions)
## Installation
${answers.install}
## Usage
${answers.usage}
## License
${answers.license}
## Contributing
${answers.contribution}
## Tests
${answers.test}
## Questions
Github account: https://github.com/${answers.GitHub}/
Please feel free to reach out with any questions! I can always be reached via the email address below.
Email: ${answers.email}
`;

// Bonus using writeFileAsync as a promise
const init = () => {
  promptUser()
    // .then((answers) => githubLicense(answers))
    // .then((answers) => writeFileAsync('ReadME.md', generateReadME(answers)))
    .then((answers) => createFile(answers))
    .then(() => console.log('Successfully wrote to ReadME.md'))
    .catch((err) => console.error(err));
};

init();
