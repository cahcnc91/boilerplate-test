import commentsReducer from 'reducers/comments';
import {SAVE_COMMENT} from 'actions/types';

it('handle actions of type SAVE_COMMENT', () => {
    const action = {
        type: SAVE_COMMENT,
        payload: 'New comment'
    }

    const newState = commentsReducer([], action);
    expect(newState).toEqual(['New comment'])
})

it('handles action with unknow type', () => {
    const newState = commentsReducer([], {type: 'RANDOM'});
    expect(newState).toEqual([]);
})