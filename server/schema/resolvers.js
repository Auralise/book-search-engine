import { AuthenticationError, ValidationError } from "apollo-server-express";
import { Book, User } from "../models";
import { signToken } from "../utils/auth";

export const resolvers = {
    Query: {
        getSingleUser: async () => {


        },

    },
    Mutation: {
        createUser: async (parent, { username, email, password }) => {
            if (!username || !email || !password) {
                throw new ValidationError("Please provide a Username, Email and Password");
            }
            const user = await User.create({
                username,
                email,
                password,
                savedBooks: []
            })

            const token = signToken({
                username: user.username,
                email: user.email,
                _id: user._id
            })

            return { token, user };
        },

        login: async (parent, { email, password }) => {
            const user = User.findOne({ email });

            if(!user){
                throw new AuthenticationError("Invalid Credentials");
            }

            if(!user.isCorrectPassword(password)){
                throw new AuthenticationError("Invalid Credentials");
            }

            const token = signToken({
                username: user.username,
                email: user.email,
                _id: user._id,
            });

            return { token, user };

        },

        saveBook: async () => {

        },

        deleteBook: async () => {

        }
    }
}