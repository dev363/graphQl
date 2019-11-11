const graphql= require('graphql');
const _= require("lodash")

const {books,authors}= require("../../data/data")

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLSchema,
  GraphQLInt,
  GraphQLNonNull
}= graphql;


const BookType= new GraphQLObjectType({
  name:"Book",
  fields:()=>({
    id:{type:GraphQLID},
    name:{type:GraphQLString},
    genre:{type:GraphQLString},
    author:{
      type:AuthorType,
      resolve(parent,args){
        return _.find(authors,{id:parent.authorId})
      }
    }
  })
})

module.exports={BookType}
