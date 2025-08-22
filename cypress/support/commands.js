Cypress.Commands.add('login', (email, senha) => {
    cy.request({
        method: 'POST',
        url: 'login',
        body:
        {
        "email": email,
        "password": senha
        }
    })
})

Cypress.Commands.add('identidade', (metodo, endpoint) => {
    cy.request({
        method: metodo,
        url: endpoint
    }).then((response) => {
        return response.body.usuarios[response.body.usuarios.length - 1]._id;
    })
})