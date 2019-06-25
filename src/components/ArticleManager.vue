<template>
  <div class="container">
    <app-header></app-header>
    <table class="table table-striped">
      <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">First</th>
        <th scope="col">Last</th>
        <th scope="col">Handle</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <th scope="row">1</th>
        <td>Mark</td>
        <td>Otto</td>
        <td>@mdo</td>
      </tr>
      <tr>
        <th scope="row">2</th>
        <td>Jacob</td>
        <td>Thornton</td>
        <td>@fat</td>
      </tr>
      <tr>
        <th scope="row">3</th>
        <td>Larry</td>
        <td>the Bird</td>
        <td>@twitter</td>
      </tr>
      </tbody>
    </table>
    <app-paging></app-paging>
    <app-footer></app-footer>
  </div>
</template>

<script>
  import Header from "../components/Header"
  import Footer from "../components/Footer"
  import  Paging from "../components/Paging"
    export default {
        name: "ArticleManager",
      components:{
        "app-header":Header,
        "app-footer":Footer,
        "app-paging":Paging
      }
    }
</script>

<style scoped>

</style>
