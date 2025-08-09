'use strict';

// Select DOM elements
const form = document.getElementById('transaction-form');
const totalBudgetEl = document.getElementById('total-budget');
const totalIncomeEl = document.getElementById('total-income');
const totalExpensesEl = document.getElementById('total-expenses');


// Creating the Transaction class - blueprint for all transactions (income and expenses)
class Transaction {
    constructor(description, amount, category) {
        this.description = description;
        this.amount = amount;
        this.category = category;
    }

    getFormattedAmount() {
        return `$${Math.abs(this.amount).toFixed(2)}`;
    }

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

    addTransaction(transaction) {
        this.#transactions.push(transaction);
        this.updatePage();
    }

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

    getBudget() {
        return this.getTotalIncome() - this.getTotalExpenses();
    }

    updatePage() {
        // Update Summary
        totalBudgetEl.textContent = `$${this.getBudget().toFixed(2)}`;
        totalIncomeEl.textContent = `$${this.getTotalIncome().toFixed(2)}`;
        totalExpensesEl.textContent = `$${this.getTotalExpenses().toFixed(2)}`;

        // Update Transactions List
        const list = document.getElementById('transactions');
        list.innerHTML = ''; // clear before repopulating

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

    deleteTransaction(index) {
        this.#transactions.splice(index, 1);
        this.updatePage();
    }
}

const budgetApp = new Budget();

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const description = document.getElementById('description').value.trim();
    const amount = parseFloat(document.getElementById('amount').value);
    const category = document.getElementById('category').value;

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
    document.getElementById('transaction-form').reset();
});
