<template>
    <div class="container">
      <div class="whitebg bloglist">
      <ul v-for="(blog, index) in blogList">
        <li>
          <h3 class="blogtitle"><a v-on:click="read(blog.id)" target="_blank">{{blog.title}}</a></h3>
          <span class="blogpic imgscale"><i><router-link v-bind:to="'/category/' + blog.category">{{blog.category}}</router-link></i><router-link v-bind:to="'/category/' + blog.category" title=""><img v-bind:src="'../../static/images/'+index+'.jpg'" alt=""></router-link></span>
          <p class="blogtext">{{blog.content | getSummary}}</p>
          <p class="bloginfo"><i class="avatar"><img src="../../static/images/avatar.png"></i><span>{{blog.createUser}}</span><span>{{blog.createTime}}</span><span>浏览量：{{blog.views}}</span><span>【<router-link v-bind:to="'/category/' + blog.category">{{blog.category}}</router-link>】</span></p>
          <a v-on:click="read(blog.id)" class="viewmore">阅读更多</a> </li>
      </ul>
      </div>
      <div style="padding-left: 30%">
        <pagination v-bind:records="records" v-bind:per-page="10" v-model="page" v-bind:options="options" >
        </pagination>
      </div>
    </div>
</template>

<script>
    export default {
        name: "ShowArticleList",
      data(){
          return {
            page:1,
            options:{theme:'bootstrap4',texts:{count:''}},
            records:1,
            blogList:null,
            type:this.$store.getters.getType
          }
      },
      watch:{
        page:{
          handler(newval, oldval){
            var currentPage = newval -1;
            var typeStr = "";
            if (this.type === 'home') {
              typeStr = "/api/blog/getArticleListByTime/";
            }else if (this.type === 'hot'){
              typeStr = "/api/blog/getArticleListByView/";
            } else {
              typeStr = "/api/blog/getArticleListByCategory/" + this.type +"/";
            }
            let body = null;
            if(this.$store.getters.getSearch !== ""){
              typeStr = "/api/blog/getArticleListBySearch/" + encodeURIComponent( this.$store.getters.getSearch) + "/";
            }
            if (typeStr.trim() === '' || typeStr === null || typeStr.endsWith('//')) {
              return;
            }
            fetch(typeStr + currentPage,{
              method:"post",
              headers: {
                'Content-Type': 'application/json'
              },
              body:body
            }).then(result => {
              if (!result.ok) {
                alert("通信失败，请联系管理员！");
              }
              return result.json()
            }).then(data => {
              this.records = data.data.count;
              this.blogList = data.data.data;
            })
          },
          immediate:true
        }
      },
      methods:{
          read(id){
            this.$router.push({name:'showArticleLink',params:{id:id}});
          }
      },
      filters:{
          getSummary(value){
            return value.substring(0, 200)+"..."
          }
      }
    }
</script>

<style scoped>
  @media screen and (min-width: 1024px) and (max-width: 1199px) {
    #starlist li a { padding: 0 10px; }

    .zhuanti li { width: 27% }

    .fader .slide img { height: 320px }
    .links li { width: 100%; text-align: left }
    .jianzhan li section { margin: 0 5px; }
    .jianzhan li:nth-child(1) { width: 30% }
    .jianzhan li:nth-child(3) { width: 36.3% }
  }
  @media screen and (max-width: 1023px) {
    /*header*/
    header { position: fixed; z-index: 999 }
    nav { width: 100%; height: auto; background: rgba(0,0,0,0.5); margin-top: 18px; position: fixed; z-index: 999; top: 42px; }

    #starlist li { width: 55%; text-align: center; background: #12b7de; float: none; display: block; font-weight: bold; }
    #starlist li:last-child { padding-bottom: 100% }
    #starlist li a { color: #fff; display: block; width: 100%; text-align: center; float: none; padding: 0; background: #12b7de; border-bottom: #49ccea 1px solid; }
    #starlist ul.sub { display: block; position: inherit; left: inherit; top: inherit; }
    #starlist ul.sub li { width: 100% }
    #starlist ul.sub li:last-child { padding-bottom: 0; border-bottom: #49ccea 1px solid; }
    #starlist ul.sub li a { color: #fff; font-weight: normal; border-bottom: none; }
    #starlist ul.sub li a:hover, #starlist li:hover a, #starlist #selected { color: #fff; }
    .menu span { display: block; width: 50px; height: 50px; background: #12b7de; opacity: 0.5; position: absolute; top: 0; right: 0; border-left: #49ccea 1px solid; }

    /**/
    .box, article { width: 96% }
    article { padding-top: 80px; }

    .qq_join li section { margin: 0 10px }
    .jianzhan li section { margin: 0 5px; }
    .jianzhan li:nth-child(1) { width: 30% }
    .jianzhan li:nth-child(3) { width: 36.3% }
    .zhuanti li { width: 27%; }
  }
  @media only screen and (max-width: 768px) {
    .zhuanti li { padding: 15px; }
    .bplist a img { width: 96% }
    .xinlu li a { padding: 5px; margin: 0 5px; }
    .myblog li { width: 33.3%; }
    .qq_join li section { margin: 0 5px; padding: 5px; }
    .qq_join li p { margin: 10px 0; font-size: 12px }
    .endnav p:last-child { text-align: center; margin-top: 20px; }
    .site_tj li { width: 20% }
    .hnav a { font-size: 12px }
    .muban li section { margin: 0 5px; height: 260px; overflow: hidden }
    .zhuanti li { width: 27.6%; padding: 8px }
  }
  @media only screen and (max-width: 480px) {
    .headline ul { height: auto; padding-bottom: 10px; overflow: hidden }
    .headline ul li { width: 49%; float: left; }
    .headline ul li:last-child { float: right }
    .headline ul li span { padding: 0 20px }

    .newspic li { width: 49%; float: left }
    .newspic li:last-child { float: right }
    .newspic li a { height: 100% }

    .zhuanti ul { padding: 0 }
    .zhuanti li { width: 44%; padding: 8px; }
    .zhuanti ul:before { left: 0; }
    .zhuanti ul:after { bottom: 0 }

    .blogtitle { font-size: 16px }

    .bplist a img { height: 100% }
    a.viewmore { position: static; margin-top: 20px; text-align: center }
    .blogpic { width: 100px; margin-right: 10px; height: 76px; }
    .blogtext { margin-top: 15px }
    .lanmu h1 { font-size: 18px; }

    .liucheng li, .jianzhan li:nth-child(1), .jianzhan li:nth-child(3) { width: 100%; }
    .muban li section { height: auto }
    .site_tj li { width: 50% }

    .ab_box p:last-child { width: 100%; clear: both; padding-top: 10px }

    .xinlu li { width: 50% }
    .myblog li, .xiangsi li { width: 50% }
    .qq_join li { width: 50%; margin-bottom: 20px }
    .wxbox ul { overflow: hidden; text-align: center }
    .wxbox li { float: none; display: inline-block }

    .endnav p { margin: 0 10px }
    .price_info img { position: static }
    .free li { width: 100%; margin-bottom: 10px }
    .newspic span { padding: 0 8px; }

    .zhuanti li b { -webkit-box-orient: vertical; display: -webkit-box; -webkit-line-clamp: 2; font-size: 14px; height: 42px; line-height: 24px; white-space: inherit; }
    .bloginfo { width: 100% }
    .imgscale img { height: 100%; max-width: 100%; }
    .blogpic i { display: none }
    .fader .slide img { height: 200px; }
    .otherlink li{width:100%}

    .tab_buttons ul { width: 600px;overflow-x: scroll;}
    .tab_buttons li {margin-right: 30px;width: auto;}
  }
  /* css */
  * { margin: 0; padding: 0 }
  body { font: 15px "Microsoft YaHei", Arial, Helvetica, sans-serif; color: #333; background: #E9EAED; line-height: 1.5; overflow-x: hidden; }
  img { border: 0; display: block }
  ul, li { list-style: none; }
  a { text-decoration: none; color: #333; }
  a:hover { color: #000; text-decoration: none; }

  /*header*/
  header { width: 100%; padding: 5px 0; background: #1C2327; height: 50px; }
  header::before { background: #000 linear-gradient(to left, #4cd964, #5ac8fa, #007aff, #34aadc, #5856d6, #ff2d55); content: ""; height: 5px; position: absolute; top: 0; width: 100%; }

  .logo a { color: #FFF }
  .logo img { margin-top: 14px; }
  .imgscale img { width: 100%; -moz-transition: all .5s ease; -webkit-transition: all .5s ease; -ms-transition: all .5s ease; -o-transition: all .5s ease; transition: all .5s ease; transition: all 0.5s; }
  .imgscale:hover img { transform: scale(1.1); }
  /*nav*/
  nav { float: left; height: 50px; line-height: 50px; text-align: center; }

  #starlist li { position: relative; display: inline; float: left; width: max-content; }
  #starlist li a { display: inline; float: left; padding: 0 20px; color: #fff }
  #starlist li a:hover, #starlist #selected, .selected > a, #starlist li:hover { color: #00c1de; }
  #starlist li:hover a { color: #00c1de }
  #starlist ul.sub { overflow: hidden; position: absolute; left: 0; top: 50px; background: #1C2327; display: none; z-index: 9 }
  #starlist ul.sub li { height: 30px; line-height: 30px; font-size: 14px; }
  #starlist ul.sub li:last-child { padding-bottom: 10px }
  #starlist ul.sub li a { color: #FFF }
  #starlist ul.sub li a:hover { color: #00c1de }
  #starlist li:hover ul.sub { display: block }
  /*箭头*/
  /*menu+*/
  .menu span { display: none; width: 50px; height: 50px; background: #12b7de; opacity: 0.5; position: absolute; top: 0; right: 0; border-left: #49ccea 1px solid; }
  /*search*/
  .open { display: block !important }
  /*article*/

  /*lbox*/
  .lbox { width: 75%; float: left; overflow: hidden }
  /*banner*/
  .fader .slide img { width: 100%; height: 260px; margin: auto; }
  .fader .prev, .fader .next { position: absolute; height: 32px; line-height: 32px; width: 40px; top: 50%; left: 50px; z-index: 4; margin-top: -25px; cursor: pointer; opacity: 0; transition: all 150ms; }
  .fader .pager_list { position: absolute; width: 100%; height: 26px; padding: 0; line-height: 40px; bottom: 0; text-align: center; z-index: 4; }
  .fader .pager_list li { border-radius: 10px; display: inline-block; width: 10px; height: 10px; margin: 0 7px; background: #fff; opacity: .9; text-indent: -9999px; cursor: pointer; transition: all 150ms; }
  .fader .pager_list li:hover, .fader .pager_list li.active { opacity: 1; background: #12b7de; }
  .banner:hover .fader_controls .page.prev { opacity: .7; left: 20px }
  .banner:hover .fader_controls .page.next { opacity: .7; right: 20px }
  /*headline*/
  .headline { width: 30%; float: right; overflow: hidden; }
  .headline ul { height: 260px; }
  .headline ul li { width: 100%; background: #000; overflow: hidden; height: 125px; margin-bottom: 10px; border-radius: 3px; position: relative }
  .headline ul li a { display: block; overflow: hidden; height: 100%; }
  .headline ul li img { width: 100%; height: 100%; -moz-transition: all .5s ease; -webkit-transition: all .5s ease; -ms-transition: all .5s ease; -o-transition: all .5s ease; transition: all .5s ease; transition: all 0.5s; opacity: .7; }
  .headline ul li:hover img { transform: scale(1.1); opacity: 1 }
  .headline ul li span { bottom: 0; position: absolute; top: 30%; left: 0; right: 0; color: #FFF; text-align: center; font-size: 15px; margin-top: 5px; padding: 0 40px; overflow: hidden; text-overflow: ellipsis; -webkit-box-orient: vertical; display: -webkit-box; -webkit-line-clamp: 2; line-height: 24px; height: 48px; }
  /*tab_buttons*/
  .tab_buttons { margin-bottom: 10px; width: 100%; overflow: hidden; border-bottom: #e4e3e3 1px solid;/* position: relative; */ }
  .tab_buttons li { display: block; font-size: 16px; line-height: 40px; float: left; width: 100px; text-align: center;position: relative; cursor:pointer }
  .newscurrent:after { content: ""; background: #000; width: 100px; height: 2px; position: absolute; bottom: 0; left: 0; }
  .newsitem { display: none; }
  .newsitem:nth-child(1) { display: block; }
  /*tab_box*/
  .whitebg { background: #fff; border-radius: 3px; padding: 20px; margin-bottom: 20px; overflow: hidden; }
  .tab_box { clear: both; position: relative; }
  .newslist { float: right; width: 66% }
  .newslist li { overflow: hidden; line-height: 32px; padding: 0 20px 10px 20px; }
  .newslist li a { height: 32px; }
  .newslist li img { width: 100% }
  .newslist li { height: 22px; }
  .newslist li:hover { height: 100%; background: #f7f7f7 }
  .newslist li:hover a { color: #000; font-weight: bold }
  .newslist li:hover i { background: #222; }
  .newslist li:nth-child(1) { height: 100%; background: #f7f7f7 }
  .newslist li:nth-child(1) a { color: #000; font-weight: bold }
  .newslist li:nth-child(1) i { background: #9a9a9a; }
  .newslist:hover li:nth-child(1) { height: 22px; background: none; }
  .newslist:hover li:nth-child(1) a { color: #333; font-weight: normal }
  .newslist:hover li:nth-child(1) i { background: #9a9a9a; }
  .newslist:hover li:nth-child(1):hover { height: 100%; background: #f7f7f7; }
  .newslist:hover li:nth-child(1):hover a { color: #000; font-weight: bold }
  .newslist:hover li:nth-child(1):hover i { background: #222; }
  .newslist p { line-height: 24px; font-size: 14px; overflow: hidden; text-overflow: ellipsis; -webkit-box-orient: vertical; display: -webkit-box; -webkit-line-clamp: 2; height: 48px; }
  .newspic { float: left; width: 32%; height: 218px; overflow: hidden; position: relative; }
  .newspic ul { overflow: hidden; }
  .newspic li { height: 100px; position: relative; background: rgba(0,0,0,1); overflow: hidden; margin-bottom: 10px; border-radius: 3px }
  .newspic li a { display: block; overflow: hidden }
  .newspic img { height: 100%; width: 100%; opacity: .7; -moz-transition: all .5s ease; -webkit-transition: all .5s ease; -ms-transition: all .5s ease; -o-transition: all .5s ease; transition: all .5s ease; transition: all 0.5s; }
  .newspic span { bottom: 0; position: absolute; bottom: 30%; left: 0; right: 0; color: #FFF; text-align: center; font-size: 15px; padding: 0 40px; overflow: hidden; text-overflow: ellipsis; -webkit-box-orient: vertical; display: -webkit-box; -webkit-line-clamp: 2; line-height: 22px; }
  .newspic li:hover img { opacity: .9; transform: scale(1.1); }
  .newsitem ul li i { display: block; width: 20px; height: 20px; background: #9a9a9a; float: left; margin-top: 6px; margin-right: 20px; position: relative; font-style: normal }
  .newsitem ul li i::before { position: absolute; left: 0; top: 0; font-size: 9px; color: #fff; line-height: 20px; width: 20px; text-align: center }
  .newsitem ul li:first-child i { background: #222; }
  .newsitem ul li:first-child i::before { content: "1"; }
  .newsitem ul li:nth-child(2) i::before { content: "2"; }
  .newsitem ul li:nth-child(3) i::before { content: "3"; }
  .newsitem ul li:nth-child(4) i::before { content: "4"; }
  .newsitem ul li:nth-child(5) i::before { content: "5"; }
  /*zhuanti*/
  .zhuanti ul { overflow: hidden; padding: 10px 0 20px 10px; position: relative; }
  .zhuanti ul:before { content: ""; position: absolute; background: #fff; width: 1px; height: 100%; left: 10px }
  .zhuanti ul:after { content: ""; position: absolute; background: #fff; width: 100%; height: 1px; bottom: 20px; left: 0; }
  .zhuanti li { float: left; width: 27.6%; border-bottom: #eee 1px solid; border-left: #eee 1px solid; overflow: hidden; padding: 20px; -moz-transition: all .5s ease; -webkit-transition: all .5s ease; transition: all .5s ease; }
  .ztpic { width: 100%; height: 100px; overflow: hidden; border-radius: 3px; background: #CCC; display: block }
  .ztpic img { display: inline-block; width: 100%; min-height: 100%; height: auto; vertical-align: middle; transition: all .5s ease-out .1s; }
  .zhuanti li b { display: block; width: 100%; overflow: hidden; height: 30px; line-height: 30px; margin: 10px 0; text-overflow: ellipsis; white-space: nowrap; overflow: hidden; }
  .zhuanti li span { color: #999; overflow: hidden; text-overflow: ellipsis; -webkit-box-orient: vertical; display: -webkit-box; -webkit-line-clamp: 3; font-size: 14px; height: 62px; }
  .readmore { margin: 10px 0 0 0; color: #096; display: block; }
  .readmore:before { content: "+"; color: #063 }
  .zhuanti li:hover { background: #fff; box-shadow: #ccc 1px 1px 8px; }
  .zhuanti li:hover img { transform: scale(1.05) }
  /*bloglist*/
  .bloglist ul { padding: 10px 0 0 }
  .bloglist li { overflow: hidden; margin-bottom: 20px; border-bottom: #eee 1px dashed; padding-bottom: 20px; position: relative; min-height: 120px; }
  .blogtitle { margin: 0 0 10px 0; font-size: 18px; overflow: hidden; }
  .bloglist li:hover .blogtitle a { color: #337ab7; }
  .blogtitle b { color: #F00 }
  a.viewmore { display: block; right: 10px; bottom: 20px; position: absolute; padding: 3px 10px; background: #12b7de; color: #fff; border-radius: 3px; }
  .blogpic { float: left; width: 23.2%; margin-right: 20px; display: block; overflow: hidden; border-radius: 3px; position: relative }
  .blogpic i { display: block; position: absolute; top: 0; left: 0; z-index: 9; font-style: normal; padding: 3px 5px; background: rgba(18,182,221,.8); font-size: 14px; }
  .blogpic i a { color: #FFF }
  .bplist { display: block; overflow: hidden }
  .bplist a { display: block; float: left; width: 25%; overflow: hidden }
  .bplist a img { border-radius: 3px; width: 200px; height: 140px; -moz-transition: all .5s ease; -webkit-transition: all .5s ease; -ms-transition: all .5s ease; -o-transition: all .5s ease; transition: all .5s ease; transition: all 0.5s; }
  .bplist a img:hover { transform: scale(1.05) }
  .blogtext { font-size: 14px; color: #666; overflow: hidden; text-overflow: ellipsis; -webkit-box-orient: vertical; display: -webkit-box; -webkit-line-clamp: 3; margin-top: 20px }
  .bloginfo { margin-top: 20px; overflow: hidden; color: #999; line-height: 34px; }
  .bloginfo span { margin: 0 5px }
  .bloginfo span a { color: #096 }
  .avatar { position: relative; float: left; width: 30px; height: 30px; border-radius: 100%; padding: 2px; display: block; background: -webkit-linear-gradient(bottom left, rgba(0,153,255,.9), rgba(42,228,197,.7)); background: -o-linear-gradient(bottom left, rgba(0,153,255,.9), rgba(42,228,197,.7)); background: linear-gradient(to top right, rgba(0,153,255,.9), rgba(42,228,197,.7)); }
  .avatar img { width: 100%; border-radius: 50%; }
  /*links*/
  .sqlink { float: right; margin-right: 10px; font-size: 14px }
  .sqlink a { color: #666 }
  .sqlink a:hover { color: #000; text-decoration: underline }
  .links ul { overflow: hidden; margin-top: 20px }
  .links li { display: inline-block; width: 50%; float: left; line-height: 30px; text-align: center }
  .links li a { display: block; }
  .links li:hover { background: #f7f7f7 }
  /*rbox*/
  .card h2 { font-size: 22px; margin: 10px; color: #89919a; font-weight: normal; padding-bottom: 10px; }
  .card p { font-size: 12px; padding: 0 0 0 20px; line-height: 28px; text-shadow: 0px 1px 2px rgba(0,0,0,.5); color: #d0d2d4; -webkit-animation: animations2 5s ease-in-out 5s; -moz-animation: animations2 5s ease-in-out 5s; -o-animation: animations2 5s ease-in-out 5s; -ms-animation: animations2 5s ease-in-out 5s; animation: animations2 5s ease-in-out 5s; }
  .linkmore { margin: 15px }
  .linkmore li { width: 25%; float: left }
  .linkmore li a { height: 53px; display: block; overflow: hidden; box-shadow: 0px 1px 0px rgba(255,255,255,.1), inset 0px 1px 1px rgba(0,0,0,.7); border-radius: 50%; margin: 0 5px; }
  .linkmore li a:hover { opacity: 0.5; }

  #weixin i { display: block; position: absolute; bottom: 55px; right: 0 }
  #weixin i img { height: 100px; display: none }
  #weixin:hover i img { display: block }
  /*htitle*/
  .hnav a { display: block; margin-right: 10px; padding-right: 10px; float: left; position: relative }
  .hnav a:after { position: relative; content: "/"; right: -10px; bottom: 0; color: #ccc }
  .hnav a:last-child::after { content: "" }
  /*notice*/
  .notice ul { padding-top: 18px }
  .notice li { font-size: 12px; line-height: 30px; margin-bottom: 12px; display: block; -moz-border-radius: 4px; border-radius: 4px; background: #f6f6f6; padding: 4px 12px 4px 30px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; position: relative; -moz-transition: all .2s ease; -webkit-transition: all .2s ease; transition: all .2s ease; }
  .notice li:before { position: absolute; content: ""; width: 3px; height: 3px; background: #000; border-radius: 10px; left: 15px; top: 20px }
  .notice li:hover { background: #f2f2f2; box-shadow: 0 0 10px #ccc; -moz-transition: all .2s ease; -webkit-transition: all .2s ease; transition: all .2s ease; }
  /*topnews*/
  .topnews { display: block; margin: 20px 0; background: #000; position: relative; overflow: hidden; border-radius: 3px; max-height: 110px; }
  .topnews img { opacity: .7; }
  .topnews span { bottom: 0; position: absolute; bottom: 30%; left: 0; right: 0; color: #FFF; text-align: center; font-size: 15px; padding: 0 40px; overflow: hidden; text-overflow: ellipsis; -webkit-box-orient: vertical; display: -webkit-box; -webkit-line-clamp: 2; line-height: 22px; }
  .topnews:hover img { opacity: .9; transform: scale(1.1); }
  /*paihang*/
  .paihang ul { overflow: hidden }
  .paihang ul li { height: 30px; line-height: 30px; margin-bottom: 10px; padding-left: 5px; text-overflow: ellipsis; white-space: nowrap; overflow: hidden; }
  .paihang ul li:nth-child(even) { background: #f6f6f6 }
  .paihang ul li i { display: block; width: 16px; height: 16px; background: #B1B1B1; float: left; margin-top: 8px; margin-right: 10px; position: relative; font-style: normal }
  .paihang ul li i::before { position: absolute; left: 0; top: 0; font-size: 9px; color: #fff; line-height: 16px; width: 16px; text-align: center }
  .paihang ul li:first-child i, .paihang ul li:nth-child(2) i, .paihang ul li:nth-child(3) i { background: #FF6600; }
  .paihang ul li:first-child i::before { content: "1"; }
  .paihang ul li:nth-child(2) i::before { content: "2"; }
  .paihang ul li:nth-child(3) i::before { content: "3"; }
  .paihang ul li:nth-child(4) i::before { content: "4"; }
  .paihang ul li:nth-child(5) i::before { content: "5"; }
  .paihang ul li:nth-child(6) i::before { content: "6"; }
  .paihang ul li:nth-child(7) i::before { content: "7"; }
  .paihang ul li:nth-child(8) i::before { content: "8"; }
  .paihang ul li:hover { -moz-transition: all .2s ease; -webkit-transition: all .2s ease; transition: all .2s ease; }
  /*tuijian*/
  .tuijian ul { overflow: hidden; padding-top: 10px }
  .tuijian li { overflow: hidden; margin-bottom: 10px; height: 60px; }
  .tuijian li i { width: 70px; height: 70px; margin-right: 10px; overflow: hidden; display: block; float: left; }
  .tuijian li i img { height: 100%; max-width: 100%; min-width: 100%; -moz-transition: all .5s ease; -webkit-transition: all .5s ease; -ms-transition: all .5s ease; -o-transition: all .5s ease; transition: all .5s ease; transition: all 0.5s; }
  .tuijian li p { margin-top: 10px; line-height: 20px; max-height: 40px; overflow: hidden; text-overflow: ellipsis; -webkit-box-orient: vertical; display: -webkit-box; -webkit-line-clamp: 2; font-size: 14px; }
  .tuijian li:hover { background: #f6f6f6; }
  .tuijian li:hover img { transform: scale(1.1); }
  /*ad*/
  .ad ul { overflow: hidden; border-radius: 3px; }
  /*wenzi*/
  .wenzi li { line-height: 22px; margin-bottom: 10px; position: relative; padding-left: 15px }
  .wenzi li:before { position: absolute; content: ""; width: 3px; height: 3px; background: #000; border-radius: 10px; left: 0px; top: 10px; }
  /*tongji*/
  .tongji li { margin-bottom: 8px }
  .tongji li a { color: #096 }
  .tongji li a:hover { text-decoration: underline; color: #000 }
  .tongji_gzh { width: 80%; margin: auto; overflow: hidden; }
  .tongji_gzh img { width: 100% }
  /*footer*/
  footer { background: #373D41; width: 100%; border-top: #00C1DE 10px solid; padding: 30px 0; color: #73777a; font-size: 14px; }
  .wxbox { overflow: hidden; float: left; margin-right: 20px }
  .wxbox li { float: left; margin: 0 10px; text-align: center }
  .wxbox img { height: 100px }
  .endnav b { font-size: 16px; color: #00c1de; }
  .endnav p { margin-bottom: 5px }
  footer a { color: #73777a; }
  footer a:hover { color: #00C1DE }

  /*
  list.html
  */
  .lanmu img { height: 100px; float: left; margin-right: 20px }
  .lanmu h1 { font-size: 22px; margin-bottom: 15px }
  .lanmu p { color: #666 }
  /*
  list2.html
  */
  .liucheng ul { overflow: hidden; margin-top: 20px }
  .liucheng li { width: 33.3%; float: left; padding-bottom: 20px }
  .liucheng li section { display: block; margin: 0 15px; box-shadow: #e9eaed 1px 1px 5px; }
  .liucheng li h2 { font-size: 16px; line-height: 36px; background: #1c2327; color: #FFF; font-weight: normal; text-align: center; margin-bottom: 15px; }
  .liucheng li p { padding: 0 10px; font-size: 14px; line-height: 30px }
  .liucheng li p:last-child { padding-bottom: 15px }
  .liucheng li a:hover { color: #30a6de }

  #lc_weixin i { display: block; position: absolute; bottom: 40px; right: 0; box-shadow: #e9eaed 1px 1px 5px; }
  #lc_weixin i img { height: 100px; display: none }
  #lc_weixin:hover i img { display: block }
  /*pagelist*/
  .pagelist a { color: #666; margin: 0 5px 10px; padding: 5px 10px; background: #F7F7F7; display: inline-block; }
  .pagelist a:hover, .pagelist > b { color: #3690cf; color: #FFF; background: #1C2327; }
  .pagelist > b { padding: 5px 10px; }

  /*cloud*/
  .cloud ul a { line-height: 24px; height: 24px; display: block; background: #999; float: left; padding: 3px 10px; margin: 10px 5px 0 0; border-radius: 3px; -moz-transition: all 0.5s; -webkit-transition: all 0.5s; -o-transition: all 0.5s; transition: all 0.5s; color: #FFF }
  .cloud ul a:nth-child(8n-7) { background: #8A9B0F }
  .cloud ul a:nth-child(8n-6) { background: #EB6841 }
  .cloud ul a:nth-child(8n-5) { background: #3FB8AF }
  .cloud ul a:nth-child(8n-4) { background: #FE4365 }
  .cloud ul a:nth-child(8n-3) { background: #FC9D9A }
  .cloud ul a:nth-child(8n-2) { background: #EDC951 }
  .cloud ul a:nth-child(8n-1) { background: #C8C8A9 }
  .cloud ul a:nth-child(8n) { background: #83AF9B }
  .cloud ul a:first-child { background: #036564 }
  .cloud ul a:last-child { background: #3299BB }
  .cloud ul a:hover { border-radius: 0; text-shadow: #000 1px 1px 1px }
  /*

  daohang.html

  */
  .site_tj { overflow: hidden; padding-top: 20px }
  .site_tj li { width: 16.6%; float: left; text-align: center; line-height: 30px; margin-bottom: 10px; }
  .site_tj li a { border-radius: 3px; display: block; border: 1px solid #EBEBEB; margin: 0 5px; text-overflow: ellipsis; white-space: nowrap; overflow: hidden; }
  .site_tj li:hover a { box-shadow: 0 4px 10px -4px rgba(48, 63, 107, 0.20); background: #222; color: #fff }
  .site_yx li:nth-child(30n) { margin-bottom: 60px }
  /*

  about

  */
  .ab_box h3 { margin: 10px 0 10px; font-size: 18px; }
  .ab_box p { color: #666; margin-bottom: 5px }

  .avatar_pic img { width: 100%; border-radius: 50%; }

  .ly_button a { color: #FFF }

  .xinlu li { width: 25%; float: left; overflow: hidden; margin-bottom: 20px }
  .xinlu li a { display: block; margin: 0 10px; background: #f3f3f3; padding: 20px; }
  .xinlu li i { display: block; overflow: hidden; height: 120px; margin-bottom: 10px }
  .xinlu li i img { width: 100%; min-height: 120px; -moz-transition: all .5s ease; -webkit-transition: all .5s ease; -ms-transition: all .5s ease; -o-transition: all .5s ease; transition: all .5s ease; transition: all 0.5s; }
  .xinlu li i:hover img { transform: scale(1.1); }
  .xinlu li p { font-weight: bold; margin-bottom: 10px; text-overflow: ellipsis; white-space: nowrap; overflow: hidden; }
  .xinlu li span { color: #666; overflow: hidden; text-overflow: ellipsis; -webkit-box-orient: vertical; display: -webkit-box; -webkit-line-clamp: 3; font-size: 14px; height: 62px; }

  .myblog li { width: 20%; float: left; display: block; text-align: center; padding-bottom: 10px; position: relative; overflow: hidden }
  .myblog li:after { position: absolute; content: ""; right: 0; top: 0; background: #e9eaed; height: 100%; width: 1px; }
  .myblog li:last-child:after { content: none }
  .myblog li b { display: block; line-height: 30px; margin-bottom: 10px; }

  .myblog li:nth-child(even) .buttons { background: #F60 }
  .myblog p { margin-bottom: 10px }
  .qq_join li { float: left; width: 25%; }
  .qq_join li section { margin: 0 20px; box-shadow: #ccc 1px 1px 5px; padding: 10px; display: block; overflow: hidden }
  .qq_join li img { width: 90%; margin: auto; background: -webkit-linear-gradient(bottom left, rgba(0,153,255,.9), rgba(42,228,197,.7)); background: -o-linear-gradient(bottom left, rgba(0,153,255,.9), rgba(42,228,197,.7)); background: linear-gradient(to top right, rgba(0,153,255,.9), rgba(42,228,197,.7)); display: block; padding: 5px; }
  .qq_join li p { margin: 10px; }
  .qq_join li b { color: #019881; margin: 0 5px; }
  /*

      info.html

  */
  .con_nav a { color: #666 }
  .con_nav a:hover { color: #000 }

  .con_info b { margin-right: 10px; color: #000; }

  .con_text a { color: #09C;word-break: break-all; }
  .con_text a:hover { text-decoration: underline }
  .con_text p { margin: 15px 0; }
  .price_info ul { padding-top: 15px; position: relative; overflow: hidden }
  .price_info p { margin-bottom: 5px }
  .price_info img { position: absolute; right: 20px; top: 0; width: 120px }

  .diggit a { color: #fff }
  .diggit a:hover { text-decoration: none }

  .otherlink li { position: relative; line-height: 26px; height: 26px; display: block; width: 50%; float: left; overflow: hidden; }
  .otherlink li a { display: block; margin-right: 30px; padding-left: 10px; }
  .otherlink li a:hover { text-decoration: underline; color: #000 }
  .otherlink li:before { position: absolute; content: ""; width: 3px; height: 3px; background: #000; border-radius: 10px; left: 0px; top: 12px; }
  .nextinfo a { color: #000 }
  .ad img { width: 100% }

  .xiangsi li { width: 25%; float: left; overflow: hidden; margin-bottom: 20px; padding-bottom: 10px; }
  .xiangsi a { display: block; margin: 0 5px; padding-bottom: 10px; box-shadow: #ececec 0px 2px 5px; }
  .xiangsi li i { display: block; overflow: hidden; height: 120px; margin-bottom: 10px; }
  .xiangsi li i img { width: 100%; min-height: 120px; -moz-transition: all .5s ease; -webkit-transition: all .5s ease; -ms-transition: all .5s ease; -o-transition: all .5s ease; transition: all .5s ease; transition: all 0.5s; }
  .xiangsi li i:hover img { transform: scale(1.1); }
  .xiangsi li p { font-weight: bold; margin-bottom: 10px; text-overflow: ellipsis; white-space: nowrap; overflow: hidden; padding: 0 8px }
  .xiangsi li span { color: #666; overflow: hidden; text-overflow: ellipsis; -webkit-box-orient: vertical; display: -webkit-box; -webkit-line-clamp: 3; font-size: 14px; height: 62px; padding: 0 8px }
  /*timebox*/
  .timebox ul { overflow: hidden; }
  .timebox span { position: relative; line-height: 32px; padding-right: 40px; color: #999 }
  .timebox span:after { position: absolute; content: ""; width: 2px; height: 40px; background: #e0dfdf; right: 18px }
  .timebox li { text-overflow: ellipsis; white-space: nowrap; overflow: hidden; }
  .timebox li i { position: relative; font-style: normal }
  .timebox li i:before { content: " "; height: 10px; width: 10px; border: 2px solid #cccaca; background: #fff; position: absolute; top: 4px; left: -26px; border-radius: 50%; -webkit-transition: all .5s ease; -moz-transition: all .5s ease; -ms-transition: all .5s ease; -o-transition: all .5s ease; transition: all .5s ease; }
  .timebox li:hover i:before { background: #080808 }
  .pagelist.mt20 { margin-top: 20px; }
</style>
