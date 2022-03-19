import { UserCadastro } from "../models/userApi.js";

const form = document.querySelector('form')


form.addEventListener('submit', UserCadastro.createUser)