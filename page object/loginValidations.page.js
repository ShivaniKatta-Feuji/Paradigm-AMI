const {expect}=require('@playwright/test')
require('dotenv').config()

exports.LoginPage=class LoginPage {
    constructor(page) {
      this.page = page;
  
      this.emailField = page.locator("//input[@placeholder='Enter your email']"); 
      this.nextButton = page.locator("//button[@class='btn btn-primary']")
      this.passwordField = page.locator("//input[@placeholder='Enter your password']"); 
      this.signInButton = page.locator("//button[@class='btn btn-primary float-end']"); 
      this.backButton = page.locator("//button[@class='btn btn-default']"); 
      this.errorMessage = page.locator("//div[@class='notification--content']"); 
      this.emailFieldPrePopulated = page.locator("//input[@readonly]"); 

    }
  
    async launchURL(){
        await this.page.goto('https://am-webcp-test.myparadigmcloud.com/');
    }
    
    async enterEmail() {
      await this.emailField.fill(process.env.email)
    }
  
    async clickNext() {
      await this.nextButton.click();
    }
  
    
    async enterPassword(password) {
      await this.passwordField.fill(process.env.password);
    }
  
  
    async clickSignIn() {
      await this.signInButton.click();
    }
  
    // // Method to check the error message
    // async verifyErrorMessage(expectedMessage) {
    //   await this.errorMessage.toHaveText(expectedMessage);
    // }
  
    // Method to check if the email field is pre-populated and read-only
    async verifyEmailPrePopulatedAndReadOnly(email) {
      await expect(this.emailFieldPrePopulated).toHaveValue(email);
      await expect(this.emailFieldPrePopulated).toBeDisabled();
    }
  
    // Method to check if the "Back" button is visible
    async verifyBackButtonVisible() {
      await expect(this.backButton).toBeVisible();
    }
  }
  
 
  