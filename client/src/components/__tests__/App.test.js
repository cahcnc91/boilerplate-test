import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';

it('show comment box', () => {
 const div = document.createAttribute('div');

 ReactDOM.render(<App/>, div);

 expect(div.innerHTML).toContain('Comment Box')

 ReactDOM.unmountComponentAtNode(div)
})
