import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// Requirements
require('chromedriver');
const assert = require('assert');
const {Builder, Key, By, until} = require('selenium-webdriver');

describe('Checkout Parking App', function () {
    let driver;
    before(async function() {
        driver = await new Builder().forBrowser('chrome').build();
    });

    // Test steps
    it('A Seller creates an advertisement'), async function() {
        //Go to website
        // log in as a Seller
        // create an advertisement
    }
}

/*
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<App />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
*/