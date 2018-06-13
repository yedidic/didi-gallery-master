'use strict';

var BOOKS_LIST = 'books';
var gBooks = loadFromStorage(BOOKS_LIST);
loadTempBooks();

function loadTempBooks() {
    if (!gBooks || gBooks.length === 0) {
        gBooks = [
            { id: 1, title: 'Harry Potter and the Goblet of fire', price: '18.90', rate: 5 },
            { id: 2, title: 'Anne of Green Gables', price: '44.90', rate: 5 },
            { id: 3, title: 'The Bible', price: '48.00' }
        ];
        saveToStorage(BOOKS_LIST, gBooks);
    }
}
function deleteBook(id) {
    var newBooks = gBooks.filter(function (book) {
        return book.id !== id;
    });
    saveToStorage(BOOKS_LIST, newBooks);
    gBooks = loadFromStorage(BOOKS_LIST);
    renderBooks();
}
function addBook(title, price) {
    var id = 4;
    if (gBooks.length !== 0) id = gBooks[gBooks.length - 1].id + 1
    gBooks.push({ id: id, title: title, price: price, rate: 5 });
    saveToStorage(BOOKS_LIST, gBooks);
    renderBooks();
}
function updateBook(bookId, newPrice) {
    gBooks.forEach(function (book) {
        if (book.id === bookId) {
            book.price = newPrice;
        }
    });
    saveToStorage(BOOKS_LIST, gBooks);
    renderBooks();
}
function updateRate() {
    saveToStorage(BOOKS_LIST, gBooks);
}

