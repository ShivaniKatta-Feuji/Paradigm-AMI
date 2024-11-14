const { expect } = require('@playwright/test');
const data = require('../data/data.json'); 
require('dotenv').config();

exports.RegistrationPage = class RegistrationPage {
  constructor(page) {
    this.page = page;

    this.firstNameField = page.locator("input[@id='21911049874491084']");
    this.lastNameField = page.locator("input[@id='738289968980135']");
    this.emailField = page.locator("input[@id='4702262866627449']");
    this.passwordField = page.locator("input[@id='8506063356200653']");
    this.confirmPasswordField = page.locator("input[@id='9861190755981795']");
    this.termsCheckbox = page.locator("input[@id='03852393312215141']");
    this.registerButton = page.locator("button[@type='submit']");
    this.showPasswordCheckbox = page.locator("input[@id='showPasswordCheck']");
    this.privacyPolicyCheckbox = page.locator('input[name="privacyPolicy"]');
    this.signInButton = page.locator('button[type="button"][text="Sign In"]');
    this.errorMessage = page.locator('.error-message');
  }


  async launchURL() {
    await this.page.goto(process.env.registration_url);
  }


  async fillRegistrationForm({
    firstName = data.validUser.firstName,
    lastName = data.validUser.lastName,
    email = data.validUser.email,
    password = data.validUser.password,
    confirmPassword = data.validUser.confirmPassword,
    privacyPolicyAccepted = data.validUser.privacyPolicyAccepted
  }) {
    await this.firstNameField.fill(firstName);
    await this.lastNameField.fill(lastName);
    await this.emailField.fill(email);
    await this.passwordField.fill(password);
    await this.confirmPasswordField.fill(confirmPassword);

    if (privacyPolicyAccepted) {
      await this.privacyPolicyCheckbox.check();
    }

    if (await this.showPasswordCheckbox.isChecked()) {
      await this.showPasswordCheckbox.uncheck();
    } else {
      await this.showPasswordCheckbox.check();
    }
  }


  async clickRegister() {
    await this.registerButton.click();
  }


  async clickSignIn() {
    await this.signInButton.click();
  }


  async verifyErrorMessage(expectedMessage) {
    await this.errorMessage.waitFor({ state: 'visible', timeout: 5000 });
    const actualMessage = await this.errorMessage.textContent();
    expect(actualMessage.trim()).toBe(expectedMessage);
  }


  async verifyRegisterButtonEnabled(enabled = true) {
    const isEnabled = await this.registerButton.isEnabled();
    expect(isEnabled).toBe(enabled);
  }

  async checkIfAllFieldsFilled() {
    const firstNameValue = await this.firstNameField.inputValue();
    const lastNameValue = await this.lastNameField.inputValue();
    const emailValue = await this.emailField.inputValue();
    const passwordValue = await this.passwordField.inputValue();
    const confirmPasswordValue = await this.confirmPasswordField.inputValue();
    const privacyPolicyChecked = await this.privacyPolicyCheckbox.isChecked();

    return (
      firstNameValue &&
      lastNameValue &&
      emailValue &&
      passwordValue &&
      confirmPasswordValue &&
      privacyPolicyChecked
    );
  }


  async updateRegisterButtonState() {
    const allFieldsFilled = await this.checkIfAllFieldsFilled();
    if (allFieldsFilled) {
      await this.registerButton.enable();
    } else {
      await this.registerButton.disable();
    }
  }

  async verifyEmailErrorMessage() {
    await this.verifyErrorMessage(data.errorMessage.emailErrorMessage);
  }

  async verifyPasswordErrorMessage() {
    await this.verifyErrorMessage(data.errorMessage.passwordErrorMessage);
  }
};
