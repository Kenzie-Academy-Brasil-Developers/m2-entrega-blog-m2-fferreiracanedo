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

        fetch(endPointCadastro, {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json"


            },
            "body": JSON.stringify(body_cadastro),

        })




        .then(response => console.log(response))
            .catch(err => console.error(err));
    }

    static async loginUser(e) {
        e.preventDefault()
        const email_login = document.getElementById('email').value
        const password_login = document.getElementById('password').value

        console.log(email_login, password_login)

        const endPointLogin = "https://api-blog-m2.herokuapp.com/user/login"

        let body_login = {
            email: email_login,
            password: password_login
        }

        fetch(endPointLogin, {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json"
            },
            "body": JSON.stringify(body_login)
        })

        .then(response => {
                if (response.status === 200) {
                    window.location.href = "/pages/paginaUser.html"

                }
            })
            .catch(err => console.error(err));
    }

    static async listarPost() {


        const url_post = await fetch('https://api-blog-m2.herokuapp.com/post/', {
            "method": "GET",
            "headers": {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZmNTAzZDEzLWFlYzctNDNkNy05ZDI1LWViNGFmZTQyNDdkMSIsImlhdCI6MTY0NzU2MDk2MCwiZXhwIjoxNjQ3NjQ3MzYwfQ.7hhMF_Fuf5XBCDyvzmnyvEbJnaxLiuuxfrUcfmPkU4M"
            }

        })

        // console.log(url_post)



        .then(response => response.json())
            .then(body => {
                body.data.forEach(({ id, post, createdAt, owner }) => {
                    const imagem_post = document.getElementById('image-post')
                    const text_post = document.getElementById('text-post')

                    //criandoPost



                    const post_user = document.createElement('div')
                    const post_user_img = document.createElement('img')

                    post_user_img.src = owner.avatarUrl
                    post_user_img.width = "100"
                    post_user_img.height = "100"
                    post_user.classList.add('class-post')

                    post_user.innerHTML = `<span>${createdAt}</span>
                    <p>${post}</p>
                    
                    `


                    // imagem_post.appendChild(post_user_img)
                    text_post.appendChild(post_user)
                    post_user.appendChild(post_user_img)




                })
            })
            .catch(err => console.error(err));
    }



}