<script>
import { useMutation } from "@vue/apollo-composable";
import gql from "graphql-tag";

export default {
  name: "PostCard",
  props: ["post"],
  methods: {
    async handleDelete() {
      try {
        let { data } = await this.deletePost({
          input: this.input,
        });
        this.$router.push("/business/");
      } catch (error) {
        console.log(error);
      }
    },
  },
  setup() {
    const { mutate: deletePost } = useMutation(
      gql`
        mutation deletePost($input: DeletePost) {
          deletePost(input: $input) {
            message
          }
        }
      `
    );
    return {
      deletePost,
    };
  },
};
</script>
<template>
  <div class="card" style="width: 18rem">
    <img
      class="card-img-top mt-2"
      style="height: 200px"
      :src="post.imageUrl"
      alt="Card image cap"
    />
    <div class="card-body">
      <h5 class="card-title">{{ post.name }}</h5>
      <p class="card-text">{{ post.link }}</p>
      <div class="d-flex justify-content-end mb-2">
        <!-- nanti buat methode delete -->
        <a
          href=""
          class="btn btn-danger me-3 text-white"
          @submit.prevent="handleDelete"
          >Delete</a
        >
      </div>
    </div>
  </div>
</template>
