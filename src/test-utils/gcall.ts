import { createSchema } from '../utils/createSchema';
import { graphql } from 'graphql';
import { Maybe } from 'type-graphql';

interface Options {
    source: string,
    variableValues?: Maybe<{
        [key: string]: any;
    }>
}

let schema: any;

export const gCall = async ({source, variableValues}: Options) => {
    if(!schema){
        schema = await createSchema();
    }
    
    return graphql({
        schema,
        source,
        variableValues
    })
}