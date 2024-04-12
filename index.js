#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
// initialize user balance and pin code
let Balance = 8000;
let myPin = 4321;
// Print wellcome message
console.log(chalk.yellow("\n \tWellcome to ATM Machine\n"));
let pinAnswer = await inquirer.prompt([
    {
        name: "pin",
        type: "number",
        message: chalk.red("Enter your pin code:")
    }
]);
if (pinAnswer.pin === myPin) {
    console.log(chalk.blue("\n \tYour Pin is Correct, Login Successfully!\n"));
    let oprationAns = await inquirer.prompt([
        {
            name: "opration",
            type: "list",
            message: "select an opration",
            choices: ["Withdraw Amount", "Check Balance"]
        }
    ]);
    if (oprationAns.opration === "Withdraw Amount") {
        let withdrawAns = await inquirer.prompt([
            {
                name: "wiithdrawMethod",
                type: "list",
                message: "select a withdraw method",
                choices: ["Fast Cash", "Enter Amount"]
            }
        ]);
        if (withdrawAns.wiithdrawMethod === "Fast Cash") {
            let fastCashAns = await inquirer.prompt([
                {
                    name: "fastCash",
                    type: "list",
                    message: "Select Amount:",
                    choices: [1000, 3000, 5000, 8000]
                }
            ]);
            if (fastCashAns.fastCash > Balance) {
                console.log(chalk.yellow("insuficient balance"));
            }
            else {
                Balance -= fastCashAns.fastCash;
                console.log(chalk.green(`${fastCashAns.fastCash} Withdraw Successfully`));
                console.log(chalk.green(`Your Remaining Balance is: ${Balance}`));
            }
        }
        else if (withdrawAns.wiithdrawMethod === "Enter Amount") {
            let amountAns = await inquirer.prompt([
                {
                    name: "amount",
                    type: "number",
                    message: "Enter the amount to withdraw:"
                }
            ]);
            if (amountAns.amount > Balance) {
                console.log(chalk.red("Insufficient Balance"));
            }
            else {
                Balance -= amountAns.amount;
                console.log(`${amountAns.amount} Withdraw Successfully`);
                console.log(chalk.green(`Your Remaining Balance is: ${Balance}`));
            }
        }
    }
    else if (oprationAns.opration === "Check Balance") {
        console.log(chalk.yellow(`Your Current Account Balance is: ${Balance}`));
    }
}
else {
    console.log(chalk.red("\n \tYour Pin is Incorrect, Try Again!\n"));
}
