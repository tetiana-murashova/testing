function selectDayFromCurrent(day) {
  let date = new Date()
  date.setDate(date.getDate() + day)
  let futureDay = date.getDate()
  let futureMonth = date.toLocaleString('default', {month: 'short'})
  let dateAssert = futureMonth + ' ' + futureDay + ', ' + date.getFullYear()

  cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then( dateAttr => {
    if(!dateAttr.includes(futureMonth)){

      cy.get('[data-name="chevron-right"]').click()
      selectDayFromCurrent(day)

    } else {
      cy.get('.day-cell').not('.bounding-month').contains(futureDay).click()
    }
  })
  return dateAssert
}

class datepickerPage {
  selectCommonDatePickerFromToday(dayFromToday) {

    cy.contains('nb-card', 'Common Datepicker').find('input').then(input => {
      cy.wrap(input).click()
      let dateAssert = selectDayFromCurrent(dayFromToday)
      cy.wrap(input).invoke('prop', 'value').should('contain', dateAssert)
      cy.wrap(input).should('have.value', dateAssert)
    })

  }
  selectDatePickerWithRangeFromToday(firstDay, secondDay) {
    cy.contains('nb-card', 'Datepicker With Range').find('input').then(input => {
      cy.wrap(input).click()
      let dateAssertFirst = selectDayFromCurrent(firstDay)
      let dateAssertSecond = selectDayFromCurrent(secondDay)
      let finalDay = dateAssertFirst + ' - ' + dateAssertSecond
      cy.wrap(input).invoke('prop', 'value').should('contain', finalDay)
      cy.wrap(input).should('have.value', finalDay)
    })
  }
}

export const onDatePickerPage = new datepickerPage()
