

# LoginPage

Node.js, Express, MySQL e Passport.

## Instalação

    git clone https://github.com/Brun0rr/MyLoginPage.git
    cd MyLoginPage
    npm install

### MySQL

Crie uma nova base de dados dentro do MySQL. Ex.:

    mysql> CREATE DATABASE minha_base;

Importe o arquivo de criação das tabelas. Ex.:

    mysql -u root -p minha_base < config/initial_sql.sql

Agora edite o arquivo config/db.js com as suas informações. Ex.:

    var connection = function(){
      return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'mariadb',
        port: 3306,
        database: 'minha_base',
        multipleStatements: true
      });
    };

### Start

Agora basta executar o comando:

    npm start

Acesse pelo navegador o link http://localhost:8080. Crie uma conta usando o botão "Cadastre-se" ou para acesso administrador use "admin@localhost" com senha "admin123"

### Views

O template utilizado nas views foram baixados em https://html5up.net.

## Libraries

+ [Node.js](https://nodejs.org/en/)
+ [Express.js](http://expressjs.com/)
+ [Passport](http://passportjs.org/)
+ [MySQL](https://www.mysql.com/)
+ [bcrypt](https://www.npmjs.com/package/bcryptjs)
