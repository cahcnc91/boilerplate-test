import "reflect-metadata";
import { GraphQLServer } from 'graphql-yoga'
import { importSchema } from 'graphql-import';
import { resolvers } from './resolvers';
import { createConnection } from "typeorm";
import { User } from './entity/User';
// import * as path from 'path';

const typeDefs = importSchema('schema.graphql');
const server = new GraphQLServer({ typeDefs, resolvers })

createConnection({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "cahcnc",
    password: "deckdeck",
    database: "graphql-ts-boilerplate",
    entities: [
        User
    ],
    synchronize: false,
    logging: false
}).then(() => {
    server.start(() => console.log('Server is running on localhost:4000'))
}).catch(error => console.log(error));
    
