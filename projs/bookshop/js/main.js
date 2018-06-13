'use-strict';

// { id: 3, title: 'The Bible', price: '48.00' }
function renderBooks() {
    var strHtmls = [];
    strHtmls = gBooks.map(function (book) {
        return `<tr>
        <td>${book.id}</td>
        <td>${book.title}</td>
        <td>${book.price}</td>
        <td>
        <button class="read-btn btn btn-primary my-2 " onclick="onReadBook(${book.id})">Read</button>
        <button class="update-btn btn btn-warning m-2" onclick="onUpdateBook(${book.id})">Update</button>
        <button class="del-btn btn btn-danger" onclick="onDelBook(${book.id})">Delete</button>
        </td>
        </tr>`;
    });
    var strHtml = strHtmls.join('');
    $('.books-table').html(strHtml);
    // console.log('blabla');
}
function onReadBook(bookId) {
    openModal();
    var currBook = gBooks.filter(function (book) {
        return book.id === bookId;
    })[0];
    $('.book-img').attr('src', `img/${bookId}.jpg`);
    $('.read-title span').text(currBook.title);
    $('.read-price span').text(currBook.price);
    $('.rate-container span').text(currBook.rate);
    onThumb(currBook);
}
function onDelBook(bookId) {
    console.log(bookId);
    deleteBook(bookId);
    renderBooks();
}
function readAndAddNewBook() {
    var title = prompt('Please enter the new book\'s title: ');
    var price = prompt('Please enter the new book\'s price in 00.00: ');
    addBook(title, price);
}
function onUpdateBook(bookId) {
    var newPrice = +prompt('Please enter the new book\'s price in 00.00: ');
    if (newPrice) updateBook(bookId, newPrice);
}
function openModal() {
    $('#read-modal').modal('toggle');
}
function onThumb(currBook) {
    $('.thumb-up').click(function () {
        if (currBook.rate < 10) $('.rate-container span').text(++currBook.rate)
        updateRate();
    });
    $('.thumb-down').click(function () {
        if (currBook.rate > 1) $('.rate-container span').text(--currBook.rate)
        updateRate()
    });
}
