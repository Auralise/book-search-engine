import { AuthenticationError, ValidationError, UserInputError } from "apollo-server-express";
import { Book, User } from "../models";
import { signToken } from "../utils/auth";

export const resolvers = {
    Query: {
        getSingleUser: async (parent, { username }, context) => {
            const foundUser = await User.findOne({
                $or: [{_id: context.user._id}, { username }]
            });

            if (!foundUser){
                throw new UserInputError("No user with this username found");
            }

            return foundUser;
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

            if (!user) {
                throw new AuthenticationError("Invalid Credentials");
            }

            if (!user.isCorrectPassword(password)) {
                throw new AuthenticationError("Invalid Credentials");
            }

            const token = signToken({
                username: user.username,
                email: user.email,
                _id: user._id,
            });

            return { token, user };

        },

        saveBook: async (parent, { book }, context) => {
            if (context.user) {
                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    {
                        $addToSet: {
                            savedBooks: {
                                bookId: book.bookId,
                                title: book.title,
                                author: book.author,
                                description: book.description,
                                image: book.image,
                                link: book.link,
                            }
                        }
                    },
                    {
                        new: true,
                        runValidators: true
                    }
                )
            }
            else {
                throw new AuthenticationError("You need to be logged in to perform this action");
            }
        },

        deleteBook: async (parent, { book }, context) => {
            if (context.User) {
                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    {
                        $pull: {
                            savedBooks: {
                                bookId: book.bookId
                            }
                        }
                    },
                    {
                        new: true
                    }

                );
            }
            else {
                throw new AuthenticationError("You need to be logged in to perform this action");
            }
        }
    }
}