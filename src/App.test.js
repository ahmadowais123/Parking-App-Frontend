import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// Requirements
require('chromedriver');
const assert = require('assert');
const {Builder, Key, By, until} = require('selenium-webdriver');

describe('Create an advertisement', function () {
    let driver;
    before(async function() {
        driver = await new Builder().forBrowser('chrome').build();
    });

    // Test steps
    it('A Seller creates a valid advertisement', async function() {
        // Go to website
        await driver.get('https://parking-app-ecse428.herokuapp.com/');
        // Login

        // Click on Login button
        await driver.findElement(By.linkText("Login")).click();

        // Click on email address box
        await driver.findElement(By.id('email')).click();

        // Enter email address
        await driver.findElement(By.id('email')).sendKeys('Testing@gmail.com');

        // Click on password box
        await driver.findElement(By.id('password')).click();

        // Enter password
        await driver.findElement(By.id('password')).sendKeys('123');

        // Click Login button
        await driver.findElement(By.xpath("//button[contains(.,'Login')]")).click();

        // Click create an advertisement
        await driver.findElement(By.linkText("Create Spot")).click();

        // Enter Street Name
        await driver.findElement(By.id('streetName')).click();
        await driver.findElement(By.id('streetName')).sendKeys('Street1');

        // Enter Address Number
        await driver.findElement(By.id('addressNumber')).click();
        await driver.findElement(By.id('addressNumber')).sendKeys('Address1');

        // Enter Postal Code
        await driver.findElement(By.id('postalCode')).click();
        await driver.findElement(By.id('postalCode')).sendKeys('PostalCode1');

        // Enter Price
        await driver.findElement(By.id('currentPrice')).click();
        await driver.findElement(By.id('currentPrice')).sendKeys('Price1');

        // Enter Rating
        await driver.findElement(By.id('avgRating')).click();
        await driver.findElement(By.id('avgRating')).sendKeys('Rating1');

        // Enter ID
        await driver.findElement(By.id('pkey')).click();
        await driver.findElement(By.id('pkey')).sendKeys('100');

        // Click on Create a parking spot
        await driver.findElement(By.xpath("//button[contains(.,'Create a parking spot')]")).click();

        // Check for advertisement creation success
    });

    it('A Seller creates an invalid advertisement', async function() {

    }
}

/*
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<App />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
*/