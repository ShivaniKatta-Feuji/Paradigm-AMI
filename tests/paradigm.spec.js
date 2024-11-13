const { test } = require('@playwright/test')
const indexPage = require('../utils/index.page')

test.describe("Paradigm Test Cases", async () => {

    let quoteCreation;
    test.beforeEach("Launch URL", async ({ page }) => {
        quoteCreation = new indexPage.QuoteCreation(page);
        await quoteCreation.login();
    })

    test("TC-001 Quote Creation.", async ({ page }) => {
        await quoteCreation.clickNewQuote();
        await quoteCreation.validQuoteName();
        await quoteCreation.selectProjectName();
        await quoteCreation.selectClientDropdown();
        await quoteCreation.clickCreate();
        await quoteCreation.deleteQuote();
        await quoteCreation.validateCreateButtonColour();
        await quoteCreation.clickCancel();

    })

})