import { UserCadastro } from "../models/userApi.js";


const login = document.getElementById('login')


login.addEventListener('click', UserCadastro.loginUser)