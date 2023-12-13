# App


Gympass style app.


## RFs (Requisitos funcionais) 

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [] Deve ser possivel obter o perfil de um usuario logado;
- [] Deve ser possível obter o numero de reservas realizados pelo usuário logado;
- [] Deve ser possível o Usuario obter seu histórico de reservas;
- [] Deve ser possível o usuario buscar accomodação próximas;
- [] Deve ser possível o usuario buscar accomodação pelo nome;
- [] Deve ser possível o usuario buscar accomodação pelo tipo;
- [] Deve ser possível o usuario realizar reserva em uma accomodação;
- [] Deve ser possivel validar o reserva de um usuario;
- [x] Deve ser possível cadastrar uma acomodação;

## RNs (Regras de negócio)

- [x] O usuario não deve poder se cadastrar com um em e-mail duplicado;
- [] O usuario não pode fazer 2 reserva no mesmo dia;
- [] O usuario não pode fazer check-in se não estiver perto (100m) da acomodação;



## RNFs (Regras de negócios não-funcionais)
- [x] A senha do usuario precisa estar criptografadas;
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [] Todas as Listas de dados precisam estar paginadas com 20 itens por página;
- [] O usuario deve ser identificado por um JWT (JSON WEB TOKEN);

