import { AuthenticationError } from "apollo-server-express";
import { Book, User } from "../models";
import { signToken } from "../utils/auth";

export const resolvers = {
    Query: {
        getSingleUser: async () => {

        },

    },
    Mutation: {
        createUser: async () => {

        },

        login: async () => {

        },

        saveBook: async () => {

        },

        deleteBook: async () => {
            
        }
    }
}