const { test } = require('@playwright/test')
const { indexPage } = require('../index.page')




test.describe("Paradigm Test Cases",async()=>{
    let quoteCreation;
    test.beforeEach("Launch URL",async ({page})=>{
        quoteCreation = new indexPage.QuoteCreation(page);
        await quoteCreation.login();
    })
    test("TC-001 Click on the 'New Quote' button.",async({page})=>{
        await quoteCreation.clickNewQuote();
    })
    test("TC-002 Check 'Create' button state before selecting a client.",async ({page})=>{
        await quoteCreation.checkCreateStateBefore();
    })
    test("TC-003 Enter a valid Quote Name.",async ({page})=>{
        await quoteCreation.validQuoteName();
    })
    test.skip("TC-004 Create or Select a Project Name.",async ({page})=>{
        await quoteCreation.selectProjectName();
    })
    test("TC-005 Select a client from the 'Select a Client' dropdown.",async ({page})=>{
        await quoteCreation.selectClientDropdown();
    })
    test("TC-006 Click the 'Create' button after all fields filled out.",async ({page})=>{
        await quoteCreation.clickCreate();
    })
    test("TC-007 Click the 'Cancel' button.",async ({page})=>{
        await quoteCreation.clickCancel();
    })
    test("TC-008 Delete the quote.",async({page})=>{
        await quoteCreation.deleteQuote();
    })
})