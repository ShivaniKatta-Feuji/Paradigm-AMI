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

    test("search by invalid number",async({page})=>{
        await quoteFunctionality.searchByInvalidNumber()
    })

    test("search by name",async({page})=>{
        await quoteFunctionality.searchByName()
    })

    test("search by invalid name",async({page})=>{
        await quoteFunctionality.searchByInvalidName()
        await page.waitForTimeout(3000)
    })

    test("search by client",async({page})=>{
        await quoteFunctionality.searchByClient()
    })

    test("search by invalid client",async({page})=>{
        await quoteFunctionality.searchByInvalidClient()
        await page.waitForTimeout(3000)
    })

    test("search by PONumber",async({page})=>{
        await quoteFunctionality.searchByPONumber()
        await page.waitForTimeout(3000)
    })

    test("search by invalid PONumber",async({page})=>{
        await quoteFunctionality.searchByInvalidPONumber()
        await page.waitForTimeout(3000)
    })

    test("checking pagination",async({page})=>{
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