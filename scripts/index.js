let limit = 10000;
const CURRENCY = "руб.";
const STATUS_IN_LIMIT = "все хорошо";
const STATUS_OUT_OF_LIMIT = "все плохо";
const STATUS_IN_LIMIT_CLASSNAME = "status_green";
const STATUS_OUT_OF_LIMIT_CLASSNAME = "status_red";
const ERROR_CATEGORY = "Выберите категорию";
const ERROR_VALUE = "Введите сумму расхода";

const inputExpenseNode = document.querySelector(".js-input-expense");
const categoryExpenseNode = document.querySelector(".js-category-select");
const addExpenseBtnNode = document.querySelector(".js-add-expense-btn");
const historyTransactionsNode = document.querySelector(".js-history__transactions");
const sumNode = document.querySelector(".js-sum");
const limitNode = document.querySelector(".js-limit");
const statusNode = document.querySelector(".js-status");
const currencyNodes = document.querySelectorAll(".js-currency");

const resetBtnNode = document.querySelector(".js-reset-btn");

const newLimitNode = document.querySelector(".js-new-limit");
const setLimitBtnNode = document.querySelector(".js-set-limit-btn");
const notificationNode = document.querySelector(".js-notification");

const errorNode = document.querySelector(".js-error-notification");

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
    resetExpense();
});

setLimitBtnNode.addEventListener("click", function() {
    handleLimitChange();
});

newLimitNode.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        handleLimitChange();
    }
});

function init(expenses) {
    limitNode.innerText = `${limit.toFixed(2)} ${CURRENCY}`;
    statusNode.innerText = STATUS_IN_LIMIT;
    sumNode.innerText = `${calculateExpenses(expenses)} ${CURRENCY}`;
    currencyNodes.forEach (node => {
        node.innerText = `${CURRENCY}`;
    })
};

function handleAddExpense() {
    if (categoryExpenseNode.value === "Категория") {
        renderError();
        return;
    }

    removeError();
    const expense = getExpenseFromUser();

    if (!expense) {
        renderError();
        return;
    }

    trackExpense(expense);
    render(expenses);
}

function handleLimitChange() {
    setNewLimit();
    renderNotification();
    setTimeout(function(){
        togglePopup();
        renderNotification();
    }, 700);
    render(expenses);
}


function getExpenseFromUser() {
    if (!inputExpenseNode.value) {
        return null;
    }

    const expense = parseFloat(inputExpenseNode.value);
    const category = categoryExpenseNode.value;

    clearInput();

    return {
        expense: expense,
        category: category
    }
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
        sum += element.expense;
    });

    return sum;
};


function render (expenses) {
    const sum = calculateExpenses(expenses);

    renderHistory(expenses);
    renderSum(sum);
    renderStatus(sum);
    renderLimit(limit);
};


function renderHistory(expenses) {
    let expensesListHTML = "";

    expenses.forEach(element => {
        expensesListHTML += `<li>${element.expense.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${CURRENCY} - ${element.category}</li>`;
    });

    historyTransactionsNode.innerHTML = `${expensesListHTML}`;
};


function renderSum(sum) {
    sumNode.innerText = `${sum.toFixed(2)} ${CURRENCY}`;
};


function renderStatus(sum) {
    if (sum <= limit) {
        statusNode.innerText = STATUS_IN_LIMIT;
        statusNode.classList.remove(STATUS_OUT_OF_LIMIT_CLASSNAME);
        statusNode.classList.add(STATUS_IN_LIMIT_CLASSNAME);
    } else {
        statusNode.innerText = `${STATUS_OUT_OF_LIMIT} (${(limit - sum).toFixed(2)} ${CURRENCY})`;
        statusNode.classList.remove(STATUS_IN_LIMIT_CLASSNAME)
        statusNode.classList.add(STATUS_OUT_OF_LIMIT_CLASSNAME);
    };
};

function renderLimit(limit) {
    limitNode.innerText = `${limit.toFixed(2)} ${CURRENCY}`;
}

function resetExpense() {
    expenses.length = 0;
    render(expenses);
};


function setNewLimit() {
    limit = parseFloat(newLimitNode.value) || 0;
}

function renderNotification() {
    notificationNode.classList.toggle("notification_visible");
}

function renderError() {
    if (categoryExpenseNode.value === "Категория") {
        errorNode.innerText = ERROR_CATEGORY;
    } else {
        errorNode.innerText = ERROR_VALUE;
    }
}

function removeError() {
    errorNode.innerText = "";
}