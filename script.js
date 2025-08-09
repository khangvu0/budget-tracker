'use strict';

// Select DOM elements
const form = document.getElementById('transaction-form');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const categoryInput = document.getElementById('category');
const totalBudgetEl = document.getElementById('total-budget');
const totalIncomeEl = document.getElementById('total-income');
const totalExpensesEl = document.getElementById('total-expenses');
const list = document.getElementById('transactions');


// Creating the Transaction class - blueprint for all transactions (income and expenses)
class Transaction {
    constructor(description, amount, category) {
        this.description = description;
        this.amount = amount;
        this.category = category;
    }

    // Method to format transaction amount
    getFormattedAmount() {
        return `$${Math.abs(this.amount).toFixed(2)}`;
    }

    // Method to check if amount is income or expense
    isIncome() {
        return this.amount > 0;
    }
}

// Creating classes Income and Expense for the future.
// Enabling this application to be scalable
class Income extends Transaction {
    constructor(description, amount) {
        super(description, amount, 'income');   // Passing 'income' as the third argument/category
    }
}

class Expense extends Transaction {
    constructor(description, amount, category) {
        super(description, amount, category);
    }
}

// Creating the Budget class - stores, calculates and updates the page
class Budget {
    // An array to contain all transactions (income and expenses)
    #transactions = []; // private - only code within Budget class can access

    // Adds transaction and updates the page
    addTransaction(transaction) {
        this.#transactions.push(transaction);
        this.updatePage();
    }

    // Calculates the total income
    getTotalIncome() {
        let total = 0;
        for (let i = 0; i < this.#transactions.length; i++) {
            const tx = this.#transactions[i];
            if (tx.isIncome()) {
                total += tx.amount;
            }
        }
        return total;
    }

    // Calculates the total expense
    getTotalExpenses() {
        let total = 0;
        for (let i = 0; i < this.#transactions.length; i++) {
            const tx = this.#transactions[i];
            if (!tx.isIncome()) {
                total += Math.abs(tx.amount);
            }
        }
        return total;
    }

    // Calculates the total budget
    getBudget() {
        return this.getTotalIncome() - this.getTotalExpenses();
    }

    // Updates the UI
    updatePage() {
        // Update Summary
        totalBudgetEl.textContent = `$${this.getBudget().toFixed(2)}`;
        totalIncomeEl.textContent = `$${this.getTotalIncome().toFixed(2)}`;
        totalExpensesEl.textContent = `$${this.getTotalExpenses().toFixed(2)}`;

        // Clears transaction list before repopulating
        list.innerHTML = '';

        // Parses through transaction list and creates a list item with delete button for each transaction
        this.#transactions.forEach((tx, index) => {
            const li = document.createElement('li');
            li.textContent = `${tx.description} - ${tx.getFormattedAmount()} (${tx.category})`;
            li.style.color = tx.isIncome() ? 'green' : 'red';

            // Add delete button
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = '✕';
            deleteBtn.style.marginLeft = '1rem';
            deleteBtn.style.cursor = 'pointer';
            deleteBtn.style.border = 'none';
            deleteBtn.style.background = 'none';
            deleteBtn.style.color = '#888';
            deleteBtn.addEventListener('click', () => {
                budgetApp.deleteTransaction(index);
            });

            li.appendChild(deleteBtn);
            list.appendChild(li);
        });
    }

    // Deletes specific transaction
    deleteTransaction(index) {
        this.#transactions.splice(index, 1);
        this.updatePage();
    }
}

// Creating an instance of the Budget class
const budgetApp = new Budget();

// DOM event handling
form.addEventListener('submit', function (e) {
    e.preventDefault();

    const description = descriptionInput.value.trim();
    const amount = parseFloat(amountInput.value);
    const category = categoryInput.value;

    if (!description || isNaN(amount) || !category) {
        alert('Please fill in all fields.');
        return;
    }

    let transaction;
    if (amount > 0 || category === 'income') {
        transaction = new Income(description, amount);
    } else {
        transaction = new Expense(description, amount, category);
    }

    budgetApp.addTransaction(transaction);

    // Clear input fields
    form.reset();
});
