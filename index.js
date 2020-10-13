const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const middlewares = require('./middlewares');
const controllers = require('./controllers');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', middlewares.auth(false), controllers.recipesController.listRecipes);

app.get('/admin', middlewares.auth(true), (req, res) => {
  return res.render('admin/home', { user: req.user });
});

app.post('/recipes', middlewares.auth(true), controllers.recipesController.recipeCreate);
app.get('/recipes/new', middlewares.auth(true), controllers.recipesController.recipeNew);
app.get('/recipes/search', middlewares.auth(false), controllers.recipesController.recipeSearch);
app.get('/recipes/:id', middlewares.auth(false), controllers.recipesController.recipeDetails);
app.post('/recipes/:id', middlewares.auth(true), controllers.recipesController.recipeEdit);
app.get('/recipes/:id/edit', middlewares.auth(true), controllers.recipesController.recipeEditForm);
app.get('/recipes/:id/delete', middlewares.auth(true), controllers.recipesController.recipeDeleteForm);
app.post('/recipes/:id/delete', middlewares.auth(true), controllers.recipesController.recipeDelete);
app.get('/me/recipes', middlewares.auth(true), controllers.recipesController.myRecipes);

app.get('/login', controllers.userController.loginForm);
app.get('/logout', controllers.userController.logout);
app.post('/login', controllers.userController.login);
app.get('/register', controllers.userController.registerUserForm);
app.post('/register', controllers.userController.registerUser);

app.listen(3000, () => console.log('Listening on 3000'));
