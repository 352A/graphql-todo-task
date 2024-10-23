import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import mongoose from "mongoose";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { schema } from "./schema.js";
import { resolvers } from "./resolvers.js";
import util, { promisify } from "util";

dotenv.config();

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
});

mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => console.log(err));

const { url } = await startStandaloneServer(server, {
  listen: { port: 5000 },
  context: async ({ req }) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return { user: null };
    }

    try {
      const decoded = await util.promisify(jwt.verify)(
        authHeader,
        process.env.JWT_SECRET
      );
      return { user: decoded };
    } catch (error) {
      return { user: null };
    }
  },
});
console.log(`Server running at: ${url}`);
