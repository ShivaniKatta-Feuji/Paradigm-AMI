const { expect } = require('@playwright/test')
const data = require('../data/data.json')
const { verifyErrorMessage } = require('../utils/helper')
require('dotenv').config()

exports.LoginPage = class LoginPage {
  constructor(page) {
    this.page = page;

    this.emailField = page.locator("//input[@placeholder='Enter your email']");
    this.nextButton = page.locator("//button[@class='btn btn-primary']")
    this.passwordField = page.locator("//input[@placeholder='Enter your password']");
    this.signInButton = page.locator("//button[@class='btn btn-primary float-end']");
    this.backButton = page.locator("//button[@class='btn btn-default']");
    this.emailErrorMessage = page.locator("//div[@class='alert alert-danger']");
    this.passwordErrorMessage = page.locator("//div[@class='notification--content']");
    this.emailFieldPrePopulated = page.locator("//input[@readonly]");

  }

  async launchURL() {
    await this.page.goto(process.env.base_url);
  }

  async enterEmail(email) {
    await this.emailField.fill(email);
    await this.nextButton.click();
  }

  async enterPassword(password) {
    await this.passwordField.fill(password);
    await this.signInButton.click();
  }

  async verifyInvalidEmail() {
    await this.enterEmail(data.invalidCredentials.invalidEmail);
    verifyErrorMessage(this.emailErrorMessage, data.errorMessage.emailErrorMessage);
  }


  async verifyInvalidPassword() {
    await this.enterEmail(process.env.admin_username);
    await this.verifyEmailPrePopulatedAndReadOnly();
    await this.enterPassword(data.invalidCredentials.invalidEmail);
    verifyErrorMessage(this.passwordErrorMessage, data.errorMessage.passwordErrorMessage);
  }

  async successfulLogin() {
    // await this.enterEmail(process.env.admin_username);
    // await this.verifyEmailPrePopulatedAndReadOnly();
    await this.enterPassword(process.env.admin_password);
    await expect(this.page).toHaveURL(data.url.baseUrl);
  }

  async verifyEmailPrePopulatedAndReadOnly() {
    await expect(this.emailFieldPrePopulated).toHaveValue(process.env.admin_username);
    await expect(this.emailFieldPrePopulated).not.toBeEditable();
  }

  async verifyBackButtonVisible() {
    await expect(this.backButton).toBeVisible();
  }

}