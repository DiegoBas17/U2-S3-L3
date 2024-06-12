const fetchBooks = () => {
  fetch("https://striveschool-api.herokuapp.com/books")
    .then((responseObj) => {
      console.log("Response oggetto", responseObj);
      if (responseObj.ok) {
        return responseObj.json();
      } else {
        throw new Error("Errore nel reperimento dei dati");
      }
    })
    .then((libreriaObj) => {
      console.log("Libreria", libreriaObj);
      libreriaObj.forEach((book) => {
        createBookCard(book);
      });
    })
    .catch((err) => console.log(err));
};
let carrello = [];
const contenitoreCards = document.getElementById("contenitoreCards");
const cartList = document.getElementById("cartList");

const createBookCard = function (book) {
  const col = document.createElement("div");
  col.classList.add("col-3");

  const card = document.createElement("div");
  card.classList.add("card", "h-100");

  const img = document.createElement("img");
  img.classList.add("card-img-top");
  img.src = book.img;
  img.alt = book.title;
  img.style.height = "400px";

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body", "d-flex", "flex-column");

  const cardTitle = document.createElement("h5");
  cardTitle.classList.add("card-title");
  cardTitle.textContent = book.title;

  const contenitoreBasso = document.createElement("div");
  contenitoreBasso.classList.add(
    "contenitoreBasso",
    "mt-auto",
    "d-flex",
    "flex-colum"
  );

  const cardText = document.createElement("p");
  cardText.classList.add("card-text");
  cardText.textContent = "Price: €" + book.price;

  const buyButton = document.createElement("button");
  buyButton.classList.add("btn", "btn-success", "mt-2", "me-2");
  buyButton.textContent = "Compra ora";
  buyButton.addEventListener("click", function () {
    buyBook(book);
  });

  const dangerButton = document.createElement("button");
  dangerButton.classList.add("btn", "btn-danger", "mt-2", "mx-2");
  dangerButton.textContent = "Scarta";
  dangerButton.addEventListener("click", function () {
    col.classList.add("d-none");
  });

  cardBody.appendChild(cardTitle);
  cardBody.appendChild(cardText);
  contenitoreBasso.appendChild(buyButton);
  contenitoreBasso.appendChild(dangerButton);
  cardBody.appendChild(contenitoreBasso);

  card.appendChild(img);
  card.appendChild(cardBody);

  col.appendChild(card);

  contenitoreCards.appendChild(col);
};

const buyBook = function (book) {
  const listItem = document.createElement("li");
  listItem.classList.add("list-group-item", "mb-1");
  listItem.textContent = book.title + " - €" + book.price;
  cartList.appendChild(listItem);
  carrello.push(book);
  localStorage.setItem("carrello", JSON.stringify(carrello));
};

window.addEventListener("DOMContentLoaded", fetchBooks);
