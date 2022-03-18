import { UserCadastro } from "../models/userApi.js";
UserCadastro.listarPost()

const form = document.querySelector('form')
const login = document.getElementById('login')


form.addEventListener('submit', UserCadastro.createUser)

login.addEventListener('click', UserCadastro.loginUser)