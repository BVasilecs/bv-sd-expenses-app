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
const resetBtnNode = document.querySelector(".js-reset-btn");

const expenses = [];

init(expenses);

addExpenseBtnNode.addEventListener("click", function() {
    handleAddExpense();
});

inputExpenseNode.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        handleAddExpense();
    }
});

resetBtnNode.addEventListener("click", function() {
    console.log("test");
    resetExpense();
});

function init(expenses) {
    limitNode.innerText = `${LIMIT.toFixed(2)} ${CURRENCY}`;
    statusNode.innerText = STATUS_IN_LIMIT;
    sumNode.innerText = `${calculateExpenses(expenses)} ${CURRENCY}`;
};

function handleAddExpense() {
    const expense = getExpenseFromUser();

    if (!expense) {
        return;
    }

    trackExpense(expense);
    render(expenses);
}


function getExpenseFromUser() {
    if (!inputExpenseNode.value) {
        return null;
    }

    const expense = parseFloat(inputExpenseNode.value); //only whole values. Decimals are rounded down

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
        expensesListHTML += `<li>${element.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${CURRENCY}</li>`;
    });

    historyTransactionsNode.innerHTML = `${expensesListHTML}`;
};


function renderSum(sum) {
    sumNode.innerText = `${sum.toFixed(2)} ${CURRENCY}`;
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

function resetExpense() {
    expenses.length = 0;
    render(expenses);
};