const { test } = require('@playwright/test')
// const indexPage  =require('../index.page')
const {SubmitFlow} =require('../page object/quoteCreation.page')
require('dotenv').config
let submitFlowPage;
    test("Launch URL",async ({page})=>{
        submitFlowPage = new SubmitFlow(page);
        await submitFlowPage.navigate()
        


    })

    test("clicking on new quote",async({page})=>{
        submitFlowPage = new SubmitFlow(page);
        await submitFlowPage.navigate()
        await submitFlowPage.quoteCreation()

    })

    test("Line Items",async({page})=>{
        submitFlowPage = new SubmitFlow(page);
        await submitFlowPage.navigate()
        await submitFlowPage.quoteCreation()
        await submitFlowPage.lineITems()

    })

    test.only("New MiscLineItem",async({page})=>{
        test.setTimeout(240000)
        submitFlowPage = new SubmitFlow(page);
        await submitFlowPage.navigate()
        await submitFlowPage.quoteCreation()
         let quoteNumber= await submitFlowPage.lineITems()
        await submitFlowPage.newLineItem(quoteNumber)
    })
