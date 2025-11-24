import { Status, Format } from "./enums.js";
import { Book } from "./book.js";

const form = document.getElementById("bookForm");
const list = document.getElementById("booksList");
const stats = document.getElementById("stats");

// SUBMIT
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const newBook = {
    title: title.value,
    author: author.value,
    pages: Number(pages.value),
    pagesRead: Number(pagesRead.value),
    price: Number(price.value),
    status: status.value,
    format: format.value,
    suggestedBy: suggestedBy.value,
  };

  await fetch("http://localhost:3000/books", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newBook),
  });

  form.reset();
  loadBooks();
});

// LOAD BOOKS
async function loadBooks() {
  const res = await fetch("http://localhost:3000/books");
  const books = await res.json();

  // LIST
  list.innerHTML = books
    .map(
      (b) => `
    <div class="bg-white p-4 rounded shadow">
      <h2 class="font-bold text-lg">${b.title}</h2>
      <p>Author: ${b.author}</p>
      <p>Status: ${b.status}</p>
      <p>Format: ${b.format}</p>
      <p>Progress: ${Math.floor(
        (b.pagesRead / b.pages) * 100
      )}%</p>

      <button onclick="deleteBook('${b._id}')"
        class="bg-red-600 text-white px-3 py-1 rounded mt-2">
        Delete
      </button>
    </div>
  `
    )
    .join("");

  // STATS
  const totalRead = books.filter((b) => b.finished).length;
  const totalPages = books.reduce((acc, b) => acc + b.pagesRead, 0);

  stats.innerHTML = `
    <p class="text-lg">📘 Books finished: <strong>${totalRead}</strong></p>
    <p class="text-lg">📄 Total pages read: <strong>${totalPages}</strong></p>
  `;
}

loadBooks();

// DELETE
window.deleteBook = async (id) => {
  await fetch(`http://localhost:3000/books/${id}`, {
    method: "DELETE",
  });

  loadBooks();
};
