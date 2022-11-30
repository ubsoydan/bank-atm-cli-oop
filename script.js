// ask for accout -done
// whether account exist. if not create
// ask what they wanna do
// execute
//  a. view
//  b. withdraw
//  c. deposit

// ACCOUNT OBJECT
const Account = require("./Account");
const CommandLine = require("./CommLineSet");

async function main() {
    try {
        const accountName = await CommandLine.ask(
            "Please state the account you would like to access: "
        );

        const account = await Account.find(accountName);
        if (account == null) account = await createNewAccount(accountName);

        if (account != null) await promptTask(account);
    } catch (e) {
        CommandLine.print("Unexpected error! Try again.");
    }
}

async function createNewAccount(accountName) {
    const response = await CommandLine.ask(
        `No such account exists! Would you like to create one? (yes/no)`
    );

    response === "yes" ? await Account.create(accountName) : undefined;
}

async function promptTask(account) {
    const response = await CommandLine.ask(
        `How would you like to proceed? (view/deposit/withdraw)`
    );

    if (response === "deposit") {
        const amount = parseFloat(
            await CommandLine.ask("Please enter an amount: ")
        );
        await account.deposit(amount);
    } else if (response === "withdraw") {
        const amount = parseFloat(
            await CommandLine.ask("Please enter an amount: ")
        );
        try {
            await account.withdraw(amount);
        } catch (e) {
            CommandLine.print(
                `Unable to withdraw due to insufficient funds in the account! Current balance is ${account.balance}`
            );
        }
    }
    CommandLine.print(`Account balance is ${account.balance}`);
}

main();
