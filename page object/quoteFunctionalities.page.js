const {expect}=require('@playwright/test')
const data=require('../data.json')


exports.QuoteFunctionality=class QuoteFunctionality{
    constructor(page){
        this.page=page
        this.myquote=page.locator("//li[@class='nav-item ms-1 quotes active']")
        this.select=page.locator('#select-addon')
        this.search=page.locator("//input[@class='form-control w-auto']")
        this.show=page.locator("#perPage")
        this.newquote=page.locator("//a[@class='btn btn-success']")
        this.nodata=page.locator(".not-found")
        this.deleteBtn=page.locator("(//button[@title='Delete'])[1]")
        this.show=this.page.locator("#perPage")

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
        // await this.myquote.click()
        await this.myQuotes.click();
    }
    async searchByNumber(){
        
 
        
        // await expect(this.currentPage).toHaveText(data.myQuotes.currentPage);
        // await this.newQuote.click();

        await this.select.selectOption({value:'QuoteNumber'})
        await this.search.fill(data.number)
    }
    async searchByInvalidNumber(){
        await this.select.selectOption({value:'QuoteNumber'})
        await this.search.fill(data.invalidNumber)
        expect(this.nodata).toHaveText("No data found")
    }
    async searchByName(){
        await this.select.selectOption({value:'QuoteName'})
        await this.search.fill(data.name)
    }
    async searchByInvalidName(){
        await this.select.selectOption({value:'QuoteName'})
        await this.search.fill(data.name)
        expect(this.nodata).toHaveText("No data found")
    }
    async searchByClient(){
        await this.select.selectOption({value:'ClientName'})
        await this.search.fill(data.client)
    }
    async searchByInvalidClient(){
        await this.select.selectOption({value:'ClientName'})
        await this.search.fill(data.client)
        expect(this.nodata).toHaveText("No data found")
    }
    async searchByPONumber(){
        await this.select.selectOption({value:'PONumber'})
        await this.search.fill(data.PONumber)
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
        await this.page.on('dialog',async(dialog)=>{
            await dialog.accept()
        })
    }
}