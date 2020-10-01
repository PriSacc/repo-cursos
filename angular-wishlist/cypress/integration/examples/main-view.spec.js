//CYPRESS es para pruebas funcionales, por ejemplo botones

describe('ventana principal', () => {
  it('tiene encabezado correcto y en español por defecto', () => {
    cy.visit('http://localhost:4200'); //va acá
    cy.contains('Angular Wishlist'); //busca el texto en toda la pagina
    cy.get('h1 b').should('contain', 'HOLA es'); //busca el texto dentro de un tag b dentro de un h1
  });
});