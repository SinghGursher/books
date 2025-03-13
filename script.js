// Load books from localStorage or use default books
let books = JSON.parse(localStorage.getItem("books")) || [ 
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", year: 1925, isAvailable: true }, 
    { id: 2, title: "1984", author: "George Orwell", year: 1949, isAvailable: true }, 
    { id: 3, title: "To Kill a Mockingbird", author: "Harper Lee", year: 1960, isAvailable: true }
];
// Function to save books to localStorage
function saveBooks() {
    localStorage.setItem("books", JSON.stringify(books));
}
// Function to render books on the page 
function displayBooks() {
    const libraryDiv = document.getElementById("library"); 
    libraryDiv.innerHTML = ""; // Clear existing content 

    books.forEach(book => { 
        let bookDiv = document.createElement("div"); 
        bookDiv.classList.add("book"); 
        bookDiv.innerHTML = `
            <h2>${book.title}</h2> 
            <p><strong>Author:</strong> ${book.author}</p> 
            <p><strong>Year:</strong> ${book.year}</p> 
            <p><strong>Status:</strong> ${book.isAvailable ? "Available" : "Borrowed"}</p> 
            <button class="borrow" ${!book.isAvailable ? "disabled" : ""} 
            onclick="borrowBook(${book.id})">Borrow</button>
            <button class="return" ${book.isAvailable ? "disabled" : ""} 
            onclick="returnBook(${book.id})">Return</button>
        `;
        libraryDiv.appendChild(bookDiv); 
    });
}
// Function to borrow a book 
function borrowBook(bookId) { 
    let book = books.find(b => b.id === bookId);
    if (book && book.isAvailable) { 
        book.isAvailable = false; 
        alert(`You have borrowed "${book.title}".`); 
        saveBooks(); // Save changes
        displayBooks(); 
    }
}
// Function to return a book 
function returnBook(bookId) { 
    let book = books.find(b => b.id === bookId); 
    if (book && !book.isAvailable) {
        book.isAvailable = true; 
        alert(`You have returned "${book.title}".`); 
        saveBooks(); // Save changes
        displayBooks(); 
    }
}
// Function to add a new book
function addBook() {
    const title = document.getElementById("title").value.trim();
    const author = document.getElementById("author").value.trim();
    const year = parseInt(document.getElementById("year").value.trim());

    if (title && author && year) {
        const newBook = {
            id: books.length + 1, // Assign a unique ID
            title: title,
            author: author,
            year: year,
            isAvailable: true
        };

        books.push(newBook); // Add new book to the array
        saveBooks(); // Save updated book list
        displayBooks(); // Refresh the book display

        // Clear input fields
        document.getElementById("title").value = '';
        document.getElementById("author").value = '';
        document.getElementById("year").value = '';
    } else {
        alert("Please fill in all fields correctly.");
    }
}
// Initial display of books 
displayBooks();
