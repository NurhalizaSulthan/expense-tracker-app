/**
 * ========================================================
 * Expense Tracker App — main.js
 * ========================================================
 */

// TODO [Basic] Variabel array untuk menyimpan semua data transaksi
let transactions = [];

// TODO [Basic] Fungsi menghasilkan ID unik
function generateId() {
  return +new Date();
}

// ========================================================
// STORAGE
// ========================================================

function saveToStorage() {
  localStorage.setItem("tracker_transactions", JSON.stringify(transactions));
}

function loadFromStorage() {
  const data = localStorage.getItem("tracker_transactions");
  transactions = data ? JSON.parse(data) : [];
}

// ========================================================
// Kriteria 1: Manipulasi DOM
// ========================================================

// TODO [Basic] Ambil elemen kontainer dari DOM
const incomeList = document.getElementById("incomeList");
const expenseList = document.getElementById("expenseList");

function formatRupiah(amount) {
  return "Rp" + Number(amount).toLocaleString("id-ID");
}

// TODO [Basic] Fungsi render transaksi ke layar
function renderTransactions(data = transactions) {
  incomeList.innerHTML = "";
  expenseList.innerHTML = "";

  data.forEach((transaction) => {
    const isIncome = transaction.type === "income";

    const card = document.createElement("div");
    card.setAttribute("data-testid", "transactionItem");
    card.classList.add("tracker-transaction-item");

    const icon = document.createElement("div");
    icon.classList.add(
      "tracker-transaction-item__icon",
      isIncome
        ? "tracker-transaction-item__icon--income"
        : "tracker-transaction-item__icon--expense",
    );
    icon.textContent = isIncome ? "↑" : "↓";

    const detail = document.createElement("div");
    detail.classList.add("tracker-transaction-item__detail");

    const title = document.createElement("h3");
    title.setAttribute("data-testid", "transactionItemTitle");
    title.classList.add("tracker-transaction-item__title");
    title.textContent = transaction.title;

    const date = document.createElement("p");
    date.setAttribute("data-testid", "transactionItemDate");
    date.classList.add("tracker-transaction-item__date");
    date.textContent = "Tanggal: " + transaction.date;

    detail.appendChild(title);
    detail.appendChild(date);

    const right = document.createElement("div");
    right.classList.add("tracker-transaction-item__right");

    const amount = document.createElement("p");
    amount.setAttribute("data-testid", "transactionItemAmount");
    amount.classList.add(
      "tracker-transaction-item__amount",
      isIncome
        ? "tracker-transaction-item__amount--income"
        : "tracker-transaction-item__amount--expense",
    );
    amount.textContent = "Nominal: " + formatRupiah(transaction.amount);

    const type = document.createElement("p");
    type.setAttribute("data-testid", "transactionItemType");
    type.style.fontSize = "0.8rem";
    type.style.color = "var(--text-muted)";
    type.textContent = "Tipe: " + (isIncome ? "Pemasukan" : "Pengeluaran");

    const actions = document.createElement("div");
    actions.classList.add("tracker-transaction-item__actions");

    // TODO [Basic] Tombol Ubah Tipe
    const editTypeBtn = document.createElement("button");
    editTypeBtn.setAttribute("data-testid", "transactionItemEditTypeButton");
    editTypeBtn.classList.add("tracker-transaction-item__btn");
    editTypeBtn.textContent = "Ubah Tipe";
    editTypeBtn.addEventListener("click", () =>
      handleChangeType(transaction.id),
    );

    // TODO [Skilled] Tombol Edit
    const editBtn = document.createElement("button");
    editBtn.setAttribute("data-testid", "transactionItemEditButton");
    editBtn.classList.add("tracker-transaction-item__btn");
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", () => handleEdit(transaction.id));

    // TODO [Basic] Tombol Hapus
    const deleteBtn = document.createElement("button");
    deleteBtn.setAttribute("data-testid", "transactionItemDeleteButton");
    deleteBtn.classList.add("tracker-transaction-item__btn");
    deleteBtn.textContent = "Hapus";
    deleteBtn.addEventListener("click", () => handleDelete(transaction.id));

    actions.appendChild(editTypeBtn);
    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    right.appendChild(amount);
    right.appendChild(type);
    right.appendChild(actions);

    card.appendChild(icon);
    card.appendChild(detail);
    card.appendChild(right);

    if (isIncome) {
      incomeList.appendChild(card);
    } else {
      expenseList.appendChild(card);
    }
  });
}

// TODO [Advanced] Update Panel Dasbor
function updateDashboard() {
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpense;

  document.querySelector(".tracker-summary__balance-amount").textContent =
    formatRupiah(balance);
  document.querySelector(".tracker-summary__stat-amount--income").textContent =
    formatRupiah(totalIncome);
  document.querySelector(".tracker-summary__stat-amount--expense").textContent =
    formatRupiah(totalExpense);
}

// ========================================================
// Kriteria 2: Web Storage & Edit/Hapus
// ========================================================

// TODO [Basic] Hapus transaksi
function handleDelete(id) {
  transactions = transactions.filter((t) => t.id !== id);
  saveToStorage();
  document.dispatchEvent(new Event("transaction:updated"));
}

// TODO [Basic] Ubah tipe transaksi
function handleChangeType(id) {
  transactions = transactions.map((t) =>
    t.id === id
      ? { ...t, type: t.type === "income" ? "expense" : "income" }
      : t,
  );
  saveToStorage();
  document.dispatchEvent(new Event("transaction:updated"));
}

// TODO [Skilled] Edit transaksi — isi form dengan data yang dipilih
let editingId = null;

function handleEdit(id) {
  const transaction = transactions.find((t) => t.id === id);
  if (!transaction) return;

  document.getElementById("transactionFormTitleInput").value =
    transaction.title;
  document.getElementById("transactionFormAmountInput").value =
    transaction.amount;
  document.getElementById("transactionFormDateInput").value = transaction.date;
  document.getElementById("transactionFormTypeSelect").value = transaction.type;

  editingId = id;
  document.querySelector(".tracker-form__submit").textContent = "Perbarui";
}

function resetForm() {
  document.getElementById("transactionForm").reset();
  editingId = null;
  document.querySelector(".tracker-form__submit").textContent = "Simpan";
}

// TODO [Basic] Submit form — tambah atau perbarui transaksi
document.getElementById("transactionForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document
    .getElementById("transactionFormTitleInput")
    .value.trim();
  const amount = Number(
    document.getElementById("transactionFormAmountInput").value,
  );
  const date = document.getElementById("transactionFormDateInput").value;
  const type = document.getElementById("transactionFormTypeSelect").value;

  // TODO [Skilled] Validasi input
  if (!title) {
    alert("Keterangan transaksi tidak boleh kosong!");
    return;
  }
  if (amount < 1) {
    alert("Nominal harus minimal Rp 1!");
    return;
  }

  if (editingId !== null) {
    transactions = transactions.map((t) =>
      t.id === editingId ? { id: editingId, title, amount, date, type } : t,
    );
  } else {
    transactions.push({
      id: generateId(),
      title,
      amount,
      date,
      type,
    });
  }

  saveToStorage();
  resetForm();
  document.dispatchEvent(new Event("transaction:updated"));
});

// ========================================================
// Kriteria 3: Pencarian
// ========================================================

// TODO [Skilled] Filter saat mengetik
document
  .getElementById("searchTransactionFormTitleInput")
  .addEventListener("input", (e) => {
    const keyword = e.target.value.trim().toLowerCase();

    // TODO [Advanced] Jika kosong, tampilkan semua
    if (!keyword) {
      renderTransactions(transactions);
      return;
    }

    const filtered = transactions.filter((t) =>
      t.title.toLowerCase().includes(keyword),
    );
    renderTransactions(filtered);
  });

// Submit form pencarian (tombol Cari)
document
  .getElementById("searchTransactionForm")
  .addEventListener("submit", (e) => {
    e.preventDefault();
    const keyword = document
      .getElementById("searchTransactionFormTitleInput")
      .value.trim()
      .toLowerCase();
    const filtered = transactions.filter((t) =>
      t.title.toLowerCase().includes(keyword),
    );
    renderTransactions(filtered);
  });

// ========================================================
// TODO [Advanced] Custom Event — satu listener untuk semua perubahan data
// ========================================================

document.addEventListener("transaction:updated", () => {
  renderTransactions();
  updateDashboard();
});

// ========================================================
// INIT — Muat data dari localStorage saat halaman dibuka
// ========================================================

loadFromStorage();
document.dispatchEvent(new Event("transaction:updated"));
