const LIMIT = 10000;
const CURRENCY = "руб.";
const STATUS_IN_LIMIT = "все хорошо";
const STATUS_OUT_OF_LIMIT = "все плохо";
const STATUS_IN_LIMIT_CLASSNAME = "status_green";
const STATUS_OUT_OF_LIMIT_CLASSNAME = "status_red";

const inputExpenseNode = document.querySelector(".js-input-expense");
const addExpenseBtnNode = document.querySelector(".js-add-expense-btn");
const historyTransactionsNode = document.querySelector(".js-history__transactions");
const sumNode = document.querySelector(".js-sum");
const limitNode = document.querySelector(".js-limit");
const statusNode = document.querySelector(".js-status");

const expenses = [];

init(expenses);

addExpenseBtnNode.addEventListener("click", function() {
    const expense = getExpenseFromUser();

    if (!expense) {
        return;
    }

    trackExpense(expense);

    render (expenses);
});


function init(expenses) {
    limitNode.innerText = `${LIMIT} ${CURRENCY}`;
    statusNode.innerText = STATUS_IN_LIMIT;
    sumNode.innerText = `${calculateExpenses(expenses)} ${CURRENCY}`;
};


function getExpenseFromUser() {
    if (!inputExpenseNode.value) {
        return null;
    }

    const expense = parseInt(inputExpenseNode.value); //only whole values. Decimals are rounded

    clearInput();

    return expense;

};


function clearInput() {
    inputExpenseNode.value = "";
};


function trackExpense(expense) {
    expenses.push(expense);
};


function calculateExpenses(expenses) {
    let sum = 0;

    expenses.forEach(element => {
        sum += element;
    });

    return sum;
};


function render (expenses) {
    const sum = calculateExpenses(expenses);

    renderHistory(expenses);
    renderSum(sum);
    renderStatus(sum);

};


function renderHistory(expenses) {
    let expensesListHTML = "";

    expenses.forEach(element => {
        expensesListHTML += `<li>${element} ${CURRENCY}</li>`;
    });

    historyTransactionsNode.innerHTML = `${expensesListHTML}`;
};


function renderSum(sum) {
    sumNode.innerText = `${sum} ${CURRENCY}`;
};


function renderStatus(sum) {
    if (sum <= LIMIT) {
        statusNode.innerText = STATUS_IN_LIMIT;
        statusNode.classList.remove(STATUS_OUT_OF_LIMIT_CLASSNAME);
        statusNode.classList.add(STATUS_IN_LIMIT_CLASSNAME);
    } else {
        statusNode.innerText = STATUS_OUT_OF_LIMIT;
        statusNode.classList.remove(STATUS_IN_LIMIT_CLASSNAME)
        statusNode.classList.add(STATUS_OUT_OF_LIMIT_CLASSNAME);
    };
};