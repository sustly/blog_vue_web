<template>
  <div class="container" >
    <!--<app-header></app-header>-->
    <div class="btn-group" style="margin: 20px 30px;" role="group" aria-label="Button group with nested dropdown">
      <div class="btn-group" role="group">
        <button id="btnGroupDrop1" v-bind:value="category" type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          {{category}}
        </button>
        <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
          <a class="dropdown-item" v-on:click="changeTitle('java')" >java</a>
          <a class="dropdown-item" v-on:click="changeTitle('c++')">c++</a>
          <a class="dropdown-item" v-on:click="changeTitle('python')">python</a>
          <a class="dropdown-item" v-on:click="changeTitle('vue')">vue</a>
          <a class="dropdown-item" v-on:click="changeTitle('javascript')">javascript</a>
        </div>
      </div>

      <button type="button" v-on:click="submit()" class="btn btn-secondary">提交</button>
      <router-link type="button" to="/"  class="btn btn-secondary">返回主页</router-link>

    </div>

    <br/>
    <div class="input-group mb-3" style="width: 95%;margin: auto;">
      <div class="input-group-prepend">
        <div class="input-group-text">
          <input type="checkbox" aria-label="Checkbox for following text input"  title="">
        </div>
      </div>
      <input type="text" v-model="title" class="form-control" placeholder="标题" aria-label="Text input with checkbox" title="">
    </div>



    <div id="editor" v-on:mousedown="onWrite" v-on:mouseleave="onRead">
      <mavon-editor ref=md :ishljs="true" @imgAdd="imgAdd" @imgDel="imgDel" v-model="content" v-bind:style="styleChange" ></mavon-editor>
    </div>
    <!--<app-footer></app-footer>-->

  </div>
</template>

<script>
  import Header from "../components/Header"
  import Footer from "../components/Footer"
  import { mavonEditor } from 'mavon-editor'
  import 'mavon-editor/dist/css/index.css'
    export default {
        name: "UpdateArticle",
      data(){
          return{
            category:"选择分类",
            styleChange:"height: 100%;z-index:-999;",
            title:"",
            content:"",
            id:this.$store.getters.getId,
            img_file:[],
            imgArray:[]
          }
      },
      created(){
          fetch("/api/blog/getArticle/"+this.id,{
            method:"post",
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
              this.title = data.data.title;
              this.content = data.data.content;
              this.category = data.data.category;
            }
          })
      },
      components: {
        mavonEditor,
        "app-header":Header,
        "app-footer":Footer
      },
      methods:{
        // 绑定@imgAdd event
        imgAdd(pos, $file) {
          // 第一步.将图片上传到服务器.

          this.img_file[pos] = $file;
          let formdata = new FormData();
          formdata.append('image', $file);

          fetch("/api/blog/uploadImg",{
            method: 'post',
            body: formdata
          }).then(result => {
            if (!result.ok) {
              alert("通信失败，请联系管理员！");
            }
            return result.json()
          }).then((res) => {
            if(res.result === true){
              // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
              this.$refs.md.$img2Url(pos, res.data);
              this.imgArray[pos - 1] = res.data
            }

          })
        },
        imgDel(pos) {
          delete this.img_file[pos];
        },
        changeTitle:function (value) {
          this.category = value;
        },
        onWrite:function () {
          this.styleChange = "height: 100%;z-index:999;";
        },
        onRead:function () {
          this.styleChange = "height: 100%;z-index:-999;";
        },
        submit:function () {
          fetch("/api/blog/updateArticle",{
            method:"post",
            body:JSON.stringify({"content":this.content,"category":this.category,
              "title":this.title,"id":this.id,"images":this.imgArray
            }),
            headers: {
              'Content-Type': 'application/json',
            }
          }).then(result => {
            if (!result.ok) {
              alert("通信失败，请联系管理员！");
            }else {
              this.$router.push({name:'homeLink'})
            }
          })
        }
      }

    }
</script>

<style scoped>
  #editor {
    margin: auto;
    width: 95%;
    height: 580px;
    margin-top: 2rem;

  }
</style>
