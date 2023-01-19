const { gql } = require("apollo-server-express");

const typeDefs = gql`
    
    type Book {
        # Local DB ID
        _id: ID
        # GoogleBooks ID
        bookId: String!
        title: String!
        author: [String]
        description: String!
        image: String
        link: String
    }

    type User {
        _id: ID
        username: String!
        email: String!
        savedBooks: [Book]
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        getSingleUser(id: String!): User
    }

    type Mutation {
        createUser(email: String!, username: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        saveBook(id: String!, book: Book): [Book]
        deleteBook(username: String!, book: Book): [Book]
    }
`;

module.exports = typeDefs;