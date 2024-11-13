const {expect}=require('@playwright/test')
const data=require('../data/data.json')
const helper=require("../utils/helper")
require('dotenv').config()

exports.QuoteFunctionality=class QuoteFunctionality{
    constructor(page){
        this.page=page
        this.select=page.locator("#select-addon")
        this.search=page.locator("//div[@class='input-group']//input")
        this.show=page.locator("#perPage")
        this.newquote=page.locator("//a[@class='btn btn-success']")
        this.nodataCheck=page.locator(".not-found")
        this.deleteBtn=page.locator("(//button[@title='Delete'])[1]")
        this.show=page.locator("#perPage")
        this.snackbar=page.locator(".top-right")
        this.row=page.locator(".quote-row")
        this.checkNumberColumn=page.locator("(//tr[@class='quote-row']//a)[2]")
        this.row=page.locator("//tr[@class='quote-row']")
        this.checkClientColumn=page.locator("(//tr[@class='quote-row']//td)[5]")

        this.username=page.locator("//input[@id='username']");
        this.password=page.locator("//input[@id='password']");
        this.nextButton=page.locator("//span[text()='Next']//parent::button");
        this.signInButton=page.locator("//span[text()='Sign In']//parent::button");
        this.myQuotes=page.locator("//div[@id='navbarSupportedContent']//a[contains(@href,'quotes')]");
        this.newQuote=page.locator("//span[text()='New Quote']");
    }
    async launchURL(){
        await this.page.goto("https://am-webcp-test.myparadigmcloud.com/");
        await this.username.fill("AMI-AutoInternal@myparadigm.testinator.com");
        await this.nextButton.click();
        await this.password.fill("@miAt0Te$t3049");
        await this.signInButton.click();
        await this.myQuotes.click();
    }
    async searchByNumber(){ 
        await this.select.selectOption({value:data.selectNumberOption})
        await this.search.fill(data.number)
        await expect(this.checkNumberColumn).toHaveText(data.number)
    }
    async searchByInvalidNumber(){
        await this.select.selectOption({value:data.selectNumberOption})
        await this.search.fill(data.invalidNumber)
        expect(this.nodataCheck).toHaveText(data.noDataText)
    }
    async searchByName(){
        await this.select.selectOption({value:data.selectNameOption})
        await this.search.fill(data.name)
        await this.page.waitForTimeout(Number(process.env.smallTimeout))
        const recordsCount=await this.row.count()
        helper.validateTable(this.row,data.name,data.namePosition)
    }
    async searchByInvalidName(){
        await this.select.selectOption({value:data.selectNameOption})
        await this.search.fill(data.invalidName)
        expect(this.nodataCheck).toHaveText(data.noDataText)
    }
    async searchByClient(){
        await this.select.selectOption({value:data.selectClientOption})
        await this.search.fill(data.client)
        await this.page.waitForTimeout(Number(process.env.smallTimeout))
        const recordsCount=await this.row.count()
        helper.validateTable(this.row,data.client,data.clientPosition)  
    }
    async searchByInvalidClient(){
        await this.select.selectOption({value:data.selectClientOption})
        await this.search.fill(data.invalidClient)
        expect(this.nodataCheck).toHaveText(data.noDataText)
    }
    async searchByPONumber(){
        await this.select.selectOption({value:data.selectPONumberOption})
        await this.search.fill(data.PONumber)
        await this.page.waitForTimeout(Number(process.env.smallTimeout))
        const recordsCount=await this.row.count()
        helper.validateTable(this.row,data.PONumber,data.PONumberPosition)
    }
    async searchByInvalidPONumber(){
        await this.select.selectOption({value:data.selectPONumberOption}) 
        await this.search.fill(data.invalidPONumber)
        expect(this.nodataCheck).toHaveText(data.noDataText)
    }
    async pagination(){
        await this.show.selectOption({value:data.paginationValue})
    }
    async newQuoteCreate(){
        await this.newquote.click()
        expect(this.page).toHaveURL(data.newQuoteURL)
    }
    async delete(){
        await this.deleteBtn.click()
        helper.alertHandling(this.page)
        await this.page.waitForTimeout(Number(process.env.smallTimeout))
        expect(this.snackbar).toBeVisible()
        expect(this.snackbar).toHaveText(data.deleteSnackbar)
    }
}