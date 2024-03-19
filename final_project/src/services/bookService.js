const bookStore = require("../stores/booksdb.js");

const getBookList = (req, res) => {
  res.json(bookStore);
};

const getBooksByISBN = (req, res) => {
  const book = bookStore[req.params.isbn] ?? "Book Not Found!";
  res.json(book);
};

const getBooksByAuthor = (req, res) => {
  const books = Object.values(bookStore).filter(
    (b) => b.author == req.params.author
  );
  res.json(books);
};

const getBooksByTitle = (req, res) => {
  const books = Object.values(bookStore).filter(
    (b) => b.title == req.params.title
  );
  res.json(books);
};

const getReview = (req, res) => {
  const reviews = bookStore[req.params.isbn]?.reviews ?? "Book Not Found!";
  res.json(reviews);
};

const upsertReview = (req, res, username) => {
  const isbn = req.params.isbn;
  const review = req.query.review;
  const book = bookStore[isbn];

  if (book) {
    book.reviews[username] = { review };
    res.json(
      `The review for the book with ISBN ${isbn} has been added/updated.`
    );
  } else res.json("Book Not Found!");
};

module.exports = {
  getBookList,
  getBooksByISBN,
  getBooksByAuthor,
  getBooksByTitle,
  getReview,
  upsertReview,
};
