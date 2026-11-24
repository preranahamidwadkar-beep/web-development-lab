let expenses = [];

const form = document.getElementById("expenseForm");
const list = document.getElementById("expenseList");
const total = document.getElementById("totalAmount");
const filter = document.getElementById("filterCategory");

function display() {
    list.innerHTML = "";
    let sum = 0;

    expenses.forEach((item, index) => {
        sum += item.amount;

        if (filter.value === "All" || filter.value === item.category) {
            list.innerHTML += `
                <div class="expense-item">
                    <div>
                        <h3>${item.name}</h3>
                        <p>${item.category}</p>
                    </div>
                    <span>₹${item.amount}</span>
                    <button class="delete-btn" onclick="removeExpense(${index})">
                        Delete
                    </button>
                </div>`;
        }
    });

    total.innerText = "₹" + sum;

    if (!list.innerHTML) {
        list.innerHTML = "<p class='empty-message'>No expenses added yet.</p>";
    }
}

form.addEventListener("submit", function(e) {
    e.preventDefault();

    let name = document.getElementById("expenseName").value;
    let amount = Number(document.getElementById("expenseAmount").value);
    let category = document.getElementById("expenseCategory").value;

    if (amount <= 0) return;

    expenses.push({name, amount, category});
    form.reset();
    display();
});

function removeExpense(index) {
    expenses.splice(index, 1);
    display();
}

filter.addEventListener("change", display);

display();