const graphql= require('graphql');
const _= require("lodash")

// const {books,authors}= require("../data/data")
const {BookType}= require("./book")

const User= require("../models/user")
const Post= require("../models/post")

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLSchema,
  GraphQLInt,
  GraphQLNonNull
}= graphql;




const UserType= new GraphQLObjectType({
    name:"User",
    fields:()=>({
      id:{type:GraphQLID},
      fname:{type:GraphQLString},
      lname:{type:GraphQLString},
      age:{type:GraphQLInt},
      posts:{
        type: new GraphQLList(PostType),
        resolve(parent,args){
          return Post.find({ userId: parent.id });
        }
      }
    })
})

const PostType= new GraphQLObjectType({
  name:"Post",
  fields:()=>({
    id:{type:GraphQLID},
    title:{type:GraphQLString},
    desc:{type:GraphQLString},
    tags:{type:GraphQLString},
    userId:{type:GraphQLID},
    user:{
      type: UserType,
      resolve(parent,args){
        console.log(parent)
        // return parent
        return User.findById(parent.userId)
      }
    }
  })
})
const RootQuery= new GraphQLObjectType({
  name:'RootQueryType',
  fields:{
    books:{
      type:new GraphQLList(BookType),
      resolve(parent, args){
        return books
      }
    },

    book:{
      type:BookType,
      args:{id:{type:GraphQLID}},
      resolve(parent,args){
        return _.find(books,{id:args.id})
      }
    },

    authors:{
      type: new GraphQLList(AuthorType),
      resolve(){
        return authors
      }
    },

    author:{
      type:AuthorType,
      args:{id:{type:GraphQLID}},
      resolve(parent,args){
        return _.find(authors,{id:args.id})
      }
    },

    users:{
      type: new GraphQLList(UserType),
      resolve(){
        return User.find({});
      }
    },

    user:{
      type: UserType,
      args:{
        id:{type:GraphQLID}
      },
      resolve(parent,args){
        console.log(args)
        return User.findById(args.id)
      }
    },

    posts:{
      type: new GraphQLList(PostType),
      resolve(){
        return Post.find({});
      }
    },

    post:{
      type:PostType,
      args:{
        id:{type:GraphQLID}
      },
      resolve(parent,args){
        return Post.findById(args.id)
      }
    }

  }
})

const Mutation= new GraphQLObjectType({
  name:"Mutation",
  fields:{
    addUser:{
      type: UserType,
      args:{
        fname: {type:GraphQLString},
        lname: {type:GraphQLString},
        age: {type:GraphQLInt}
      },
      resolve(parent,args){
        let user= new User(args)
        return user.save();
      }
    },

    addPost:{
      type:PostType,
      args:{
        title:{type:new GraphQLNonNull(GraphQLString)},
        desc:{type:new GraphQLNonNull(GraphQLString)},
        tags:{type:GraphQLString},
        userId:{type:new GraphQLNonNull(GraphQLID) }   // required field
      },
      resolve(parent,args){
        let post= new Post(args)
        return post.save();
      }
    }
  }
})

module.exports= new GraphQLSchema({
  query: RootQuery,
  mutation:Mutation
});

// {authors{
//   name,
//   id,
//   author
// }}

// {author(id:1){
//   name,
//   id,
//   age
// }}

// {books{
//   name,
//   id,
//   genre,
//   author{
//     id,name,
// 	books{
//     name,
//     id
//   }
//   }
// }}

// mutation {
//   addUser(fname: "Lary", lname:"rogh", age: 45) {
//     id,
//     fame,
//     age
//   }
// }

// mutation {
//   addPost(title: "Lern Reactjs", desc:"This tutorial is designed for people who prefer to learn by doing. If you prefer learning concepts from the ground up, check out our step-by-step guide. You might find this tutorial and the guide complementary to each other.",tags:"IT") {
//     id,
//     title,
//     tags
//   }
// }
