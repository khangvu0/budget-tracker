# Budget Tracker

A responsive and interactive budget management web application built for my Week 4 JavaScript & SASS assignment. This project focuses on implementing object-oriented programming principles, dynamic DOM manipulation, and efficient, maintainable styling with SASS.

## Live Demo

You can view a live demo of the website [here](https://budget-tracker-green-six.vercel.app/).

## Technologies Used

- HTML5 – Semantic structure for content and forms
- SASS (SCSS) – Modular, maintainable styles with variables, mixins, and reusable components
- JavaScript (ES6) – Object-oriented logic, DOM manipulation, and event handling

## Features

- Add Income & Expenses – Input descriptions and amounts, then categorize as income or expense.
- Transaction Deletion - Allows user to delete any transaction.
- Dynamic Budget Calculation – Automatically updates total budget, total income, and total expenses when new entries are added.
- Input Validation – Prevents empty fields or invalid amounts.
- OOP Structure – Encapsulates logic inside a Budget class, following principles like encapsulation, inheritance, and polymorphism.
- Responsive UI – Optimized layout for mobile, tablet, and desktop.
- Custom Styling with SASS:
    - Global variables for primary color and other design elements
    - Gradient backgrounds via a custom @mixin gradient()
    - Optional animation mixin for smooth UI interactions
    - Centralized design system for colors, typography, and spacing, making the codebase easy to scale

## How It Works
1. Enter a description and amount in the input fields.
2. Select a category (income or expense).
3. Click the Add button to update your budget.
4. The application dynamically calculates:
    - Total income
    - Total expenses
    - Remaining budget
5. Transactions are displayed in a list with an option to remove them.

## Lessons Learned

During this project, I gained hands-on experience with:
- Private Class Properties – Restricting access to transaction data where it makes sense.
- Method Naming Conventions – Using descriptive verbs like get, set, create, update, and is for clarity.
- Capitalized Class Names – Following standard JavaScript class naming conventions.
- HTML Select Disabled Attribute – Using it effectively to guide user interaction.
- .trim() Method – Cleaning user input to avoid whitespace issues.
- Scalability Mindset – Writing future-proof code that’s easy to expand and maintain.
- Using SASS Features – Variables, mixins, partials, and imports to organize styles efficiently.
- Creating a Design System – Structuring helper files for colors, typography, spacing, and reusable styles.
- Maintainability – Centralizing design tokens for easy theme changes.
- Mixins for Reusability – Including a gradient mixin and optional animation mixin to quickly style elements across the app.


## Screenshot

![Screenshot 1](/images/preview.png)