describe('Pruebas de CRUD para Clubes', () => {
    const baseUrl = 'http://localhost:3000';
  
    it('Creamos un nuevo club', () => {
      cy.visit(baseUrl);
      cy.get('#nombre').type('Club Test');
      cy.get('#titulos').type('3');
      cy.get('#botonInsertarClub').click();

      
      
      cy.contains('Club Test').should('be.visible');
      cy.contains('3').should('be.visible');
    });
  
    it('Editamos un club existente', () => {
      cy.visit(baseUrl);
      cy.contains('tr', 'Club Test').within(() => {
        cy.get('.btn-warning').click();
      });
      cy.get('#editNombre')
      .should('be.visible')
      .click() 
      .invoke('val', '') 
      .type('Club Test Editado');
      cy.get('#editTitulos').clear().type('5');
      
      cy.get('button.btn.btn-primary').contains('Guardar cambios').click();
      cy.contains('Club Test Editado').should('be.visible');
      cy.contains('5').should('be.visible');
      
    });
  
    it('Eliminamos un club', () => {
      cy.visit(baseUrl);
      cy.contains('Club Test Editado').parent().find('.btn-danger').click();
      
      cy.contains('Club Test Editado').should('not.exist');
    });
  });
  