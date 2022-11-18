const books = require("./../models/books");
const bookModel = require("./../models/books");
const userModel = require("./../models/users");


const getBookList = async (req, res) => {
  let data = [];
  let books = [];
  let bookNames = [];
  
  try {
    data = await bookModel.find();

    console.log(data);
    data.forEach((book) => {
      books.push({ name: book.name, author: book.author, genre: book.genre });
      bookNames.push({name: book.author});
    });

    
  } catch (error) {
    console.log(error);
  } finally {
    res.render("squeak", { books: books, bookNames: bookNames }); 
  }
};

const sendToEveryone = (name, message) => {
    let users = [];
    
    try {
      data = userModel.find();
  
      console.log(data);
      data.forEach((user) => {
        users.push({ name: user.name });
      });
  
      
    } catch (error) {
      console.log(error);
    }

    users.forEach((user) => {
        const data = new bookModel({
            name: name,
            author: user.author,
            genre: message,
          });
          data
            .save();
    res.redirect("/chat");
    });
    
    

}

const postBook = (req, res) => {
    // if(req.body.author == "Everyone"){
    //     sendToEveryone(req.body.name, req.body.genre);
    // }
    // else{
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
        res.redirect("/chat");
      });
    // }
  };


  const getUserList = async (req, res) => {
    let data = [];
    let users = [];
    
    try {
      data = await userModel.find();
  
      console.log(data);
      data.forEach((user) => {
        users.push({ name: user.name });
      });
  
      
    } catch (error) {
      console.log(error);
    } finally {
      res.render("chat", { users: users }); 
    }
  };

  
const postUsername = async (req, res) => {
    let name = req.body.name;
    console.log(name);
    let data = [];
    let books = [];
    let bookNames = [];
    let userdata = [];
    
    try {
      data = await bookModel.find({author: name});
      userdata = await userModel.find();
  
      console.log(data);
      data.forEach((book) => {
        books.push({ name: book.name, author: book.author, genre: book.genre });
      });
      userdata.forEach((user) => {
        //books.push({ name: book.name, author: book.author, genre: book.genre });
        bookNames.push({name: user.name});
      });
  
      
    } catch (error) {
      console.log(error);
    } finally {
      res.render("squeak", { books: books, bookNames: bookNames }); 
    }
  };

  const getSqueak = async (req, res) => {
    let data = [];
    let userdata = [];
    let books = [];
    let bookNames = []
    
    try {
      data = await bookModel.find();
      userdata = await userModel.find();
  
      console.log(userdata);
      
      userdata.forEach((user) => {
        //books.push({ name: book.name, author: book.author, genre: book.genre });
        bookNames.push({name: user.name});
      });
      
    } catch (error) {
      console.log(error);
    } finally {
      res.render("squeak", { books: books, bookNames: bookNames }); 
    }
  };

module.exports = {getBookList, postBook, getUserList, postUsername, getSqueak};