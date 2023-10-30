document.addEventListener("DOMContentLoaded", () => {
    const categoryList = document.querySelector(".category-list");
    const bookList = document.querySelector(".book-list");
    const loadMoreButton = document.querySelector(".load-more");

    const categories = [
        "Architecture",
        "Art & Fashion",
        "Biography",
        "Business",
        "Crafts & Hobbies",
        "Drama",
        "Fiction",
        "Food & Drink",
        "Health & Wellbeing",
        "History & Politics",
        "Humor",
        "Poetry",
        "Psychology",
        "Science",
        "Technology",
        "Travel & Maps",
    ];

    categories.forEach((category) => {
        const li = document.createElement("li");
        li.textContent = category;
        categoryList.appendChild(li);
    });

    categoryList.addEventListener("click", (e) => {
        if (e.target.tagName === "LI") {
            const activeCategory = categoryList.querySelector(".active");
            if (activeCategory) {
                activeCategory.classList.remove("active");
            }
            e.target.classList.add("active");
            loadBooks(e.target.textContent);
        }
    });

    loadBooks(categories[0]);

    let startIndex = 0;
    loadMoreButton.addEventListener("click", () => {
        startIndex += 6;
        const activeCategory = categoryList.querySelector(".active");
        if (activeCategory) {
            loadBooks(activeCategory.textContent, startIndex);
        }
    });

    function loadBooks(category, startIndex = 0) {
        const apiKey = "AIzaSyCH4sChyw7m5slJRApx0EyonVpOpBs8Qfk";
        const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=subject:${category}&key=${apiKey}&printType=books&startIndex=${startIndex}&maxResults=6&langRestrict=en`;

        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                if (startIndex === 0) {
                    bookList.innerHTML = "";
                }
                data.items.forEach((item) => {
                    const book = item.volumeInfo;
                    const authors = book.authors ? book.authors.join(", ") : "Unknown";
                    const thumbnail = book.imageLinks ? book.imageLinks.thumbnail : "placeholder.png";
                    let ratingHtml = "";
                        if (book.averageRating) {
                            const rating = Math.round(book.averageRating);
                            ratingHtml = "★".repeat(rating) + "☆".repeat(5 - rating);
                        } else {
                            // eslint-disable-next-line no-unused-vars
                            ratingHtml = "No ratings available";
                        }const rating = book.averageRating ? `${book.averageRating} (${book.ratingsCount} ratings)` : "";
                    const description = book.description ? book.description.substring(0, 150) + "..." : "No description available";
                    const price = book.saleInfo && book.saleInfo.listPrice ? `${book.saleInfo.listPrice.amount} ${book.saleInfo.listPrice.currencyCode}` : "";                             
                    const bookCard = document.createElement("div");
                    bookCard.classList.add("book-card");
                    bookCard.innerHTML = `
                        <img src="${thumbnail}" alt="${book.title}">
                        <div class="text-info">
                        <p class="authors">${authors}</p>
                        <h3>${book.title}</h3>
                        <p class="rating">${rating}</p>
                        <p class="description">${description}</p>
                        <p class="price">${price}</p>
                        <button class="buy-button">Buy now</button>
                        </div>
                    `;
                    bookList.appendChild(bookCard);

                    const buyButton = bookCard.querySelector(".buy-button");
                    buyButton.addEventListener("click", () => {
                        toggleBookInCart(book, bookCard);
                    });
                });

                if (data.totalItems <= startIndex + 6) {
                    loadMoreButton.style.display = "none";
                } else {
                    loadMoreButton.style.display = "block";
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    function toggleBookInCart(book, bookCard) {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];

        const bookIndex = cart.findIndex((item) => item.id === book.id);
        if (bookIndex === -1) {
            cart.push({ id: book.id, title: book.title });
            bookCard.querySelector(".buy-button").classList.add("in-cart");
        } else {
            cart.splice(bookIndex, 1);
            bookCard.querySelector(".buy-button").classList.remove("in-cart");
        }

        localStorage.setItem("cart", JSON.stringify(cart));
    }
});

// Найдем элементы, которые нам понадобятся
const buyNowButton = document.querySelector('.buy-now-button');
const cartCount = document.getElementById('cart-count');

// Инициализируем счетчик
let itemCount = 0;

// Добавляем обработчик события на кнопку "buy-now"
buyNowButton.addEventListener('click', () => {
  // Увеличиваем счетчик
  itemCount++;

  // Обновляем значение в элементе "cart-count"
  cartCount.textContent = itemCount;
});

