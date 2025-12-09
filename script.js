const quoteEl = document.getElementById("quote");
const authorEl = document.getElementById("author");
const shuffleBtn = document.getElementById("shuffle");
const toggle = document.getElementById("themeToggle");
const body = document.body;
const historyList = document.getElementById("historyList");
const card = document.getElementById("card");

let history = JSON.parse(localStorage.getItem("quotes")) || [];

/* ===== Загрузка цитаты ===== */
async function getQuote() {
    quoteEl.textContent = "Loading...";
    authorEl.textContent = "";

    const res = await fetch("https://dummyjson.com/quotes/random");
    const data = await res.json();

    card.classList.remove("fade");
    void card.offsetWidth;
    card.classList.add("fade");

    quoteEl.textContent = data.quote;
    authorEl.textContent = "— " + data.author;

    saveHistory(data.content, data.author);
}

/* ===== Тема ===== */
if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark");
    toggle.checked = true;
}

toggle.addEventListener("change", () => {
    body.classList.toggle("dark");
    localStorage.setItem("theme", body.classList.contains("dark") ? "dark" : "light");
});

/* ===== Кнопка ===== */
shuffleBtn.addEventListener("click", getQuote);

/* ===== Запуск ===== */
renderHistory();
getQuote();
