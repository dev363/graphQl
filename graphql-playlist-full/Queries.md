{
    books{
      id,
      name,
      author{
        name,
        books{
          name
        }
      }
  }
}

{
    book(id:"5db93e73a2b9af408b1af615"){
      name
  }
}
{
    books{
      id,
      name,
      author{
        name
      }
  }
}

mutation {
  addAuthor(name: "Guru Gopal Das", age: 45,city:"mumbai") {
    id
  }
}


mutation {
  addBook(name: "Revival", genre: "motivational",authorId:"5db93d3ba2b9af408b1af614") {
    id,
    name
  }
}
