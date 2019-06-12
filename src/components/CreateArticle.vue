<template>
  <div class="container" >
    <!--<app-header></app-header>-->
    <div class="btn-group" style="margin: 20px 30px;" role="group" aria-label="Button group with nested dropdown">
      <div class="btn-group" role="group">
        <button id="btnGroupDrop1" v-bind:value="itemize" type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          {{itemize}}
        </button>
        <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
          <a class="dropdown-item" v-on:click="changeTitle('java')" >java</a>
          <a class="dropdown-item" v-on:click="changeTitle('c++')">c++</a>
          <a class="dropdown-item" v-on:click="changeTitle('python')">python</a>
          <a class="dropdown-item" v-on:click="changeTitle('vue')">vue</a>
          <a class="dropdown-item" v-on:click="changeTitle('javascript')">javascript</a>
        </div>
      </div>

      <button type="button" class="btn btn-secondary">提交</button>
      <router-link type="button" to="/"  class="btn btn-secondary">返回主页</router-link>

    </div>

    <br/>
    <div class="input-group mb-3" style="width: 95%;margin: auto;">
      <div class="input-group-prepend">
        <div class="input-group-text">
          <input type="checkbox" aria-label="Checkbox for following text input"  title="">
        </div>
      </div>
      <input type="text" class="form-control" placeholder="标题" aria-label="Text input with checkbox" title="">
    </div>



    <div id="editor" v-on:mousedown="onWrite" v-on:mouseleave="onRead">
      <mavon-editor v-bind:style="styleChange" ></mavon-editor>
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
        name: "CrateArticle",
      data(){
          return{
            itemize:"选择分类",
            styleChange:"height: 100%;z-index:-999;"
          }
      },
      components: {
        mavonEditor,
        "app-header":Header,
        "app-footer":Footer
      },
      methods:{
        changeTitle:function (value) {
          this.itemize = value;
        },
        onWrite:function () {
          this.styleChange = "height: 100%;z-index:999;";
        },
        onRead:function () {
          this.styleChange = "height: 100%;z-index:-999;";
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
