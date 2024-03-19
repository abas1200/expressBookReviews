const bookStore = require("../stores/booksdb.js");

// const getBookList = (req, res) => {
//   res.json(bookStore);
// };
const getAllBookList = () => bookStore;

const getBookList = async (req, res) => {
  const result = await getAllBookList();
  res.json(result);
};

// const getBooksByISBN = (req, res) => {
//   const book = bookStore[req.params.isbn] ?? "Book Not Found!";
//   res.json(book);
// };

const getBooksByISBN = async (req, res) => {
  const request = new Promise((resolve, reject) => {
    resolve(bookStore[req.params.isbn] ?? "Book Not Found!");
  });

  request
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.json(err.toString());
    });
};

// const getBooksByAuthor = (req, res) => {
//   const books = Object.values(bookStore).filter(
//     (b) => b.author == req.params.author
//   );
//   res.json(books);
// };

const BooksByAuthor = (author) =>
  Object.values(bookStore).filter((b) => b.author == author);

const getBooksByAuthor = async (req, res) => {
  const books = await BooksByAuthor(req.params.author);
  res.json(books);
};

// const getBooksByTitle = (req, res) => {
//   const books = Object.values(bookStore).filter(
//     (b) => b.title == req.params.title
//   );
//   res.json(books);
// };

const BooksByTitle = (title) =>
  Object.values(bookStore).filter((b) => b.title == title);

const getBooksByTitle = async (req, res) => {
  const books = await BooksByTitle(req.params.title);
  res.json(books);
};

const getReview = (req, res) => {
  const reviews = bookStore[req.params.isbn]?.reviews ?? "Book Not Found!";
  res.json(reviews);
};

const upsertReview = (req, res) => {
  const isbn = req.params.isbn;
  const review = req.query.review;
  const username = req.session.authorization.username;

  const book = bookStore[isbn];

  if (book) {
    book.reviews[username] = { review };
    res.json(
      `The review for the book with ISBN ${isbn} has been added/updated.`
    );
  } else res.json("Book Not Found!");
};

const deleteReview = (req, res) => {
  const isbn = req.params.isbn;
  const username = req.session.authorization.username;
  delete bookStore[req.params.isbn]?.reviews[username];

  res.json(`reviews for the ISBN ${isbn} posted by user ${username} deleted.`);
};

module.exports = {
  getBookList,
  getBooksByISBN,
  getBooksByAuthor,
  getBooksByTitle,
  getReview,
  upsertReview,
  deleteReview,
};
