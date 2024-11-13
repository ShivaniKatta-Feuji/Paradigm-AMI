const {expect}=require('@playwright/test')
const data=require('../data/data.json')
const helper=require("../utils/helper")


exports.QuoteFunctionality=class QuoteFunctionality{
    constructor(page){
        this.page=page
        this.myquote=page.locator("//li[@class='nav-item ms-1 quotes active']")
        this.select=page.locator("#select-addon")
        this.search=page.locator("//input[@class='form-control w-auto']")
        this.show=page.locator("#perPage")
        this.newquote=page.locator("//a[@class='btn btn-success']")
        this.nodata=page.locator(".not-found")
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
        await this.select.selectOption({value:'QuoteNumber'})
        await this.search.fill(data.number)
        await expect(this.checkNumberColumn).toHaveText(data.number)
    }
    async searchByInvalidNumber(){
        await this.select.selectOption({value:'QuoteNumber'})
        await this.search.fill(data.invalidNumber)
        expect(this.nodata).toHaveText("No data found")
    }
    async searchByName(){
        await this.select.selectOption({value:'QuoteName'})
        await this.search.fill(data.name)
        await this.page.waitForTimeout(data.smalltimeout)
        const recordsCount=await this.row.count()
        for (let index = 0; index < recordsCount; index++) {
            const nameColumn=await this.row.nth(index).locator('td:nth-child(4)').textContent()
            expect(nameColumn.trim()).toBe(data.name);
        }
    }
    async searchByInvalidName(){
        await this.select.selectOption({value:'QuoteName'})
        await this.search.fill(data.invalidName)
        expect(this.nodata).toHaveText("No data found")
    }
    async searchByClient(){
        await this.select.selectOption({value:'ClientName'})
        await this.search.fill(data.client)
        await this.page.waitForTimeout(data.smalltimeout)
        const recordsCount=await this.row.count()
        for (let index = 0; index < recordsCount; index++) {
            const clientColumn=await this.row.nth(index).locator('td:nth-child(5)').textContent()
            expect(clientColumn.trim()).toBe(data.client);
        }
        
    }
    async searchByInvalidClient(){
        await this.select.selectOption({value:'ClientName'})
        await this.search.fill(data.invalidClient)
        expect(this.nodata).toHaveText("No data found")
    }
    async searchByPONumber(){
        await this.select.selectOption({value:'PONumber'})
        await this.search.fill(data.PONumber)
        await this.page.waitForTimeout(data.smalltimeout)
        const recordsCount=await this.row.count()
        for (let index = 0; index < recordsCount; index++) {
            const poNumber=await this.row.nth(index).locator('td:nth-child(7)').textContent()
            expect(poNumber.trim()).toBe(data.PONumber);
        }
    }
    async searchByInvalidPONumber(){
        await this.select.selectOption({value:'PONumber'}) 
        await this.search.fill(data.invalidPONumber)
        expect(this.nodata).toHaveText("No data found")
    }
    async pagination(){
        await this.show.selectOption({value:'25'})
    }
    async newQuoteCreate(){
        await this.newquote.click()
        expect(this.page).toHaveURL("https://am-webcp-test.myparadigmcloud.com/quotes/create")
    }
    async delete(){
        await this.deleteBtn.click()
        helper.alertHandling(this.page)
        await this.page.waitForTimeout(data.smalltimeout)
        expect(this.snackbar).toBeVisible()
        expect(this.snackbar).toHaveText("Quote deleted✕")
    }
}