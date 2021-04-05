
///  <reference types="cypress" />

describe('our first suite', function () {

  it('third test', function () {
    cy.visit('./')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()


    //by Tag name
      cy.get('input')

    //by Id
    cy.get('#inputEmail')

    //by Class name
    cy.get('.input-full-width')

    //by Attribyte name
    cy.get('[placeholder]')

    //by Attribute name and value
    cy.get('[placeholder="Email"]')

    //by class value
    cy.get('[class="input-full-width size-medium shape-rectangle"]')

    //by tag name and Attribute with value
    cy.get('input[placeholder="Email"]')

    //by two different attributes
    cy.get('[placeholder="Email"][type="email"]')

    //by tag name Attribute with value, ID and class name
    cy.get('input[placeholder="Email"]#inputEmail.input-full-width')

    //The most recommended way by Cypress
    cy.get('[data-cy="imputEmail1"]')

  });

  it('second test', () => {
  cy.visit('./')
  cy.contains('Forms').click()
  cy.contains('Form Layouts').click()

  cy.get('[data-cy="SignInButton"]')

  cy.contains('Sign in')

  cy.contains('[status="warning"]','Sign in')

  cy.get('#inputEmail3')
    .parents('form')
    .find('button')
    .should('contain', 'Sign in')
    .parents('form')
    .find('nb-checkbox')
    .click()

  cy.contains('nb-card', 'Horizontal form')
    .find('[type="email"]')


})

  it('then and wrap methods', () => {
    cy.visit('./')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()

    // cy.contains('nb-card', 'Using the Grid')
    //   .find('[for="inputEmail1"]')
    //   .should('contain', 'Email')
    //
    // cy.contains('nb-card', 'Using the Grid')
    //   .find('[for="inputPassword2"]')
    //   .should('contain', 'Password')
    //
    // cy.contains('nb-card', 'Basic form')
    //   .find('[for="exampleInputEmail1"]')
    //   .should('contain', 'Email')
    //
    // cy.contains('nb-card', 'Basic form')
    //   .find('[for="exampleInputPassword1"]')
    //   .should('contain', 'Password')

    cy.contains('nb-card', 'Using the Grid').then( firstForm => {
      const emailLabelFirst = firstForm.find('[for="inputEmail1"]').text()
      const passwordLabelFirst = firstForm.find('[for="inputPassword2"]').text()

      expect(emailLabelFirst).to.equal('Email')
      expect(passwordLabelFirst).to.equal('Password')



      cy.contains('nb-card', 'Basic form').then( secondform => {
        // const passwordLabelSecond = secondform.find('[for="exampleInputPassword1"]').text()
        // expect(passwordLabelSecond).to.equal(passwordLabelFirst)

        cy.wrap(secondform).find('[for="exampleInputPassword1"]')
          .should('contain', 'Password')
      })
    })

  })

  it.only('invoke command', () => {
    cy.visit('./')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()

    cy.get('[for="exampleInputEmail1"]')
      .should('contain', 'Email address')
      .should('have.class', 'label')
      .and('have.text', 'Email address')

    cy.get('[for="exampleInputEmail1"]').then( lable => {
      expect(lable.text()).to.equal('Email address')
      expect(lable).to.have.class('label')
      expect(lable).to.have.text('Email address')
    } )

    cy.get('[for="exampleInputEmail1"]').invoke('text').then( text => {
      expect(text).to.equal('Email address')
    })

    cy.contains('nb-card', 'Basic form')
      .find('nb-checkbox')
      .click()
      .find('.custom-checkbox')
      .invoke('attr', 'class')
      .should('contain', 'checked')
    } )

  it('assert property', () => {
    cy.visit('./')
    cy.contains('Forms').click()
    cy.contains('Datepicker').click()

    cy.contains('nb-card', 'Common Datepicker')
      .find('input').then( input => {
        cy.wrap(input).click()


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
            cy.get('nb-datepicker-container [class="day-cell ng-star-inserted"]').contains(futureDay).click()
          }
        })
        return dateAssert
      }
      let dateAssert = selectDayFromCurrent(5)

       cy.wrap(input).invoke( 'prop', 'value').should('contain', dateAssert)
      cy.wrap(input).should('have.value', dateAssert)
    })
  })


  it('radio button', () => {
    cy.visit('./')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()

    cy.contains('nb-card', 'Using the Grid')
      .find('[type="radio"]').then( radioButtons => {
        cy.wrap(radioButtons)
          .first()
          .check({force: true})
          .should('be.checked')

      cy.wrap(radioButtons)
        .eq(1)
        .check({force: true})

      cy.wrap(radioButtons)
        .first()
        .should('not.be.checked')

      cy.wrap(radioButtons)
        .eq(2)
        .should('be.disabled')

    })

  })

  it('check boxes', () => {
    cy.visit('./')
    cy.contains('Modal & Overlays').click()
    cy.contains('Toastr').click()

    cy.get('[type="checkbox"]').check({force: true})
  })

  it('list and dropdowns', () => {
    cy.visit('./')

    // 1
    // cy.get('nav nb-select').click()
    // cy.get('.options-list').contains('Dark').click()
    // cy.get('nav nb-select').should("contain", "Dark")
    // cy.get('nb-layout-header nav').should('have.css', 'background-color', 'rgb(34, 43, 69)')

    // 2
    cy.get('nav nb-select').then(dropdown => {
      cy.wrap(dropdown).click()
      const colors = {
        Light: 'rgb(255, 255, 255)',
        Dark: 'rgb(34, 43, 69)',
        Cosmic: 'rgb(50, 50, 89)',
        Corporate: 'rgb(255, 255, 255)'
      }
      cy.get('.options-list nb-option').each((listItem, index) => {
        const itemText = listItem.text().trim()
        cy.wrap(listItem).click()
        cy.wrap(dropdown).should('contain', itemText)
        cy.get('nb-layout-header nav').should('have.css', 'background-color', colors[itemText])
       if(index < 3) {
         cy.wrap(dropdown).click()
       }

      })
    })

  })

  it('web tables', () => {
    cy.visit('./')
    cy.contains('Tables & Data').click()
    cy.contains('Smart Table').click()

    //1
    cy.get('tbody').contains('tr', 'Larry').then( tableRow => {
      cy.wrap(tableRow).find('.nb-edit').click()
      cy.wrap(tableRow).find('[placeholder="Age"]').clear().type('25')
      cy.wrap(tableRow).find('.nb-checkmark').click()
      cy.wrap(tableRow).find('td').eq(6).should('contain', '25')
    })

    //2
    cy.get('thead').find('.nb-plus').click()
    cy.get('thead').find('tr').eq(2).then( tableRow => {
      cy.wrap(tableRow).find('[placeholder="First Name"]').type('Tania')
      cy.wrap(tableRow).find('[placeholder="Last Name"]').type('Murashova')
      cy.wrap(tableRow).find('.nb-checkmark').click()
    })

    cy.get('tbody tr').eq(0).find('td').then( tableColumns => {
      cy.wrap(tableColumns).eq(2).should('contain', 'Tania')
      cy.wrap(tableColumns).eq(3).should('contain', 'Murashova')
    })

    //3
    const age = [20, 30, 40, 200]

    cy.wrap(age).each( age => {
      cy.get('thead [placeholder="Age"]').clear().type(age)
      cy.wait(500)
      cy.get('tbody tr').each( tableRows => {
        if(age === 200) {
          cy.wrap(tableRows).should('contain', 'No data found')
        } else {
        cy.wrap(tableRows).find('td').eq(6).should('contain', age)
        }
      })
    })

  })

  it('tooltip', () => {
    cy.visit('./')
    cy.contains('Modal & Overlays').click()
    cy.contains('Tooltip').click()

    cy.contains('nb-card', 'Colored Tooltips')
      .contains('Default').click()
    cy.get('nb-tooltip').should('contain', 'This is a tooltip')

  })

  it('dialog box', () => {
    cy.visit('./')
    cy.contains('Tables & Data').click()
    cy.contains('Smart Table').click()

    //1
    cy.get('tbody tr').first().find('.nb-trash').click()
    cy.on('window:confirm', confirm => {
      expect(confirm).to.equal('Are you sure you want to delete?')
    })

    //2
    const stub = cy.stub()
    cy.on('window:confirm', stub)
    cy.get('tbody tr').first().find('.nb-trash').click().then( () => {
      expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?')
    })
  })
  })


