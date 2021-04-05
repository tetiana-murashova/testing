
export class SmartTable {

  updateAgeByFirstName(name, age) {
    cy.get('tbody').contains('tr', name).then( tableRow => {
      cy.wrap(tableRow).find('.nb-edit').click()
      cy.wrap(tableRow).find('[placeholder="Age"]').clear().type(age)
      cy.wrap(tableRow).find('.nb-checkmark').click()
      cy.wrap(tableRow).find('td').eq(6).should('contain', age)
    })
  }

  addNewRecordWithFirstAndLastName(firstName, lastName) {

  }
}

export const onSmartTablePage = new SmartTable()
