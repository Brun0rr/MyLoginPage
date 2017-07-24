

# LoginPage

A Node.js, Express, MySQL e Passport.

## Installation

    git clone https://github.com/jkup/hammer.git
    cd myproject
    npm install

### MySQL

Crie uma nova base de dados dentro do MySQL. Ex.:

    mysql> CREATE DATABASE minha_base;

Importe o arquivo de criação das tabelas. Ex.:

    mysql -u root -p minha_base < config/initial_sql.sql

Agora edite o arquivo config/database.js com as suas informações. Ex.:

    var connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'SENHA_DA_BASE',
      port: 3306,
      database: 'NOME_DA_BASE',
      multipleStatements: true
    });

### Start

Agora basta executar o comando:

    npm start

Acesse pelo navegador o link http://localhost:8080. Para acesso administrador use "admin@localhost" com senha "admin123"

### Views

O template utilizado nas views foram baixados em https://html5up.net.

## Libraries

+ [Node.js](https://nodejs.org/en/)
+ [Express.js](http://expressjs.com/)
+ [Passport](http://passportjs.org/)
+ [MySQL](https://www.mysql.com/)
+ [bcrypt](https://www.npmjs.com/package/bcryptjs)
