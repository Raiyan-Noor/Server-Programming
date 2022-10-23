const { db } = require("./../models/books");
const books = require("./../models/books");
const bookModel = require("./../models/books");

const getBookList = async (req, res) => {
  let data = [];
  let books = [];
  try {
    data = await bookModel.find();
    console.log(data);
    data.forEach((book) => {
      books.push({ id: book._id, name: book.name, author: book.author, genre: book.genre });
    });
  } catch (error) {
    console.log(error);
  } finally {
    res.render("bookList", { books: books });
  }
};

const getBook = (req, res) => {
  res.render("addBooks");
};

const postBook = (req, res) => {
  const data = new bookModel({
    name: req.body.name,
    author: req.body.author,
    genre: req.body.genre,
  });
  data
    .save()
    .then(() => {
      console.log("Data Saved Successfully!");
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      res.redirect("/books");
    });
};

const deleteBook = async (req, res) => {
  const book_id = req.params.id;
  const book = await bookModel.findByIdAndDelete(book_id)
  if(book_id != null){
    book.delete()
  }
  res.redirect("/book-list")
  
}

const updateBook = async (req, res) => {
  const book_id = req.params.id;
  res.render("updateBook", {id: book_id, name: req.params.name, author: req.body.author, genre: req.body.genre })
}

const updateBookData = async (req, res) => {
  console.log(req.params.id)
  await bookModel.findByIdAndUpdate(req.params.id,{
    name: req.body.name,
    author: req.body.author,
    genre: req.body.genre,
  },
  {new: true})
  res.redirect("/book-list")
}

module.exports = {updateBook, updateBookData, getBookList, getBook, postBook, deleteBook };

