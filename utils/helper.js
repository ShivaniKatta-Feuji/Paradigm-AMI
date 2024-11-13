const { expect } = require('@playwright/test');
const { log } = require('console');

function alertHandling(page){
    page.on('dialog',async(dialog)=>{
        await dialog.accept()
    })
}

async function validateTable(rowLocator, text,childPosition) {
    const recordsCount = await rowLocator.count();
    for (let index = 0; index < recordsCount; index++) {
        const value = await rowLocator.nth(index).locator(`td:nth-child(${childPosition})`).textContent();  // Change selector if needed
        expect(value.trim()).toBe(text);
    }
}

module.exports={
    alertHandling,
    validateTable
}