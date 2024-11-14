const { test, expect } = require('@playwright/test')
const indexPage = require('../utils/index.page')
const { registrationPage } = require('../pageObject/registrationValidations.page')


test.describe('Login Functionality for Valid and Invalid User Credentials', async () => {

    let loginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new indexPage.LoginPage(page);
        loginPage.launchURL();
    });

    test.only('TC-001 Verify Login functionality', async ({ page }) => {
        await loginPage.verifyInvalidEmail();
        await loginPage.verifyInvalidPassword();
        await loginPage.successfulLogin();
    });



    test('Registration form behavior', async ({ page }) => {
        const registrationPage = new RegistrationPage(page);


        await registrationPage.launchURL();


        await registrationPage.verifyRegisterButtonEnabled(false);

        await registrationPage.fillRegistrationForm(testData.validUser);


        await registrationPage.updateRegisterButtonState();
        await registrationPage.verifyRegisterButtonEnabled(true);


        await registrationPage.fillRegistrationForm(testData.emptyConfirmPassword);

        await registrationPage.updateRegisterButtonState();
        await registrationPage.verifyRegisterButtonEnabled(false);


        await registrationPage.fillRegistrationForm(testData.invalidUser);


        await registrationPage.clickRegister();

        await registrationPage.verifyErrorMessage('Please fill out all required fields correctly.');
    });
});

