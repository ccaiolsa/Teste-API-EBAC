/// <reference types="cypress" />

describe('Testes da Funcionalidade Usuários', () => {
  let numeroSerie = Math.floor(Math.random() * 1000);
  let id;

  it('Deve validar contrato de usuários', () => {
    cy.login('fulano@qa.com', 'teste').then((response) => {
        expect(response.status).equal(200);
        expect(response.body.message).equal('Login realizado com sucesso');
      })
  });

  it('Deve listar usuários cadastrados', () => {
    cy.request({
      method: 'GET',
      url: 'usuarios'})
      .then((response) => {
        expect(response.status).equal(200);
        expect(response.body).to.have.property('usuarios');})
  });

  it('Deve cadastrar um usuário com sucesso', () => {
    cy.request({
      method: 'POST',
      url: 'usuarios',
      body:
      {
        "nome": `Caio Lucas ${numeroSerie}`,
        "email": `caio-teste${numeroSerie}@qa.com.br`,
        "password": "teste",
        "administrador": "true"}})
        .then((response) => {
          expect(response.status).equal(201);
          expect(response.body.message).equal('Cadastro realizado com sucesso')
        })
  });

  it('Deve validar um usuário com email inválido', () => {
    cy.request({
      method: 'POST',
      url: 'login',
      failOnStatusCode: false,
      body:
      {
        "email": "caio-teste7555@qa.com.br",
        "password": "teste"}})
        .then((response) => {
          expect(response.status).equal(401);
          expect(response.body.message).equal('Email e/ou senha inválidos')
        })
  });

  it('Deve editar um usuário previamente cadastrado', () => {
    cy.identidade('GET', 'usuarios').then((_id) => {
      id = _id;
      cy.request({
        method: 'PUT',
        url: `usuarios/${id}`,
        body:
        {
          "nome": "Caio Lucas Editado",
          "email": "caio-teste75@qa.com.br",
          "password": "teste",
          "administrador": "true"}})
          .then((response) => {
            expect(response.status).equal(200);
          })
    })
    
  });

  it('Deve deletar um usuário previamente cadastrado', () => {
    cy.usuarioTemporario('Sicrano da Silva', 'sicrano@qa.com', 'teste').then((_id) => {
      id =_id;
      cy.request({
        method: 'DELETE',
        url: `usuarios/${id}`})
        .then((response) => {
          expect(response.status).equal(200);
          expect(response.body.message).equal('Registro excluído com sucesso')
      }) 
    })
  });


});
