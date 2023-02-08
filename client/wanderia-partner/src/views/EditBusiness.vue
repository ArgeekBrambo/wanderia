<script>
import { useMutation, useQuery } from "@vue/apollo-composable";
import gql from "graphql-tag";
import { useRoute } from "vue-router";
import { ALL_CATEGORIES, ONE_BUSINESS } from "../stores/queries";

export default {
  name: "EditBusiness",
  watch: {
    result1(newResult1, oldResult1) {
      this.setResultToInput(newResult1);
    },
  },
  data() {
    return {
      input: {
        id: 0,
        name: "",
        CategoryId: 0,
        imageUrl: "",
        price: "",
        rating: "",
        address: "",
        access_token: "",
      },
    };
  },
  setup() {
    const route = useRoute();
    const { mutate: editPartnerBusiness } = useMutation(
      gql`
        mutation editPartnerBusiness($input: EditPartnerBusiness) {
          editPartnerBusiness(input: $input) {
            message
          }
        }
      `
    );
    const { result, loading, error } = useQuery(ALL_CATEGORIES);
    const {
      result: result1,
      loading: loading1,
      error: error1,
    } = useQuery(ONE_BUSINESS, {
      onePartnerBusinessId: route.params.id,
    });
    return {
      editPartnerBusiness,
      result,
      loading,
      error,
      result1,
      loading1,
      error1,
    };
  },
  methods: {
    async handleEditBusiness() {
      try {
        let { data } = await this.editPartnerBusiness({
          input: {
            id: this.input.id,
            name: this.input.name,
            CategoryId: this.input.CategoryId,
            imageUrl: this.input.imageUrl,
            price: this.input.price,
            rating: this.input.rating,
            address: this.input.address,
            access_token: this.input.access_token,
          },
        });
        // console.log(this.input)
        this.$router.push("/dashboard");
        Swal.fire({
          title: "Bisnis Berhasil Diedit",
        });
      } catch (error) {
        Swal.fire(error.message);
      }
    },
    setResultToInput() {
      this.input = {
        ...this.result1.onePartnerBusiness,
        id: +this.$route.params.id,
        access_token: localStorage.access_token,
      };
    },
  },
};
</script>

<template>
  <div class="d-flex align-self-center">
    <main class="form-register w-100 m-auto">
      <img
        src="../assets/logo-wanderia.png"
        class="mx-auto d-block pb-4"
        alt="Wanderia"
        width="100px"
      />
      <form @submit.prevent="handleEditBusiness">
        <h1 class="h3 mb-3 fw-normal">Edit Business</h1>

        <div class="mb-3 row">
          <label for="name" class="col-sm-2 col-form-label">Name</label>
          <div class="col-sm-10">
            <input
              type="text"
              v-model="input.name"
              class="form-control"
              id="name"
            />
          </div>
        </div>
        <div class="mb-3 row">
          <label for="price" class="col-sm-2 col-form-label">Price</label>
          <div class="col-sm-10">
            <input
              type="text"
              v-model="input.price"
              class="form-control"
              id="price"
            />
          </div>
        </div>
        <div class="mb-3 row">
          <label for="rating" class="col-sm-2 col-form-label">Rating</label>
          <div class="col-sm-10">
            <input
              type="text"
              v-model="input.rating"
              class="form-control"
              id="rating"
            />
          </div>
        </div>
        <div class="mb-3 row">
          <label for="address" class="col-sm-2 col-form-label">Address</label>
          <div class="col-sm-10">
            <input
              type="text"
              v-model="input.address"
              class="form-control"
              id="address"
            />
          </div>
        </div>
        <div class="mb-3 row" v-if="result">
          <label for="categoryId" class="col-sm-2 col-form-label"
            >Category ID</label
          >
          <div class="col-sm-10">
            <select
              v-model="input.CategoryId"
              class="form-select"
              aria-label="Default select example"
            >
              <!-- <option disabled value="0">Open this select menu</option> -->
              <option
                v-for="category in result.allPartnerCategories"
                :key="`${category.id}-2`"
                :value="+category.id"
              >
                {{ category.name }}
              </option>
            </select>
          </div>
        </div>
        <!-- <div class="mb-3 row">
                    <label for="mapUrl" class="col-sm-2 col-form-label">Map URL</label>
                    <div class="col-sm-10">
                        <input type="text" v-model="input.mapUrl" class="form-control" id="mapUrl" />
                    </div>
                </div> -->
        <div class="mb-3 row">
          <label for="imageUrl" class="col-sm-2 col-form-label">Image</label>
          <div class="col-sm-10">
            <input
              type="text"
              v-model="input.imageUrl"
              class="form-control"
              id="imageUrl"
            />
          </div>
        </div>

        <button
          class="w-100 btn btn-lg btn-primary"
          type="submit"
          style="margin-bottom: 10px"
        >
          Submit
        </button>
        <RouterLink to="/dashboard">
          <button class="w-100 btn btn-lg btn-danger" type="button">
            Cancel
          </button>
        </RouterLink>
      </form>
    </main>
  </div>
</template>
