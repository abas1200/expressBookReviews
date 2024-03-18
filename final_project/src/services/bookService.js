const bookStore = require("../stores/booksdb.js");

const getBookList = (req, res) => {
  res.json(bookStore);
};

const getBooksByISBN = (req, res) => {
  const book = bookStore[req.params.isbn] ?? {};
  res.json(book);
};

const getBooksByAuthor = (req, res) => {
  const books = Object.values(bookStore).filter(b=>b.author == req.params.author);
  res.json(books);
};

module.exports = {
  getBookList,
  getBooksByISBN,
  getBooksByAuthor,
};
