import { UserCadastro } from "../models/userApi.js";
UserCadastro.renderUser()

const add_post = document.getElementById('btn_add')
const deletar_post = document.querySelector('button')
add_post.addEventListener('click', UserCadastro.criarPost)

UserCadastro.listarPost()


deletar_post.addEventListener('click', e => {
    console.log(e.target)
})