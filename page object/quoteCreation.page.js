
const { test, expect } = require('@playwright/test');
const data = require("../Data/datafiles.json")
const logIn=require("../data/loginfiles.json")
require('dotenv').config();
exports.SubmitFlow = class SubmitFlow {
  constructor(page) {
    this.page = page;
    this.email=page.locator('input#username');
    this.btnNext=page.locator("//button[@class='btn btn-primary']")
    this.password=page.locator("//input[@id='password']")
    this.btnShow=page.locator("(//button[@class='btn btn-default'])[1]")
    this.btnHide=page.locator('//button[@title="Hide"]')
    this.btnSubmit=page.locator('//button[contains(@class,"btn-primary")]')
    this.btnMyQuotes=page.locator("//a[text()='My Quotes']")
    this.btnNewQuote=page.locator("//a[@id='secondary_navbar__newQuote']")
    this.quoteName=page.locator('//input[@name="QuoteName"]')
    this.projectName=page.locator("//input[@class='wts-react-select__input']")
    this.btnSelectClient=page.locator("(//button[contains(@class,'btn-sm')])[2]")
    this.dropdown=page.locator("(//div[contains(@class,'wts-react-select__indicator')])[2]")
    this.placeHolder=page.locator("//input[@placeholder='Search by client name or number']")
    this.containText=page.locator("//strong[contains(normalize-space(text()), 'WINDOW NATION/ISS -')]")
    this.btnRadioSelect=page.locator("//input[@name='client']")
    this.btnCreate=page.locator("//button[@class='btn btn-primary']")
    this.msgSucess=page.locator('//div[@class="notification--content"]')
    this.quoteId=page.locator('//span[@id="quote-title"]')
    this.drpWindowWorldRep=page.locator("//select[@id='salesrep']")
    this.drpSelectOption=page.locator("//option[@value='0']")
    this.btnSave=page.locator("//button[span[text()='Save']]")
    this.tabLineItems=page.locator("//ul[@id='quote-tabs']//li[@id='quote-tabs_line-items']")
    this.drpNewLineItem=page.locator("//button[span[text()='Toggle Dropdown']]")
    this.btnNewMiscLineItem=page.locator("//ul[@class='dropdown-menu show']//button[@class='dropdown-item']")
    this.descriptionFeild=page.locator("//textarea[@id='Description']")
    this.delaerPriceFeild=page.locator("//input[@name='DealerPrice']")
    this.quantityFeild=page.locator("//input[@name='Quantity']")
    this.btnCreateLine=page.locator("//div[@class='modal-footer']//button[@class='btn btn-primary']")
    this.btnSubmitOrder=page.locator("//button[@id='line-items__submit-quote']")
    this.msgError=page.locator("(//div[@class='rrt-middle-container']//div[@class='rrt-title'])[1]")
    this.btnActions=page.locator("//button[@id='actionsButtonGroup']")
    this.supplyCenterInformationFeild=page.locator("//ul[@class='dropdown-menu show']//button[span[text()='Supply Center Information']]")
    this.btnRadioInstall=page.locator("(//input[@name='Install'])[1]")
    this.txtGivenBy=page.locator("//input[@name='GivenBy']")
    this.txtAuthorizationNumber=page.locator("//input[@name='AuthorizationNumber']")
    this.txtUserInitials=page.locator("//input[@name='Initials']")
    this.txtJobCost=page.locator("//input[@name='JobPack']")
    this.txtMeasureBy=page.locator("//input[@name='MeasureBy']")
    this.txtCashDeposit=page.locator("//input[@name='CashDeposit']")
    this.txtadditionalAmout=page.locator("//input[@name='AdditionalAmount']")
    this.btnRadioIssOrder=page.locator("(//input[@name='ISSOrder'])[1]")
    this.txtCheckDeposit=page.locator("//input[@name='CheckDeposit']")
    this.txtInternalPO=page.locator("//input[@name='InternalPONumber']")
    this.txtPhone=page.locator("//input[@name='Phone']")
    this.btnFinalSave=page.locator("(//button[@type='submit'])[4]")
    



  }
  async navigate() {
    await this.page.goto(logIn.login)
    await this.email.fill(process.env.admin_username);
    await this.page.waitForTimeout(2000)
    await expect(this.email).toHaveValue(process.env.admin_username)
    await this.btnNext.click()
   await this.password.click()
   await this.password.fill(process.env.admin_password)
   await expect(this.password).toHaveValue(process.env.admin_password)
   await expect(this.btnShow).toBeVisible()
   await this.btnShow.click()
   await expect(this.btnHide).toBeVisible();
   await this.btnHide.click()
   await this.btnSubmit.click()
   const currentURl=this.page.url()
   await expect(currentURl).not.toContain(logIn.login)
   await expect(this.btnMyQuotes).toBeVisible()
   await this.btnMyQuotes.click()
   await this.page.waitForTimeout(7000)
   const currentURl1=this.page.url()
   await expect(this.page.url()).toContain(logIn.quotes)   
   await expect(this.btnNewQuote).toBeVisible()

}
async quoteCreation(){
  await this.btnNewQuote.click()
  await expect(this.page.url()).toContain(logIn.create)
  await this.quoteName.click()
  await this.quoteName.fill(process.env.quoteName)
  await this.projectName.fill(process.env.quoteName);
  await this.page.getByText(`Create "${process.env.quoteName}"`, { exact: true }).click();
   await this.btnSelectClient.click()
  await this.placeHolder.click()
  await this.placeHolder.fill(data.clientName)
  await expect(this.containText).toBeVisible()
  await this.btnRadioSelect.click()
  await this.btnCreate.click()
}
async lineITems(){
 
  await this.page.waitForTimeout(2000)
  let quoteNumber=await this.quoteId.innerText()
  await this.page.waitForTimeout(500)
  quoteNumber = quoteNumber.replace('Quote', '').replace(/\s/g, '');
  await expect(this.msgSucess).toHaveText(`Quote ${quoteNumber} added`)
  await this.page.waitForTimeout(2000)
  await this.drpWindowWorldRep.click()
  await this.page.getByLabel('Window World Rep').selectOption('0');
  await this.btnSave.click()
  return quoteNumber
}

async newLineItem(quoteNumber){
  await expect(this.tabLineItems).toBeVisible()
  await this.tabLineItems.click()
  await expect(this.drpNewLineItem).toBeVisible()
  await this.page.waitForTimeout(5000)
  await this.drpNewLineItem.click()
  await this.btnNewMiscLineItem.click()
  await this.descriptionFeild.click()
  await this.descriptionFeild.fill(data.description)
  await this.delaerPriceFeild.click()
  await this.delaerPriceFeild.fill(data.dealerPrice)
  await this.quantityFeild.click()
  await this.quantityFeild.fill(data.quantity)
  await this.btnCreateLine.click()
  await this.btnSubmitOrder.click()
  await expect(this.msgError).toHaveText(data.errorText)
  await this.page.waitForTimeout(5000)
  await this.btnActions.click()
  await this.supplyCenterInformationFeild.click()
  await this.btnRadioInstall.click()
  await this.txtGivenBy.click()
  await this.txtGivenBy.fill(data.givenByText)
  await this.txtAuthorizationNumber.click()
  await this.txtAuthorizationNumber.fill(data.AuthorizationText)
  await this.txtUserInitials.click()
  await this.txtUserInitials.fill(data.userInitials)
  await expect(this.txtJobCost).toBeVisible()
  await this.txtMeasureBy.click()
  await this.txtMeasureBy.fill(data.measureBy)
  await this.txtCashDeposit.click()
  await this.txtCashDeposit.fill(data.cashDeposit)
  await this.txtadditionalAmout.click()
  await this.btnRadioIssOrder.click()
  await this.txtCheckDeposit.click()
  await this.txtCheckDeposit.fill(data.checkDeposit)
  await this.txtInternalPO.click()
  await this.txtInternalPO.fill(data.internalPO)
  await this.txtPhone.click()
  await this.txtPhone.fill(data.phone)
  await expect(this.btnFinalSave).toBeVisible()
  await this.btnFinalSave.click()
  await this.btnSubmitOrder.click()
  await expect(this.msgSucess).toContainText(`${quoteNumber} ordered`)
}
}


