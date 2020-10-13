const { v4: uuid } = require('uuid');
const { SESSIONS } = require('../middlewares/auth');

const userModel = require('../models/userModel');

const loginForm = (req, res) => {
  const { token = '' } = req.cookies || {};

  if (SESSIONS[token]) return res.redirect('/');

  return res.render('admin/login', {
    message: null,
    redirect: req.query.redirect,
  });
};

const login = async (req, res, next) => {
  const { email, password, redirect } = req.body;

  if (!email || !password)
    return res.render('admin/login', {
      message: 'Preencha o email e a senha',
      redirect: null,
    });

  const user = await userModel.findByEmail(email);
  if (!user || user.password !== password)
    return res.render('admin/login', {
      message: 'Email ou senha incorretos',
      redirect: null,
    });

  const token = uuid();
  SESSIONS[token] = user.id;

  res.cookie('token', token, { httpOnly: true, sameSite: true });
  res.redirect(redirect || '/');
};

const logout = (req, res) => {
  res.clearCookie('token');
  if (!req.cookies || !req.cookies.token) return res.redirect('/login');
  res.render('admin/logout');
};

const registerUserForm = (req, res) => res.render('register', {
  message: null,
  redirect: req.query.redirect,
});

const registerUser = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;

  if (userModel.isValid(email, password, confirmPassword, firstName, lastName).length > 0) {
    return res.render('register', {
      message: userModel.isValid(email, password, confirmPassword, firstName, lastName),
    });
  }

  await userModel.insertUser(email, password, firstName, lastName);
  res.render('register', { message: 'Cadastro efetuado com sucesso!' });
};

const editUserForm = async (req, res) => res.render('userEdit', { user: req.user, message: null });

const editUser = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;

  if (userModel.isValid(email, password, confirmPassword, firstName, lastName).length > 0) {
    return res.render('userEdit', {
      message: userModel.isValid(email, password, confirmPassword, firstName, lastName),
    });
  }

  await userModel.editUser(req.user.id, email, password, firstName, lastName);
  return res.redirect('/');
};

module.exports = {
  login,
  loginForm,
  logout,
  registerUserForm,
  registerUser,
  editUserForm,
  editUser,
};
