<script>
import { useMutation, useQuery } from "@vue/apollo-composable";
import gql from "graphql-tag";
import { useRoute } from "vue-router";
import { ALL_CATEGORIES } from "../stores/queries";

export default {
  name: "AddPost",
  data() {
    return {
      input: {
        name: "",
        photo: "",
        link: "",
        access_token: localStorage.getItem("access_token"),
      },
    };
  },
  setup() {
    const { mutate: UploadPhoto } = useMutation(
      gql`
        mutation UploadPhoto($input: NewPartnerPost) {
          uploadPhoto(input: $input) {
            BusinessId
            id
            imageUrl
            link
            name
          }
        }
      `
    );
    const { result, loading, error } = useQuery(ALL_CATEGORIES);
    return {
      UploadPhoto,
      result,
      loading,
      error,
    };
  },
  methods: {
    onFileChange(e) {
      console.log(e);
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files[0]);
    },
    createImage(file) {
      console.log(file);
      var image = new Image();
      var reader = new FileReader();
      var vm = this;

      reader.onload = (e) => {
        vm.input.photo = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    async handleAddPost() {
      try {
        console.log("masuk");
        await this.UploadPhoto({
          input: {
            BusinessId: +this.$route.params.id,
            photo: this.input.photo,
            link: this.input.link,
            name: this.input.name,
            access_token: localStorage.access_token,
          },
        });
        this.$router.push(`/business/${this.$route.params.id}`);
        Swal.fire({
          title: "Postingan Berhasil Ditambah",
        });
      } catch (error) {
        Swal.fire(error.message);
      }
    },
  },
};
</script>

<template>
  <div>
    <main
      class="form-register w-100 position-absolute top-50 start-50 translate-middle"
    >
      <div class="card">
        <img
          src="../assets/wanderia.png"
          class="mx-auto d-block pt-3"
          alt="Wanderia"
          width="100"
        />
        <div class="card-body">
          <h1 class="h3 mb-3 fw-normal">Add Post</h1>
          <form @submit.prevent="handleAddPost">
            <div class="mb-3">
              <label for="name" class="form-label">Name</label>
              <input
                v-model="input.name"
                type="text"
                class="form-control"
                id="name"
              />
            </div>
            <div class="mb-3">
              <label for="imageUrl" class="form-label">Image</label>
              <input
                @change="onFileChange"
                type="file"
                class="form-control"
                id="imageUrl"
              />
            </div>
            <div class="mb-3">
              <label for="imageUrl" class="form-label">Link Promosi</label>
              <input
                v-model="input.link"
                type="text"
                class="form-control"
                id="name"
              />
            </div>

            <button
              class="w-100 btn btn-lg text-white"
              type="submit"
              style="background-color: #4a388e"
            >
              Submit
            </button>
            <a
              href="/dashboard"
              class="w-100 btn btn-lg text-white mt-2"
              style="background-color: #893189"
            >
              Cancel
            </a>
          </form>
        </div>
      </div>
    </main>
  </div>
</template>
