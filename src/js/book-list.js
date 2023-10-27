// Список жанров 
const genres = [
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
    "Travel & Maps"
  ];
  
  const apiUrl = "https://www.googleapis.com/books/v1/volumes?q=";
  let currentCategory = genres[0]; 
  
  // Добавляем кнопку "Load More"
  const loadMoreButton = document.querySelector(".load-more");
  const bookList = document.querySelector(".book-container");
  bookList.appendChild(loadMoreButton);
  
  // Добавляем обработчик событий для кнопки "Load More"
  loadMoreButton.addEventListener("click", () => {
      startIndex += 6;
      loadBooks(currentCategory, startIndex);
  });
  
  // Добавляем кнопку "Load More" в конец контейнера
  const container = document.querySelector(".book-container");
  container.appendChild(loadMoreButton);
  let startIndex = 0;
  
  // Функция для загрузки книг по выбранной категории
  function loadBooks(category, startIndex = 0) {
    const bookList = document.querySelector(".book-list");
    bookList.innerHTML = ""; // Очищаем предыдущий список книг
  
    const query = encodeURIComponent(`subject:${category}`);
    const maxResults = 6;
  
    fetch(`${apiUrl}${query}&startIndex=${startIndex}&maxResults=${maxResults}`)
      .then(response => response.json())
      .then(data => {
        data.items.forEach(book => {
          const bookItem = document.createElement("div");
          bookItem.classList.add("book");
  
          // Обложка слева
          const bookImage = document.createElement("img");
          bookImage.src = book.volumeInfo.imageLinks.thumbnail;
          bookItem.appendChild(bookImage);
  
          // Информация о книге в столбике справа
          const bookInfo = document.createElement("div");
          bookInfo.classList.add("book-info");
  
          const bookAuthor = document.createElement("author");
          bookAuthor.textContent = `${book.volumeInfo.authors.join(", ")}`;
          bookInfo.appendChild(bookAuthor);
  
          const bookTitle = document.createElement("h2");
          bookTitle.textContent = book.volumeInfo.title;
          bookInfo.appendChild(bookTitle);
  
          const bookRating = document.createElement("rating");
          const rating = book.volumeInfo.averageRating;
          const reviewCount = book.volumeInfo.ratingsCount;
          bookRating.innerHTML = `${getStarRating(rating)} ${reviewCount} review`;
          bookInfo.appendChild(bookRating);
  
          const bookDescription = document.createElement("p");
          const maxDescriptionLength = 50;
          bookDescription.textContent =
            book.volumeInfo.description.length > maxDescriptionLength
              ? book.volumeInfo.description.substring(0, maxDescriptionLength) + "..."
              : book.volumeInfo.description;
          bookDescription.classList.add("book-description");
          bookInfo.appendChild(bookDescription);
  
          bookItem.appendChild(bookInfo);
  
          const bookPrice = document.createElement("price");
          bookPrice.textContent = `$${(Math.random() * 30 + 5).toFixed(2)}`;
          bookInfo.appendChild(bookPrice);
  
          const buyNowButton = document.createElement("button");
          buyNowButton.textContent = "Buy Now";
          buyNowButton.classList.add("buy-now");
          bookInfo.appendChild(buyNowButton);
  
          bookItem.appendChild(bookInfo);
  
          bookList.appendChild(bookItem);
        });
      })
      .catch(error => console.error(error));
  }
  
  // Заполняем список жанров и устанавливаем первый жанр как активный
  const genreList = document.querySelector(".genre-list");
  genres.forEach(genre => {
    const genreItem = document.createElement("div");
    genreItem.textContent = genre;
    genreList.appendChild(genreItem);
  });
  
  genreList.children[0].classList.add("active"); // Устанавливаем первый жанр как активный по умолчанию
  
  // Добавляем обработчик событий для жанров
  genreList.addEventListener("click", (event) => {
    if (event.target.tagName === "DIV") {
      const selectedGenre = event.target.textContent;
      genreList.querySelectorAll("div").forEach(item => item.classList.remove("active"));
      event.target.classList.add("active");
      startIndex = 0; // Сброс начального индекса при выборе нового жанра
      loadBooks(selectedGenre);
    }
  });
  
  // Загружаем книги для первой категории по умолчанию
  loadBooks(genres[0]); 
  
  loadMoreButton.addEventListener("click", () => {
    startIndex += 6;
    const activeGenre = document.querySelector(".genre-list .active").innerText;
    loadBooks(activeGenre, startIndex);
  });
  
  function getStarRating(rating) {
    const fullStars = Math.floor(rating);
    const halfStars = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;
  
    const starIcons = "★".repeat(fullStars) + (halfStars ? "" : "") + "☆".repeat(emptyStars);
  
    return starIcons;
  }
  
  
  