#!/usr/bin/env node
const commander = require('commander');
const download = require('download-git-repo');
const fs = require('fs-extra');
const chalk = require('chalk');
const ora = require('ora');
const { exec } = require('child_process');

const currentWorkingDirectory = process.cwd();

commander.parse(process.argv);

const processArgvOptions = process.argv.slice(2);
if (!processArgvOptions.length) {
  commander.outputHelp();
  return;
}
const projectName = processArgvOptions[0];

const spinner = ora('downloading code and installing dependencies...').start();
main();

async function main () {
  try {
    const repository = 'direct:https://github.com/renmo/simple-scaffold.git#master';
    const destination = `${currentWorkingDirectory}/${projectName}`;
    const downloadOptions = { clone: true };
    await fs.emptyDir(destination);
    await downloadCode(repository, destination, downloadOptions);
    changePackageName(projectName);
    const command = `cd ${currentWorkingDirectory}/${projectName} && npm i`;
    await execFunc(command);
    spinner.succeed('succeed');
    const promptText = `
      ${chalk.blue(`cd ${projectName}`)}
      
      start development from ${chalk.blue('npm start')} 
    `;
    console.log(promptText);
  } catch (error) {
    spinner.fail('failed');
  }
}
async function changePackageName (projectName) {
  try {
    const packageJson = await fs.readJson(`${currentWorkingDirectory}/${projectName}/package.json`);
    packageJson.name = projectName;
    await fs.writeJson(`${currentWorkingDirectory}/${projectName}/package.json`, packageJson);
  } catch (err) {
    console.log(chalk.red(err));
  }
}

function downloadCode(repository, destination, options) {
  return new Promise((resolve, reject) => {
    download(repository, destination, options, function (err) {
      if (err) {
        reject(err);
        console.log(chalk.red(err));
        return;
      }
      resolve();
    })
  });
}

function execFunc (command) {
  return new Promise((resolve, reject) => {
    exec(command, (err) => {
      if (err) {
        reject(err);
        console.log(chalk.red(err));
        return;
      }
      resolve();
    });
  });
}
