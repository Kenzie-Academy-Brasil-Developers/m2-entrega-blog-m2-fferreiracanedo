export class UserCadastro {
  static async createUser(e) {
    e.preventDefault()

    const endPointCadastro = 'https://api-blog-m2.herokuapp.com/user/register'

    //variaves de dados do formulário

    const nome = document.getElementById('nome').value
    const email = document.getElementById('email').value
    const url_img = document.getElementById('link_perfil').value
    const password = document.getElementById('password').value

    let body_cadastro = {
      username: nome,
      email: email,
      avatarUrl: url_img,
      password: password
    }
    const body_ok = JSON.stringify(body_cadastro)

    await fetch(endPointCadastro, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: body_ok
    })
      .then(response => {
        if (response.status === 201) {
          UserCadastro.createUser()
          window.location.href = '/pages/login.html'
        }
      })
      .catch(err => console.error(err))
  }

  static async loginUser(e) {
    e.preventDefault()
    const email_login = document.getElementById('email').value
    const password_login = document.getElementById('password').value

    const endPointLogin = 'https://api-blog-m2.herokuapp.com/user/login'

    let body_login = {
      email: email_login,
      password: password_login
    }

    await fetch(endPointLogin, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body_login)
    })
      .then(res => res.json())
      .then(data => {
        localStorage.setItem('blog:token', data.token)
        localStorage.setItem('blog:UserId', data.userId)

        if (data.token) {
          window.location.href = '/pages/paginaUser.html'
        } else {
          window.alert(
            'erro nas credenciais, por favor verificar os dados corretamente'
          )
        }
      })
  }

  static async listarPost() {
    await fetch(
      `https://api-blog-m2.herokuapp.com/post?${localStorage.getItem(
        'blog:UserId'
      )}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('blog:token')}`
        }
      }
    )
      .then(response => response.json())
      .then(body => {
        body.data.forEach(({ id, post, createdAt, owner }) => {
          const text_post = document.getElementById('text-post')
          const input_btn = document.getElementById('edit_text')
          const post_user = document.createElement('div')
          const date_text = document.createElement('p')
          const btn_del = document.createElement('button')
          const btn_edit = document.createElement('button')
          const divBtn = document.createElement('div')
          post_user.classList.add('class-post')

          date_text.innerText = createdAt
          btn_del.innerText = 'Deletar'
          btn_edit.innerText = 'Editar'

          post_user.style.height = '180px'
          post_user.style.width = '601px'

          post_user.innerHTML = `<img class="img-post" src="${owner.avatarUrl}"></img><div class="div-text"><h1>${owner.username}</h1><p>${post}</p></div>
                    `
          divBtn.classList.add('btn_div')
          btn_edit.classList.add('btn_user')
          btn_del.classList.add('btn_user')

          divBtn.appendChild(btn_del)
          divBtn.appendChild(btn_edit)
          post_user.appendChild(divBtn)
          divBtn.appendChild(date_text)
          text_post.appendChild(post_user)

          if (owner.id === localStorage.getItem('blog:UserId')) {
            btn_edit.classList.remove('btn_user')
            btn_del.classList.remove('btn_user')

            btn_edit.style.color = '#6495ED'
            btn_del.style.color = '#ED6464'

            btn_del.addEventListener('click', e => {
              this.deletePost(id)
            })

            btn_edit.addEventListener('click', e => {
              const modal = document.getElementById('dv-modal')
              modal.classList.remove('btn_user')
            })

            input_btn.addEventListener('click', e => {
              const modal = document.getElementById('dv-modal')

              this.editarPost(id)
              modal.classList.add('btn_user')


              window.alert('Post Editado com sucesso!')

              window.location.reload(true)
            })
          }
        })
      })
  }

  static criarPost() {
    const btn_post_add = document.getElementById('btn_add')
    const text_post = document.getElementById('txt-post')
    const texto_input = document.getElementById('txt-post').value
    const token = localStorage.getItem('blog:token')
    const formatted_Token = `Bearer ${token}`

    UserCadastro.listarPost()

    let body_text = {
      content: texto_input
    }

    const bodyJson = JSON.stringify(body_text)

    fetch(`https://api-blog-m2.herokuapp.com/post`, {
      method: 'POST',
      headers: {
        Authorization: formatted_Token,
        'Content-type': 'application/json'
      },
      body: bodyJson
    })
      .then(res => res.json())
      .then(data => {
        let id_post = data.owner

        fetch(`https://api-blog-m2.herokuapp.com/post/?${id_post}`, {
          method: 'GET',
          headers: {
            Authorization: formatted_Token,
            'Content-type': 'application/json'
          }
        }).then(res => res.json())
      })

      .catch(err => console.error(err))

    btn_post_add.addEventListener('click', e => {
      location.reload(true)
    })
    window.alert('POST CRIADO COM SUCESSO!')

    window.location.reload()
  }

  static deletePost(id) {
    const token = localStorage.getItem('blog:token')

    const formatted_Token = `Bearer ${token}`

    fetch(`https://api-blog-m2.herokuapp.com/post/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: formatted_Token
      }
    })
      .then(response => {
        if (response.status === 204) {
          window.alert('Post Deletado com Sucesso!')

          document.location.reload()
        }
      })
      .catch(err => console.error(err))
  }
  static async editarPost(id) {
    const buttonInput = document.getElementById('edit-input').value
    console.log(buttonInput)

    const token = localStorage.getItem('blog:token')

    const formatted_Token = `Bearer ${token}`

    const texto = {
      newContent: buttonInput
    }

    await fetch(`https://api-blog-m2.herokuapp.com/post/${id}`, {
      method: 'PATCH',
      headers: {
        Authorization: formatted_Token,
        'Content-type': 'application/json'
      },
      body: JSON.stringify(texto)
    })
  }

  static renderUser() {
    const userId = localStorage.getItem('blog:UserId')
    const token = localStorage.getItem('blog:token')
    const formatted_Token = `Bearer ${token}`

    fetch(`https://api-blog-m2.herokuapp.com/user/${userId}`, {
      method: 'GET',
      headers: {
        Authorization: formatted_Token
      }
    })
      .then(res => res.json())
      .then(data => {
        const avatarName = document.getElementById('name-user')
        avatarName.innerHTML = `<h1 class="avatar-position">${data.username}<h1>`

        const img = document.createElement('img')
        img.classList.add('avatar')
        img.src = data.avatarUrl

        avatarName.appendChild(img)
      })
  }

  static logOutUser(e) {
    localStorage.removeItem('blog:token')
    localStorage.removeItem('blog:UserId')

    window.alert('LogOut Efetuado com sucesso!')
  }
}
