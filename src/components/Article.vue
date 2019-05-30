<template>
  <div class="container" >
    <!--<app-header></app-header>-->
    <div class="btn-group" style="margin: 20px 30px;" role="group" aria-label="Button group with nested dropdown">
      <div class="btn-group" role="group">
        <button id="btnGroupDrop1" type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          选择分类
        </button>
        <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
          <router-link class="dropdown-item" to="/" >java</router-link>
          <router-link class="dropdown-item" to="/">c++</router-link>
          <router-link class="dropdown-item" to="/">python</router-link>
          <router-link class="dropdown-item" to="/">vue</router-link>
          <router-link class="dropdown-item" to="/">javascript</router-link>
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



    <div id="editor">
      <mavon-editor style="height: 100%;z-index:-999;" ></mavon-editor>
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
        name: "Article",
      components: {
        mavonEditor,
        "app-header":Header,
        "app-footer":Footer
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
