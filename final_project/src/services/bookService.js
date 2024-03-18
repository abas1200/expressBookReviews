const bookStore = require("../stores/booksdb.js");

const getBookList = ((req, res) => {
    res.json(bookStore);
})

 
module.exports = {
    getBookList,
}
