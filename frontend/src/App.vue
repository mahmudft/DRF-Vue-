<template>
  <div id="app">
    <el-container>
      <el-header id="head">
        <h1 id="headeritem">Django Books</h1>
        <el-menu
          class="el-menu-demo"
          mode="horizontal"
          background-color="white"
          text-color="orange"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="1"
            ><router-link to="/">Books</router-link></el-menu-item
          >
          <el-menu-item index="2" v-if="!token">
            <router-link to="/signup">Signup</router-link>
          </el-menu-item>
          <el-menu-item index="3" v-else>
            <el-button type="text" @click="logout()">Logout</el-button>
          </el-menu-item>
        </el-menu>
      </el-header>
      <el-main id="main">Main</el-main>
    </el-container>
    <router-view></router-view>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: "app",
  data: function () {
    return {};
  },
  computed: mapState(["token"]),
  //watch: {
   // token: this.$store.getters.gettokenfromstate,
 // },
  methods: {
    logout: function () {
      this.$store.dispatch("logout").then(() => this.$router.push("/login"));
    },
  },
  mounted() {
    this.$store.dispatch("loadbooks").then(this.$message("Fetched books"));
    console.log(this.books, "hellocomp");
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 10px;
  margin-top: 5px;
}
#head {
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  font-size: 23px;
  background-color: transparent;
  color: rgb(58, 72, 83);
}

#main {
  margin: 20px;
}
#headeritem {
  display: flex;
  color: rgb(9, 56, 95);
}

body {
  background-color: #fff;
  margin: 2px;
  font-weight: 400;
}
</style>
