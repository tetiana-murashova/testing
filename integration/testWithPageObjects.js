import {navigateTo} from "../support/page_objects/navigatioPage";
import {onFormLayoutsPage} from "../support/page_objects/formLayoutPage";
import {onDatePickerPage} from "../support/page_objects/datepickerPage";

describe('Test with Page Objects', () => {
  beforeEach('open application', () => {
    cy.visit('/')
  })

  it('verify navigations across the pages', () => {
    navigateTo.formLayoutPage()
    navigateTo.datepickerPage()
    navigateTo.smartTablePage()
    navigateTo.toasterPage()
    navigateTo.tooltipPage()
  })

  it.only('should submit Inline and Basic form and select tommorrow date in the calendar', () => {
    navigateTo.formLayoutPage()
    onFormLayoutsPage.submitInlineFormWithNameAndEmail('tania', 'tania@test.com')
    onFormLayoutsPage.submitBasicFormWithEmailAndPassword('aaa@aa.com','aws')
    navigateTo.datepickerPage()
    onDatePickerPage.selectCommonDatePickerFromToday(1)
    onDatePickerPage.selectDatePickerWithRangeFromToday(7, 14)

  })

})

