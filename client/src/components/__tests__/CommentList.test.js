import React from 'React';
import { mount } from 'enzyme';
import CommentList from 'components/CommentList';
import Root from 'Root';

let wrapper;

beforeEach(() => {
    const initialState = {
        comments: ['One', 'Two']
    }
    wrapper = mount(<Root initialState={initialState}><CommentList/></Root>);
})

afterEach(() => {
    wrapper.unmount();
})

it('creates one LI per comment', () => {
  expect(wrapper.find('li').length).toEqual(2);
});

it('diplayes correct text', () => {
    expect(wrapper.render().text()).toContain('One');
    expect(wrapper.render().text()).toContain('Two')
})