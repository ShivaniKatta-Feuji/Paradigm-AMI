const { test, expect } = require('@playwright/test')
const { indexPage } = require('../index.page')


test.describe('Login Functionality for Valid and Invalid User Credentials', async() => {

    let loginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new indexPage.LoginPage(page); 
        loginPage.launchURL(); 
    });

    test('Login with valid credentials', async({ page }) => {
        await loginPage.enterEmail();
        await loginPage.clickNext();

        await loginPage.enterPassword();
        await loginPage.clickSignIn();
        
        await expect(page).toHaveURL('https://am-webcp-test.myparadigmcloud.com/');
    });


});

