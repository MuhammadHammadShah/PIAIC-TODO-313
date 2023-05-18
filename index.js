import inquirer from "inquirer";
import chalk from "chalk";
import figlet from "figlet";
figlet("Todo List !! ", function (err, data) {
    if (err) {
        console.log("Something went wrong...");
        console.dir(err);
        return;
    }
    console.log(chalk.green(data));
});
let todo_list = [];
async function repeatFlow() {
    const answer = await inquirer.prompt([
        {
            name: "repeat",
            type: "list",
            choices: ["Yes", "No"],
            message: "Do you want to perform another operation?",
        },
    ]);
    return answer.repeat === "Yes" ? true : false;
}
async function TodoList() {
    let startAgain = true;
    do {
        const answer = await inquirer.prompt([
            {
                name: "option",
                type: "list",
                choices: ["AddItem", "Display", "RemoveItem"],
                message: "What do you want to do?",
            },
        ]);
        if (answer.option === "AddItem") {
            const newItem = await inquirer.prompt([
                {
                    name: "newItem",
                    type: "input",
                    message: "Enter new item:",
                },
            ]);
            todo_list.push(newItem.newItem);
            startAgain = await repeatFlow();
        }
        else if (answer.option === "Display") {
            if (todo_list.length == 0) {
                console.log(chalk.red("No items found"));
            }
            else {
                todo_list.forEach((element) => console.log(element));
            }
            startAgain = await repeatFlow();
        }
        else if (answer.option === "RemoveItem") {
            if (todo_list.length == 0) {
                console.log(chalk.red("No items found"));
            }
            else {
                const removeItem = await inquirer.prompt([
                    {
                        name: "remove",
                        type: "list",
                        choices: todo_list,
                        message: "Select an item to remove:",
                    },
                ]);
                const index = todo_list.indexOf(removeItem.remove);
                if (index !== -1) {
                    todo_list.splice(index, 1);
                    console.log(chalk.green("Item removed successfully"));
                }
                else {
                    console.log(chalk.red("Item not found"));
                }
            }
            startAgain = await repeatFlow();
        }
    } while (startAgain !== false);
}
setTimeout(() => {
    TodoList();
}, 1000);
