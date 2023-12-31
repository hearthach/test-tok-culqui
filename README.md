# TEST DE TOQUENIZACIÖN

Breve descripción del proyecto: qué hace, para qué sirve, etc.

### Instalación

Paso a paso de cómo poner en marcha una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas.

- Ejecuta npm install -g typescript


1. Clona el repositorio o Crea Uno
    git clone https://tu-repositorio-aqui.git

2. Instala las dependencias NPM

    Dependencias (Para Producción):
        1. npm install dotenv@^16.3.1
        2. npm install express@^4.18.2
        3. npm install luhn@^2.4.1
        4. npm install mysql2@^3.6.5
        5. npm install validator@^13.11.0

    Dependencias de Desarrollo (Para Desarrollo y Pruebas)
        1. npm install @types/express@^4.17.21 --save-dev
        2. npm install @types/jest@^29.5.10 --save-dev
        3. npm install @types/mysql@^2.15.24 --save-dev
        4. npm install @types/supertest@^2.0.16 --save-dev
        5. npm install @types/validator@^13.11.7 --save-dev
        6. npm install jest@^29.7.0 --save-dev
        7. npm install supertest@^6.3.3 --save-dev
        8. npm install ts-jest@^29.1.1 --save-dev
        9. npm install ts-node@^10.9.1 --save-dev
        10. npm install typescript@^5.3.2 --save-dev

3. Crea un archivo `.env` basado en el ejemplo `.env.example`
    DB_HOST=
    DB_USER=
    DB_PASSWORD=
    DB_NAME=
    ENCRYPTION_KEY=
    PORT=
    VALID_EMAIL_DOMAINS=

4. Ejecuta la aplicación con "npm start"


## Uso Servidor

Configura  package.json :
"start": "ts-node src/server.ts"

Ejecuta el comando:
npm start

## Ejecutando las Pruebas

Configura  package.json para modo pruebas:
"test": "jest"

Para ejecutar en modo pruebas, utilizar el siguiente comeando:

npm jest

## Despliegue

Se debe tener en cuenta la BASE DE DATOS, adjunto el srcipt para MYSQL:

CREATE DATABASE IF NOT EXISTS nombre_de_la_BD;

USE nombre_de_la_BD;

CREATE TABLE IF NOT EXISTS card_tokens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    card_number VARCHAR(255) NOT NULL,
    cvv VARCHAR(255),
    expiration_month VARCHAR(2),
    expiration_year VARCHAR(4),
    cardholder_name VARCHAR(255),
    email VARCHAR(255),
    token VARCHAR(255) UNIQUE NOT NULL,
    iv VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

## Construido Con

Menciona las tecnologías, frameworks y herramientas que utilizaste para tu proyecto.

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MySQL](https://www.mysql.com/)
- [Jest](https://jestjs.io/)

## Licencia

Este proyecto está licenciado bajo la Licencia XYZ - ver el archivo LICENSE.md para detalles.


