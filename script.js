let myLibrary = [];
const container = document.querySelector(".container");
const modal = document.querySelector(".modal");
const modalBtn = document.querySelector(".modal-btn");
const form = document.querySelector("#form");

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
  info() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${
      this.read ? "read" : "not read yet"
    }`;
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  getBooksFromForm();
  resetForm();
});

function resetForm() {
  form.reset();
}

container.addEventListener("click", (e) => {
  let i = e.target.parentElement.dataset.index;
  isDelete(e, i);
  isSwitchRead(e, i);
  displayBooks();
});

function isDelete(e, i) {
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.remove();
    myLibrary.splice(i, 1);
  }
}

function isSwitchRead(e, i) {
  if (e.target.classList.contains("switch-read")) {
    myLibrary[i].read == "read"
      ? (myLibrary[i].read = "not read yet")
      : (myLibrary[i].read = "read");
  }
}


addBookToLibrary(
  new Book("In Search of Lost Time", "Marcel Proust", 543, "read")
);
addBookToLibrary(new Book("Ulysses", "James Joyce", 1354, "not read"));
addBookToLibrary(new Book("Hamlet", "Shakespeare", 215, "not read"));

displayBooks();

function displayBooks() {
  container.innerHTML = "";
  for (let i = 0; i < myLibrary.length; i++) {
    let p = document.createElement("p");
    p.dataset.index = `${i}`;
    p.innerHTML = `${myLibrary[i].title} <br> by ${myLibrary[i].author} <br> ${
      myLibrary[i].pages
    } pages <br> <button class="switch-read">${
      myLibrary[i].read == "read" ? "read" : "not read yet"
    }</button> <button class="delete">delete</button>`;
    container.append(p);
  }
}

function getBooksFromForm() {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const read = document.getElementById("read").checked;

  addBookToLibrary(new Book(title, author, pages, read));
  displayBooks();
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

modalBtn.addEventListener("click", () => {
  modal.style.display = "block";
});

window.addEventListener("click", (e) => {
  if (e.target == modal) {
    modal.style.display = "none";
  }
});
