import React from 'react';
import { mount } from 'enzyme';
import CommentBox from 'components/CommentBox';
import Root from 'Root';

let wrapper;

beforeEach(() => {
    wrapper = mount(<Root><CommentBox/></Root>);
})

afterEach(() => {
    wrapper.unmount()
})

it('has a text area and a 2 buttons', () => {
    expect(wrapper.find('textarea').length).toEqual(1);
    expect(wrapper.find('button').length).toEqual(2);
});

describe('the text area', () => {
    beforeEach(() => {
        wrapper.find('textarea').simulate('change', {
            target: {value: 'new comment'}
        })
        wrapper.update();
    })

    it('has a textarea that users can type', () => {
        expect(wrapper.find('textarea').prop('value')).toEqual('new comment')
    })
    
    it('submits input and clears textarea', () => {
        wrapper.find('form').simulate('submit', {preventDefault: () => {}});
        wrapper.update();
    
        expect(wrapper.find('textarea').prop('value')).toEqual('');
    
    })
})