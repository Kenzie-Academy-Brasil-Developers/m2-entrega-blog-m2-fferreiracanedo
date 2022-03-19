export class UserCadastro {



    static async createUser(e) {
        e.preventDefault()

        const endPointCadastro = "https://api-blog-m2.herokuapp.com/user/register"

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

        await fetch(endPointCadastro, {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json"


            },
            "body": JSON.stringify(body_cadastro),

        }).then(response => console.log(response)).catch(err => console.error(err));
    }

    static async loginUser(e) {
        e.preventDefault()
        const email_login = document.getElementById('email').value
        const password_login = document.getElementById('password').value



        const endPointLogin = "https://api-blog-m2.herokuapp.com/user/login"

        let body_login = {
            email: email_login,
            password: password_login
        }

        await fetch(endPointLogin, {
                "method": "POST",
                "headers": {
                    "Content-Type": "application/json"
                },
                "body": JSON.stringify(body_login)
            })
            .then(res => res.json())
            .then(data => {
                localStorage.setItem("blog:token", data.token)
                localStorage.setItem("blog:UserId", data.userId)

                if (data.token) {
                    window.location.href = "/pages/paginaUser.html"
                } else {
                    window.alert('erro nas credenciais, por favor verificar os dados corretamente')
                }



            })


        // console.log(token)
        // .catch(err =>);

    }

    static async listarPost() {


        await fetch(`https://api-blog-m2.herokuapp.com/post?${localStorage.getItem("blog:UserId")}`, {
            "method": "GET",
            "headers": {
                "Authorization": `Bearer ${localStorage.getItem("blog:token")}`
            }

        })




        .then(response => response.json())
            .then(body => {
                body.data.forEach(({ id, post, createdAt, owner }) => {
                    const imagem_post = document.getElementById('image-post')
                    const text_post = document.getElementById('text-post')

                    // console.log(id)







                    const post_user = document.createElement('div')
                    const post_user_img = document.createElement('img')
                    const post_owner = document.createElement('p')

                    // t = document.getElementById('teste')






                    post_user_img.src = owner.avatarUrl
                    post_user_img.width = "100"
                    post_user_img.height = "100"
                    post_user.classList.add('class-post')

                    post_user.innerHTML = `<span>${createdAt}</span>
                    <p>${post}</p>
                    <p>${owner.username}</p>
                    `





                    const teste = document.getElementById('post-ind')
                        // console.log(teste)
                    if (owner.id === localStorage.getItem("blog:UserId")) {

                        // const text_post = document.getElementById('text-post')
                        const btn_del = document.createElement('button')
                        const btn_edit = document.createElement('button')
                        btn_del.innerText = 'Deletar'
                        btn_edit.innerText = 'Editar'

                        btn_del.addEventListener('click', e => {
                            this.deletePost(id)
                        })

                        btn_edit.addEventListener('click', e => {

                            this.editarPost(id)
                        })


                        post_user.appendChild(btn_del)
                        post_user.appendChild(btn_edit)


                    }

                    // imagem_post.appendChild(post_user_img)
                    text_post.appendChild(post_user)
                    post_user.appendChild(post_user_img)


                    if (owner.id === localStorage.getItem("blog:UserId")) {
                        // console.log(id)


                        // const teste = document.getElementById('post-ind').innerText
                        // console.log(teste)


                    }



                })

            })



    }

    static async criarPost() {

        window.alert('POST CRIADO COM SUCESSO!')




        const text_post = document.getElementById('txt-post')


        UserCadastro.listarPost()
        text_post.innerText = ""

        const texto_input = document.getElementById('txt-post').value


        let body_text = {
            content: texto_input
        }
        const bodyJson = JSON.stringify(body_text)

        const token = localStorage.getItem("blog:token")

        const formatted_Token = `Bearer ${token}`





        const dados = await fetch(`https://api-blog-m2.herokuapp.com/post`, {
            "method": "POST",
            "headers": {
                "Authorization": formatted_Token,
                "Content-type": "application/json"
            },
            body:

                bodyJson
        })

        .then(res => res.json())
            .then(data => {
                let id_post = data.owner


                fetch(`https://api-blog-m2.herokuapp.com/post/?${id_post}`, {
                        "method": "GET",
                        "headers": {
                            "Authorization": formatted_Token,
                            "Content-type": "application/json"
                        }
                    })
                    .then(res => res.json())


            })




        .catch(err => console.error(err));


        const btn_post_add = document.getElementById('btn_add')

        btn_post_add.addEventListener('click', e => {
            location.reload(true)
        })


    }


    static async deletePost(id) {

        const token = localStorage.getItem("blog:token")

        const formatted_Token = `Bearer ${token}`

        fetch(`https://api-blog-m2.herokuapp.com/post/${id}`, {
            "method": "DELETE",
            "headers": {
                "Authorization": formatted_Token
            }
        })

        .then(response => {
                if (response.status === 204) {
                    window.alert('Post Deletado com Sucesso!')
                }
            })
            .catch(err => console.error(err));
    }
    static async editarPost(id) {

        const token = localStorage.getItem("blog:token")

        const formatted_Token = `Bearer ${token}`

        fetch(`https://api-blog-m2.herokuapp.com/post/${id}`, {
            "method": "PATCH",
            "headers": {
                "Authorization": formatted_Token,
                "Content-Type": "application/json"
            },
            "body": {
                "newContent": "Testando o Patch"
            }
        })

        .then(response => {
                if (response.status === 204) {
                    window.alert('Post Deletado com Sucesso!')
                }
            })
            .catch(err => console.error(err));
    }

}