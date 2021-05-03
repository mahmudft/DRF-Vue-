<template>
  <div id="signup">
    <el-form :ref="form" :model="form" label-width="120px">
      <el-form-item label="Email">
        <el-input type="email" v-model="email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="Username">
        <el-input
          type="username"
          v-model="username"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="Password">
        <el-input
          type="password"
          v-model="password"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="submit" @click.prevent="submit()">Signup</el-button>
        <br />
        <p>
          if you have an account<el-button type="text" @click="gologin()"
            >Login</el-button
          >
        </p>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Axios from "axios";
export default {
  data: function () {
    return {
      email: "",
      username: "",
      password: "",
    };
  },
  methods: {
    gologin: function () {
      return this.$router.push("/login");
    },
    submit: function () {
      const form = {
        email: this.email,
        username: this.username,
        password: this.password,
      };
      Axios.post("/api/auth/users/", JSON.stringify(form), {
        "Access-Control-Allow-Origin": "*",
        "content-type": "application/json",
      })
        .then(() => this.$message("Successfully signed up"))
        .then(() => this.$router.push("/login"))
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style scoped>
#signup {
  width: 40em;
  margin: 20px;
  margin-top: 50px;
  align-content: center;
  align-items: center;
}
</style>