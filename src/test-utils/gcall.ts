import { createSchema } from '../utils/createSchema';
import { graphql } from 'graphql';
import { Maybe } from 'type-graphql';

interface Options {
    source: string,
    variableValues?: Maybe<{
        [key: string]: any;
    }>,
    userId?: number;
}

let schema: any;

export const gCall = async ({source, variableValues, userId}: Options) => {
    if(!schema){
        schema = await createSchema();
    }
    
    return graphql({
        schema,
        source,
        variableValues,
        contextValue: {
            req: { session: {
                userId
            }}, res: { clearCookie: jest.fn()}
        }
    })
}