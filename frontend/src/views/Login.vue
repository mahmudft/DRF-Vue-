<template>
  <div class="block" id="login">
    <el-form :ref="form" :model="form" label-width="200px" size="medium">
      <el-form-item label="Username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="Password">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="submit" @click.prevent="submit('form')"
          >Login</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      form: {
        password: "",
        username: "",
      },
    };
  },
  methods: {
    submit: function () {
      const form = {
        password: this.form.password,
        username: this.form.username,
      };
      this.$store
        .dispatch("login", form)
        .then(() => this.$message("Logged"))
        .then(() => this.$router.push("/"))
    },
  },
};
</script>

<style scoped>
#login {
  width: 40em;
  margin: 20px;
  margin-top: 50px;
  align-content: center;
  align-items: center;
}
</style>