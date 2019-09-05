<template>
    <div class="container" >

      <div class="inner-bg">
        <div class="container">

          <div class="row">
            <div class="col-sm-6 col-sm-offset-3 form-box">
              <div class="form-top">
                <div class="form-top-left">
                  <h3>登陆</h3>
                  <p>请输入账号和密码:</p>
                </div>
                <div class="form-top-right">
                  <i class="fa fa-key"></i>
                </div>
              </div>
              <div class="form-bottom">
                  <div class="form-group">
                    <label class="sr-only" for="form-username">Username</label>
                    <input type="text" v-model="username" placeholder="Username..." class="form-username form-control" id="form-username">
                  </div>
                  <div class="form-group">
                    <label class="sr-only" for="form-password">Password</label>
                    <input type="password" v-model="password" @keydown.enter="login()" placeholder="Password..." class="form-password form-control" id="form-password">
                  </div>
                  <button type="submit" @click="login()" class="btn">Sign in!</button>
                  <button type="submit" class="btn" v-on:click="back()" >Back Home!</button>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
</template>

<script>
    export default {
        name: "Login",
      data(){
          return {
            username:"",
            password:""
          }
      },
      methods:{
          login:function () {
            if (this.username === '') {
              alert("请填写用户名");
              return;
            }
            if (this.password === '') {
              alert("请填写密码");
              return;
            }
            fetch("/api/blog/login",{
              method:"post",
              body:JSON.stringify({"username": this.username,"password": this.password}),
              headers: {
                'Content-Type': 'application/json'
              }
            }).then(result => {
              if (!result.ok) {
                alert("通信失败，请联系管理员！");
              }
              return result.json()
            }).then(data => {
              if (data.result ===true) {
                data.data.password = null;
                this.$store.commit("setUser",data.data);
                this.$router.push({name:'homeLink'})
              }else {
                alert(data.data);
              }
            })
          },
        back:function () {
          this.$router.push({name:'homeLink'})
        }
      }
    }
</script>

<style scoped>
  strong { font-weight: 500; }

  a, a:hover, a:focus {
    color: #4aaf51;
    text-decoration: none;
    -o-transition: all .3s; -moz-transition: all .3s; -webkit-transition: all .3s; -ms-transition: all .3s; transition: all .3s;
  }

  h1, h2 {
    margin-top: 10px;
    font-size: 38px;
    font-weight: 100;
    color: #555;
    line-height: 50px;
  }

  h3 {
    font-size: 22px;
    font-weight: 300;
    color: #555;
    line-height: 30px;
  }

  img { max-width: 100%; }

  ::-moz-selection { background: #4aaf51; color: #fff; text-shadow: none; }
  ::selection { background: #4aaf51; color: #fff; text-shadow: none; }


  .btn-link-1 {
    display: inline-block;
    height: 50px;
    margin: 5px;
    padding: 16px 20px 0 20px;
    background: #4aaf51;
    font-size: 16px;
    font-weight: 300;
    line-height: 16px;
    color: #fff;
    -moz-border-radius: 4px; -webkit-border-radius: 4px; border-radius: 4px;
  }
  .btn-link-1:hover, .btn-link-1:focus, .btn-link-1:active { outline: 0; opacity: 0.6; color: #fff; }

  .btn-link-1.btn-link-1-facebook { background: #4862a3; }
  .btn-link-1.btn-link-1-twitter { background: #55acee; }
  .btn-link-1.btn-link-1-google-plus { background: #dd4b39; }

  .btn-link-1 i {
    padding-right: 5px;
    vertical-align: middle;
    font-size: 20px;
    line-height: 20px;
  }

  .btn-link-2 {
    display: inline-block;
    height: 50px;
    margin: 5px;
    padding: 15px 20px 0 20px;
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid #fff;
    font-size: 16px;
    font-weight: 300;
    line-height: 16px;
    color: #fff;
    -moz-border-radius: 4px; -webkit-border-radius: 4px; border-radius: 4px;
  }
  .btn-link-2:hover, .btn-link-2:focus,
  .btn-link-2:active, .btn-link-2:active:focus { outline: 0; opacity: 0.6; background: rgba(0, 0, 0, 0.3); color: #fff; }


  /***** Top content *****/

  .inner-bg {
    padding: 4% 0 150px 300px;
  }

  .top-content .text {
    color: #fff;
  }

  .top-content .text h1 { color: #fff; }

  .top-content .description {
    margin: 20px 0 10px 0;
  }

  .top-content .description p { opacity: 0.8; }

  .top-content .description a {
    color: #fff;
  }
  .top-content .description a:hover,
  .top-content .description a:focus { border-bottom: 1px dotted #fff; }

  .form-box {
    margin-top: 35px;
  }

  .form-top {
    overflow: hidden;
    padding: 0 25px 15px 25px;
    background: #fff;
    -moz-border-radius: 4px 4px 0 0; -webkit-border-radius: 4px 4px 0 0; border-radius: 4px 4px 0 0;
    text-align: left;
  }

  .form-top-left {
    float: left;
    width: 75%;
    padding-top: 25px;
  }

  .form-top-left h3 { margin-top: 0; }

  .form-top-right {
    float: left;
    width: 25%;
    padding-top: 5px;
    font-size: 66px;
    color: #ddd;
    line-height: 100px;
    text-align: right;
  }

  .form-bottom {
    padding: 25px 25px 30px 25px;
    background: #eee;
    -moz-border-radius: 0 0 4px 4px; -webkit-border-radius: 0 0 4px 4px; border-radius: 0 0 4px 4px;
    text-align: left;
  }

  .form-bottom form textarea {
    height: 100px;
  }

  .form-bottom form button.btn {
    width: 100%;
  }

  .form-bottom form .input-error {
    border-color: #4aaf51;
  }

  .social-login {
    margin-top: 35px;
  }

  .social-login h3 {
    color: #fff;
  }

  .social-login-buttons {
    margin-top: 25px;
  }

  .copyrights{text-indent:-9999px;height:0;line-height:0;font-size:0;overflow:hidden;}
  /***** Media queries *****/

  @media (min-width: 992px) and (max-width: 1199px) {}

  @media (min-width: 768px) and (max-width: 991px) {}

  @media (max-width: 767px) {

    .inner-bg { padding: 60px 0 110px 0; }

  }

  @media (max-width: 415px) {

    h1, h2 { font-size: 32px; }

  }
  input[type="text"],
  input[type="password"],
  textarea,
  textarea.form-control {
    height: 50px;
    margin: 0;
    padding: 0 20px;
    vertical-align: middle;
    background: #f8f8f8;
    border: 3px solid #ddd;
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    font-weight: 300;
    line-height: 50px;
    color: #888;
    -moz-border-radius: 4px; -webkit-border-radius: 4px; border-radius: 4px;
    -moz-box-shadow: none; -webkit-box-shadow: none; box-shadow: none;
    -o-transition: all .3s; -moz-transition: all .3s; -webkit-transition: all .3s; -ms-transition: all .3s; transition: all .3s;
  }

  textarea,
  textarea.form-control {
    padding-top: 10px;
    padding-bottom: 10px;
    line-height: 30px;
  }

  input[type="text"]:focus,
  input[type="password"]:focus,
  textarea:focus,
  textarea.form-control:focus {
    outline: 0;
    background: #fff;
    border: 3px solid #ccc;
    -moz-box-shadow: none; -webkit-box-shadow: none; box-shadow: none;
  }

  input[type="text"]:-moz-placeholder, input[type="password"]:-moz-placeholder,
  textarea:-moz-placeholder, textarea.form-control:-moz-placeholder { color: #888; }

  input[type="text"]:-ms-input-placeholder, input[type="password"]:-ms-input-placeholder,
  textarea:-ms-input-placeholder, textarea.form-control:-ms-input-placeholder { color: #888; }

  input[type="text"]::-webkit-input-placeholder, input[type="password"]::-webkit-input-placeholder,
  textarea::-webkit-input-placeholder, textarea.form-control::-webkit-input-placeholder { color: #888; }



  button.btn {
    height: 50px;
    margin: 0;
    padding: 0 20px;
    vertical-align: middle;
    background: #4aaf51;
    border: 0;
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    font-weight: 300;
    line-height: 50px;
    color: #fff;
    -moz-border-radius: 4px; -webkit-border-radius: 4px; border-radius: 4px;
    text-shadow: none;
    -moz-box-shadow: none; -webkit-box-shadow: none; box-shadow: none;
    -o-transition: all .3s; -moz-transition: all .3s; -webkit-transition: all .3s; -ms-transition: all .3s; transition: all .3s;
  }

  button.btn:hover { opacity: 0.6; color: #fff; }

  button.btn:active { outline: 0; opacity: 0.6; color: #fff; -moz-box-shadow: none; -webkit-box-shadow: none; box-shadow: none; }

  button.btn:focus { outline: 0; opacity: 0.6; background: #4aaf51; color: #fff; }

  button.btn:active:focus, button.btn.active:focus { outline: 0; opacity: 0.6; background: #4aaf51; color: #fff; }
</style>
