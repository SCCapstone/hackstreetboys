// import '@testing-library/jest-dom'
// import App from "../App"
// import { render, screen } from '@testing-library/react'
// import userEvent from '@testing-library/user-event';

// test('Ingredient Dropdown Button', () => {
//     render(<App />);

//     userEvent.click(screen.getByText("Biscuit Facts"));
// });

import React from 'react';
import Adapter from "enzyme-adapter-react-16";
import { configure, shallow } from 'enzyme';
import MyPantry from '../pages/myPantry';
// import Link from './Link.react';

it('Pantry Renders', () => {
    shallow(<MyPantry />);
})