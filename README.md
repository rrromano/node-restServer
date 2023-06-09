# Node Api - Rest Server

_This is a basic nodeJs API project for raw operations, which allows you to manage users, products and categories._

## Starting 🚀

The following instructions will allow you to get a working copy of the project on your local machine for development and testing purposes.

### Installation 🔧

- Run `npm install` to install all dependencies.
- Run `npm start` to run the app locally.
- You can find the project running on `localhost:8080`.

### Testing ⚙️

- Run `npm test` to execute automated tests.

## Libraries used 🛠️

- Express: To create express server.
- Express-Validator: For handling validations.
- Bcryptjs: To encrypt sensitive information.
- Dotenv: For handling environment variables.
- Google-Auth-Library: For google sign in.
- Jsonwebtoken:  For handling jwt.
- Mongoose: To manage database.

## General considerations 📖

### Routes Api

- GET - /auth/login and /auth/google: For user access, and get the jwt to enable you that can request private endpoints.
- GET - /buscar/:coleccion/:termino: To search anythings in colections that you want.
- GET - /categorias/: To get all categories.
- GET - /categorias/:id/: To get a specific category by id.
- POST - /categorias/: To create a category.
- PUT - /categorias/:id/: To update a category.
- DELETE - /categorias/:id/: To delete a category.
- GET - /productos/: To get all products.
- GET - /productos/:id/: To get a specific product.
- POST - /productos/: To create a product.
- PUT - /productos/:id/: To update a product.
- DELETE - /productos/:id/: To delete a product.
- GET - /usuarios/: To get all users.
- POST - /usuarios/: To create a user.
- PUT - /usuarios/:id/: To update a user.
- DELETE - /usuarios/:id/: To delete a users.

## Author ✒️

 - Romano, Rodrigo Ruben - Information systems engineer.

## Contact 📋

 - [LinkedIn](https://www.linkedin.com/in/rodrigo-ruben-romano/)
 - [Mail](mailto:romano.rodrigo19@gmail.com)
