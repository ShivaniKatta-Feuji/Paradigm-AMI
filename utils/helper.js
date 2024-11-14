const { expect } = require('@playwright/test')
function  verifyErrorMessage(messageLocator,errorMessage) {
    expect(messageLocator).toBeVisible();
    expect(messageLocator).toHaveText(errorMessage);
}

module.exports={
    verifyErrorMessage
}