const { expect } = require('@playwright/test');
const data = require('../data/data.json');
const helper = require('../utils/helper')
require('dotenv').config()

exports.QuoteCreation = class QuoteCreation {
    constructor(page) {
        this.page = page;

        this.userName = page.locator("//input[@id='username']");
        this.password = page.locator("//input[@id='password']");
        this.nextButton = page.locator("//span[text()='Next']//parent::button");
        this.signInButton = page.locator("//span[text()='Sign In']//parent::button");

        this.myQuotes = page.locator("//div[@id='navbarSupportedContent']//a[contains(@href,'quotes')]");
        this.newQuote = page.locator("//a[@id='secondary_navbar__newQuote']");
        this.currentPage = page.locator("//div[@id='breadcrumbs']//li[last()]");
        this.quoteCurrentPage = page.locator("//div[@id='breadcrumbs']//following-sibling::div//li[last()]");

        this.formHeader = page.locator("//div[@id='quote-new-app']//h1");
        this.quoteNameLabel = page.locator("//label[text()='Quote Name']");
        this.quoteNameInput = page.locator("//input[@name='QuoteName']");
        this.projectNameLabel = page.locator("//label[text()='Project Name']");
        this.projectNameInput = page.locator("//input[@id='react-select-2-input']");
        // this.selectCreateProject=page

        this.selectClientButton = page.locator("//span[text()='Select a client']//parent::button");
        this.searchClientBar = page.locator("//input[@placeholder='Search by client name or number']");
        this.selectClient = page.locator("//td[text()='WINDOW NATION/ISS-162-887030']");
        this.selectedClientName = page.locator("//p[text()='WINDOW NATION/ISS-162-887030 (887030)']");

        this.cancelButton = page.locator("//a[text()='Cancel']");
        this.createButton = page.locator("//button[@type='submit']");
        this.notification = page.locator("//div[@class='notification--content']");
        this.deleteIcon = page.locator("(//button[@title='Delete'])[1]");

        this.quoteNameHeader = page.locator("//a[@id='quote-name-edit']");
        this.quoteProjectHeader = page.locator("//a[@id='project-name-edit']");

    }

    async navigate() {
        await this.newQuote.click();
        await expect(this.quoteCurrentPage).toHaveText(data.newQuoteForm.currentPage);
    }
    async login() {
        await this.page.goto(process.env.base_url);

        await this.userName.fill(process.env.admin_username);
        await this.nextButton.click();
        await this.password.fill(process.env.admin_password);
        await this.signInButton.click();

        await this.newQuote.click();
        await expect(this.quoteCurrentPage).toHaveText(data.newQuoteForm.newQuotePage);

    }
    async clickNewQuote() {
        await expect(this.formHeader).toHaveText(data.newQuoteForm.newQuotePage);
        await expect(this.quoteCurrentPage).toHaveText(data.newQuoteForm.newQuotePage);

        await expect(this.quoteNameLabel).toHaveText(data.newQuoteForm.quoteName);
        await expect(this.quoteNameLabel).toBeVisible();
        await expect(this.projectNameLabel).toBeVisible();
        await expect(this.quoteNameInput).toBeEditable();
        await expect(this.projectNameInput).toBeEditable();
        await expect(this.cancelButton).toBeVisible();
        await expect(this.createButton).toBeVisible();
        await expect(this.createButton).toBeDisabled();
    }

    async validQuoteName() {
        await this.quoteNameInput.fill(data.createQuote.quoteName);
        // await expect(this.createButton).toBeDisabled();
        // await this.page.waitForTimeout(3000);


    }

    async selectProjectName() {
        await this.projectNameInput.fill(data.createQuote.projectName);
        await this.page.getByText(`Create "${data.createQuote.projectName}"`, { exact: true }).click();
        await expect(this.createButton).toBeDisabled();
        // await this.page.waitForTimeout(3000);

    }

    async selectClientDropdown() {
        await expect(this.createButton).toBeDisabled();
        await this.selectClientButton.click();
        await this.searchClientBar.fill(data.createQuote.client);
        await this.selectClient.click();
        await expect(this.selectedClientName).toHaveText(data.createQuote.selectedClient);
        await expect(this.createButton).toBeEnabled();
    }

    async clickCreate() {
        // await this.validQuoteName();
        // await this.selectProjectName();
        // await this.selectClientDropdown();
        await this.createButton.click();
        await expect(this.notification).toBeVisible();
        const createdQuoteName= await this.notification.textContent();
        console.log(createdQuoteName);

        // await expect(this.quoteCurrentPage).toHaveText(data.createQuote.currentPage);
        await expect(this.quoteNameHeader).toContainText(data.createQuote.quoteName);
        await expect(this.quoteProjectHeader).toContainText(data.createQuote.projectName);
        await expect(this.quoteNameHeader).toBeEditable();
        await expect(this.quoteProjectHeader).toBeEditable();
    }

    async clickCancel() {
        await expect(this.quoteCurrentPage).toHaveText(data.newQuoteForm.newQuotePage);
        await this.cancelButton.click();
    }

    async deleteQuote() {
        await this.myQuotes.click();
        helper.alertHandling(this.page);
        await this.deleteIcon.click();
    }

    async validateCreateButtonColour() {
        await this.navigate();
        await expect(this.createButton).toHaveCSS(data.css.color, data.css.disableStateColor);
        await this.selectClientDropdown();
        await expect(this.createButton).toHaveCSS(data.css.color, data.css.enabledStatecolor);
    }
}
