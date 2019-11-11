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


const AuthorType= new GraphQLObjectType({
  name:"Author",
  fields:()=>({
    id:{type:GraphQLID},
    name:{type:GraphQLString},
    age:{type:GraphQLInt},
    books:{
      type: new GraphQLList(BookType),
      resolve(parent,args){
        return _.filter(books,{authorId:parent.id})
      }
    }
  })
})

module.export={AuthorType}
