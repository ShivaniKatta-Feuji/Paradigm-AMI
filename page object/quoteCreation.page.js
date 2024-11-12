const { expect } = require('@playwright/test');
const data = require('../data.json');
require('dotenv').config()

exports.QuoteCreation = class QuoteCreation{
    constructor(page){
        this.page=page;

        this.username=page.locator("//input[@id='username']");
        this.password=page.locator("//input[@id='password']");
        this.nextButton=page.locator("//span[text()='Next']//parent::button");
        this.signInButton=page.locator("//span[text()='Sign In']//parent::button");

        this.myQuotes=page.locator("//div[@id='navbarSupportedContent']//a[contains(@href,'quotes')]");
        this.newQuote=page.locator("//span[text()='New Quote']");
        this.currentPage=page.locator("//div[@id='breadcrumbs']//li[last()]");
        this.quoteCurrentPage=page.locator("//div[@id='breadcrumbs']//following-sibling::div//li[last()]");

        this.formHeader=page.locator("//div[@id='quote-new-app']//h1");
        this.quoteNameLabel=page.locator("//label[text()='Quote Name']");
        this.quoteNameInput=page.locator("//input[@name='QuoteName']");
        this.projectNameLabel=page.locator("//label[text()='Project Name']");
        this.projectNameInput=page.locator("//input[@id='react-select-2-input']");
        // this.createProject=page.locator("wts-react-select__input-container css-ackcql");

        this.selectClientButton=page.locator("//span[text()='Select a client']//parent::button");
        this.searchClientBar=page.locator("//input[@placeholder='Search by client name or number']");
        this.selectClient=page.locator("//td[text()='WINDOW NATION/ISS-162-887030']");
        this.selectedClientName=page.locator("//p[text()='WINDOW NATION/ISS-162-887030 (887030)']");

        this.cancel=page.locator("//a[text()='Cancel']");
        this.create=page.locator("//button[@type='submit']");
        this.delete=page.locator("(//button[@title='Delete'])[1]");

        this.quoteNameHeader=page.locator("//a[@id='quote-name-edit']");
        this.quoteProjectHeader=page.locator("//a[@id='project-name-edit']");
        
    }

    async launchURL(){
        await this.myQuotes.click();
        await expect(this.currentPage).toHaveText(data.myQuotes.currentPage);
        await this.newQuote.click();
        await expect(this.quoteCurrentPage).toHaveText(data.newQuoteForm.currentPage);
    }
    async login(){
        await this.page.goto(process.env.AMI_URL);

        await this.username.fill(process.env.AMI_username);
        await this.nextButton.click();
        await this.password.fill(process.env.AMI_password);
        await this.signInButton.click();

        await this.myQuotes.click();
        await expect(this.currentPage).toHaveText(data.myQuotes.currentPage);
        await this.newQuote.click();
        await expect(this.quoteCurrentPage).toHaveText(data.newQuoteForm.currentPage);
        
    }
    async clickNewQuote(){
        await expect(this.formHeader).toHaveText(data.newQuoteForm.currentPage);
        await expect(this.quoteCurrentPage).toHaveText(data.newQuoteForm.currentPage);
        await expect(this.quoteNameLabel).toHaveText(data.newQuoteForm.quoteName);
        await expect(this.quoteNameLabel).toBeVisible();
        await expect(this.projectNameLabel).toBeVisible();
        await expect(this.quoteNameInput).toBeEditable();
        await expect(this.projectNameInput).toBeEditable();
        await expect(this.cancel).toBeVisible();
        await expect(this.create).toBeVisible();
        await expect(this.create).toBeDisabled();
    }
    
    async checkCreateStateBefore(){
        await expect(this.create).toBeDisabled();

    }

    async validQuoteName(){
        await this.quoteNameInput.fill(data.createQuote.quoteName);
        await expect(this.create).toBeDisabled();
    }

    async selectProjectName(){
        await this.projectNameInput.fill(data.createQuote.projectName);
        await this.projectNameInput.click();
        await expect(this.create).toBeDisabled();
    }

    async selectClientDropdown(){
        await expect(this.create).toBeDisabled();
        await this.selectClientButton.click();
        await this.searchClientBar.fill(data.createQuote.client);
        await this.selectClient.click();
        await expect(this.selectedClientName).toHaveText(data.createQuote.selectedClient);
        await expect(this.create).toBeEnabled();
    }

    async clickCreate(){
        await expect(this.currentPage).toHaveText(data.createQuote.currentPage);
        await expect(this.quoteNameHeader).toHaveText(data.createQuote.quoteName);
        // await expect(this.quoteNameHeader).toHaveText(data.createQuote.projectName);
        await expect(this.quoteNameHeader).toBeEditable();
        await expect(this.quoteProjectHeader).toBeEditable();
    }

    async clickCancel(){
        await expect(this.quoteCurrentPage).toHaveText(data.newQuoteForm.currentPage);
        await this.cancel.click();
    }

    async deleteQuote(){
        await this.myQuotes.click();
        await this.page.on('dialog',async(dialog)=>{
            await dialog.accept();
        })
        await this.delete.click();
    }
}
