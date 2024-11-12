const { test } = require('@playwright/test')
const { indexPage } = require('../index.page')
require('dotenv').config


test.describe("Paradigm Test Cases", async () => {
    let quoteFunctionality;
    test.beforeEach("Launch URL", async ({ page }) => {
        quoteFunctionality = new indexPage.QuoteFunctionality(page)
        await quoteFunctionality.launchURL()
    })
    test("search by number",async({page})=>{
        await quoteFunctionality.searchByNumber()
    })

    test("search by name",async({page})=>{
        await quoteFunctionality.searchByName()
    })

    test("search by client",async({page})=>{
        await quoteFunctionality.searchByClient()
    })

    test("search by PONumber",async({page})=>{
        await quoteFunctionality.searchByPONumber()
        await page.waitForTimeout(3000)
    })

    test.only("checking pagination",async({page})=>{
        await quoteFunctionality.pagination()
        await page.waitForTimeout(3000)
    })

    test("deleting record",async({page})=>{
        await quoteFunctionality.delete()
        await page.waitForTimeout(3000)
    })

    test("checking new quote creation page",async({page})=>{
        await quoteFunctionality.newQuoteCreate()
        await page.waitForTimeout(3000)
    })
})