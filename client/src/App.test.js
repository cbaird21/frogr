// Acccess to the virtual DOM via `screen` to be able to render what JSX argument is passed.
import { render, screen } from '@testing-library/react';
import App from './App'

test('INPUT WHAT YOU WANT TO HAPPEN', () => {
    // render creates the virtual Dom for whatever JSX you give it for the argument 
    // this is calling the JSX of App
    render(<App />);
    const linkElement =
    // Find whatever element in the dom based on whatever text it's displaying
     screen.getByText(/regular expression or just an EXACT string/i);
    //  Assertion is what causes the test to succed or fail.
    // research more syntax

    // jest assertions

    // all start with expect, it's a Jest Global

    // Expects an argument, it's what your assertion is asserting against. To examine to see if it meets expectations
    expect(linkElement).
    // This is a MATCHER, it's the type of assertion, this matcher comes from jest-DOM
    // () doesn't have a matcher element unless there's a known quanity.
    toBeInTheDocument();
})

// Assertions examples


// subject= element.textContent
// matcher= to be

// expect(element.textContent).toBe('hello');

// expect(elementsArray).toHaveLength(7);


// jest-dom
// comes with create-react-app
// src/setupTest.js imports it before each test, makes matchers available.
// DOM based matchers
// toBeVisible() or toBeChecked()

// Jest
// helps search virtual Dom
// interacting with the virtual DOM clicking elements

// command npm  run test, 
//  it runs in watch mode