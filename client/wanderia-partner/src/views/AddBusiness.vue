<script>
import { useMutation, useQuery } from "@vue/apollo-composable";
import gql from "graphql-tag";
import { ALL_CATEGORIES } from "../stores/queries";

export default {
  name: "AddBusiness",
  data() {
    return {
      input: {
        name: "",
        CategoryId: 0,
        mapUrl: "",
        imageUrl: "",
        price: "",
        rating: "",
        address: "",
        access_token: localStorage.getItem("access_token"),
      },
    };
  },
  setup() {
    const { mutate: addNewPartnerBusiness } = useMutation(
      gql`
        mutation addNewPartnerBusiness($input: NewPartnerBusiness) {
          addNewPartnerBusiness(input: $input) {
            id
            name
            latitude
            longitude
            address
            CategoryId
            PartnerId
            status
            imageUrl
            rating
            price
          }
        }
      `
    );
    const { result, loading, error } = useQuery(ALL_CATEGORIES);
    return {
      addNewPartnerBusiness,
      result,
      loading,
      error,
    };
  },
  methods: {
    async handleAddBusiness() {
      try {
        let { data } = await this.addNewPartnerBusiness({
          input: this.input,
        });
        this.$router.push("/dashboard");
        Swal.fire({
          title: "Bisnis Berhasil Ditambah",
        });
      } catch (error) {
        Swal.fire(error.message);
      }
    },
  },
};
</script>

<template>
  <div class="d-flex align-self-center">
    <main class="form-register w-100 m-auto">
      <div class="card">
        <img
          src="../assets/wanderia.png"
          class="mx-auto d-block pt-3"
          alt="Wanderia"
          width="100"
        />
        <div class="card-body">
          <h1 class="h3 mb-3 fw-normal">Add Business</h1>
          <form @submit.prevent="handleAddBusiness">
            <div class="mb-3">
              <label for="name" class="form-label">Name</label>
              <input
                type="text"
                v-model="input.name"
                class="form-control"
                id="name"
              />
            </div>
            <div class="mb-3">
              <label for="price" class="form-label">Price</label>
              <input
                type="text"
                v-model="input.price"
                class="form-control"
                id="price"
              />
            </div>
            <div class="mb-3">
              <label for="rating" class="form-label">Rating</label>
              <input
                type="text"
                v-model="input.rating"
                class="form-control"
                id="rating"
              />
            </div>
            <div class="mb-3">
              <label for="address" class="form-label">Address</label>
              <input
                type="text"
                v-model="input.address"
                class="form-control"
                id="address"
              />
            </div>
            <div class="mb-3" v-if="result">
              <label for="categoryId" class="form-label">Category</label>
              <select
                v-model="input.CategoryId"
                class="form-select"
                aria-label="Default select example"
              >
                <option disabled value="0">Select category</option>
                <option
                  v-for="category in result.allPartnerCategories"
                  :key="`${category.id}-1`"
                  :value="+category.id"
                >
                  {{ category.name }}
                </option>
                <!-- <option value="2">Two</option>
                  <option value="3">Three</option> -->
              </select>
            </div>
            <div class="mb-3">
              <label for="mapUrl" class="form-label">Map URL</label>
              <input
                type="text"
                v-model="input.mapUrl"
                class="form-control"
                id="mapUrl"
              />
            </div>
            <div class="mb-3">
              <label for="imageUrl" class="form-label">Image</label>
              <input
                type="text"
                v-model="input.imageUrl"
                class="form-control"
                id="imageUrl"
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
