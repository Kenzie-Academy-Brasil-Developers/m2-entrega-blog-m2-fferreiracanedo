import { UserCadastro } from '../models/userApi.js'
UserCadastro.renderUser()

const add_post = document.getElementById('btn_add')
const deletar_post = document.querySelector('button')
const logoutUser = document.getElementById('logout_user')
add_post.addEventListener('click', UserCadastro.criarPost)

UserCadastro.listarPost()

logoutUser.addEventListener('click', e => {
  UserCadastro.logOutUser()

  window.location.href = '/index.html'
})
