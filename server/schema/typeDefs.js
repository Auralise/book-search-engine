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

    # TODO: Potentially remove the password field to avoid exposing password hashes
    type User {
        _id: ID
        username: String!
        email: String!
        password: String!
        savedBooks: [Book]
    }

    # TODO: Remove user return from this before deployment to avoid exposing password hashes
    type Auth {
        token: ID!
        user: User
    }

    type Query {
        getSingleUser(username: String!): User
    }

    type Mutation {
        createUser(email: String!, username: String!, password: String!): User
        login(email: String!, password: String!): Auth
        saveBook(username: String!, bookId: String!, description: String!): [Book]
        deleteBook(username: String!, bookId: String!): [Book]
    }
`;

module.exports = typeDefs;