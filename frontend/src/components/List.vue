<template>
  <div id="list">
    <div v-if="!auth">Authenication is required</div>
    <div v-else>
      <div>
        <el-button type="text" @click="dialogFormVisible = true"
          >Add Book</el-button
        >
        <el-dialog title="Upload a book" :visible.sync="dialogFormVisible">
          <el-form :model="form" enctype="multipart/form-data">
            <el-form-item label="Author" :label-width="formLabelWidth">
              <el-input v-model="form.author" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="Title" :label-width="formLabelWidth">
              <el-input v-model="form.title" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="Description" :label-width="formLabelWidth">
              <el-input
                type="textarea"
                :rows="2"
                v-model="form.description"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="Poster" :label-width="formLabelWidth">
              <input type="file" @change="fileHandle" />
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">Cancel</el-button>
            <el-button type="submit" @click="uploadBook">Upload</el-button>
          </span>
        </el-dialog>
      </div>
      <div id="books">
        <el-row>
          <el-col
            :span="8"
            v-for="book in books"
            :key="book.id"
            style="padding: 20px"
          >
            <el-card :body-style="{ padding: '2px' }">
              <img
                :src="book.poster"
                class="image"
                style="width: 500px; height: 400px"
              />
              <div style="padding: 14px">
                <span>Title: {{ book.title }}</span>
                <p>Author: {{ book.author }}</p>
                <p>Description: {{ book.description }}</p>
                <div class="bottom clearfix">
                  <el-button
                    type="text"
                    @click="
                      updatebook(
                        book.id,
                        book.title,
                        book.description,
                        book.author,
                        book.poster
                      )
                    "
                    >Edit</el-button
                  >
                  <el-button
                    type="text"
                    class="button"
                    @click="deletebook(book.id)"
                    >Delete</el-button
                  >
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
      <div>
        <el-dialog title="Edit" :visible.sync="changeForm">
          <el-form :model="editform" enctype="multipart/form-data">
            <el-form-item label="Author" :label-width="formLabelWidth">
              <el-input v-model="editform.author" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="Title" :label-width="formLabelWidth">
              <el-input v-model="editform.title" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="Description" :label-width="formLabelWidth">
              <el-input
                type="textarea"
                :rows="2"
                v-model="editform.description"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="Poster" :label-width="formLabelWidth">
              <input
                type="file"
                @change="editformhandle"
              />
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button type="submit" @click="submitBook">Submit</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import API from "../api";
import { mapState } from "vuex";
export default {
  data: function () {
    return {
      changeForm: false,
      formLabelWidth: "120px",
      auth: localStorage.getItem("token"),
      showForm: false,
      dialogFormVisible: false,
      fileList: [],
      form: {
        author: "",
        title: "",
        description: "",
        poster: "",
        url: "",
      },
      editform: {
        id: "",
        title: "",
        author: "",
        description: "",
        poster: {},
        name: "",
      },
    };
  },
  computed: mapState(["books"]),
  methods: {
    editformhandle(event) {
      const file = event.target.files[0]
      console.log(file)
      if (file) {
        this.editform.poster = file;
        this.editform.name = file.name;
      } else {
        this.editform.poster = "";
      }
      console.log(this.editform.poster)
    },
    deletebook(id) {
      console.log(id);
      //const form = {"id": id}
      API.delete(`/api/book/${id}`)
        .then((resp) => {
          if (resp.status === 204) {
            this.$store.dispatch("loadbooks");
          }
        })
        
    },
    updatebook(id, title, description, author, poster) {
      this.editform.id = id;
      this.editform.title = title;
      this.editform.description = description;
      this.editform.author = author;
      this.editform.poster = poster;
      this.changeForm = true;
    },
    showform: function () {
      this.showform = !this.showform;
    },
    fileHandle(event) {
      //console.log(files[0].name.url)
      this.form.poster = event.target.files[0];
      console.log(this.form.poster);
      //this.fileList.auth($event.target.file)
    },
    submitBook() {
      const form = new FormData();
      form.append("author", this.editform.author);
      form.append("title", this.editform.title);
      form.append("description", this.editform.description);
      if(this.editform.poster) {
        form.append("poster", this.editform.poster, this.editform.name);
      }
      
      API.put(`/api/book/${this.editform.id}`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then(() => this.$store.dispatch("loadbooks"))
      .then(this.changeForm = false);
    },
    uploadBook: function () {
      const uform = new FormData();
      uform.append("author", this.form.author);
      uform.append("title", this.form.title);
      uform.append("description", this.form.description);
      uform.append("poster", this.form.poster, this.form.name);
      console.log(uform);
      /* const uform ={"author": this.form.author, "title": this.form.title, "description": this.form.description, "poster": this.form.poster}*/
      API.post("/api/book/", uform, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then(() => (this.$message("Added"), this.$store.dispatch("loadbooks")))
        .then(this.dialogFormVisible = false)
        .then(this.dialogFormVisible = false)
        .catch(() => this.$message(Error));
    },
  },
};
</script>

<style>
#list {
  padding: 10px;
}

#books {
  padding: 10px;
}
</style>