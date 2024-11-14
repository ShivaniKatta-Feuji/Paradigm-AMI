const { test } = require('@playwright/test')
const { indexPage } = require('../utils/index.page')
require('dotenv').config


test.describe("Paradigm Test Cases", async () => {
    let quoteFunctionality;
    test.beforeEach("Launch URL", async ({ page }) => {
        quoteFunctionality = new indexPage.QuoteFunctionality(page)
        await quoteFunctionality.launchURL()
    })
    test("TC-002 my quote page functionalities",async({page})=>{
        await quoteFunctionality.pagination()
        await quoteFunctionality.delete()
        await quoteFunctionality.searchByNumber()
        await quoteFunctionality.searchByInvalidNumber()
        await quoteFunctionality.searchByName()
        await quoteFunctionality.searchByInvalidName()
        await quoteFunctionality.searchByClient()
        await quoteFunctionality.searchByInvalidClient()
        await quoteFunctionality.searchByInvalidPONumber()
        await quoteFunctionality.searchByPONumber()
        await quoteFunctionality.newQuoteCreate()
    })

    
})