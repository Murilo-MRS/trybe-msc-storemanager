# Projeto StoreManager API

Projeto realizado durante módulo de Back-end do curso de desenvolvimento web da Trybe.

<details>
  <summary><strong>O que foi feito</strong></summary></br>

  Neste projeto desenvolvi uma API utilizando a arquitetura MSC (model-service-controller).
  
  A API construída é um sistema de gerenciamento de vendas no formato dropshipping em que será possível criar, visualizar, deletar e atualizar produtos e vendas.

</details>
<details>
  <summary><strong>Como rodar o projeto</strong></summary></br>

  **:warning: Antes de começar, seu docker-compose precisa estar na versão 1.29 ou superior. [Veja aqui](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-20-04-pt) ou [na documentação](https://docs.docker.com/compose/install/) como instalá-lo. No primeiro artigo, você pode substituir onde está com `1.26.0` por `1.29.2`.**

- [ ] `docker-compose up -d`
- [ ] `docker exec -it store_manager bash`
- [ ] `npm install`
- [ ] `npm run migration && npm run seed`
- [ ] `npm run debug`

</details>

<details>
  <summary><strong>:memo: Tecnologias utilizadas</strong></summary><br />
  
  - Docker , docker-compose;
  - Mysql;
  - Mocha, Nyc;
  - Express;

</details>
<details>
  <summary><strong>:memo: Habilidades</strong></summary><br />
  
  - Aplicar a arquitetura baseada em camadas em um código de exemplo;
  - Criar testes de unidade para componentes de software da camada `Model, Service, Controller`;
  - Identificar os componentes de software pertencentes as camada `Model, Service, Controller`.
  - Desenvolver middlewares responsáveis pela validação dos dados de entrada; 

</details>

</details>
<details>
  <summary><strong>Para rodar o projeto</strong></summary></br>

  - Clone o projeto desse repositório para sua máquina;
  - Execute ```npm install```;
  - Execute ```npm start``` rodar a aplicação;
  - Execute ```npm test``` testar a aplicação;
  
</details>
<details>
  <summary><strong>Devs responsáveis</strong></summary>

  - [@Murilo-MRS](https://github.com/Murilo-MRS)

</details>
<!-- Olá, Tryber!
Esse é apenas um arquivo inicial para o README do seu projeto.
É essencial que você preencha esse documento por conta própria, ok?
Não deixe de usar nossas dicas de escrita de README de projetos, e deixe sua criatividade brilhar!
:warning: IMPORTANTE: você precisa deixar nítido:
- quais arquivos/pastas foram desenvolvidos por você; 
- quais arquivos/pastas foram desenvolvidos por outra pessoa estudante;
- quais arquivos/pastas foram desenvolvidos pela Trybe.
-->