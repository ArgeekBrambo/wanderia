<script>
import { useMutation } from "@vue/apollo-composable";
import gql from "graphql-tag";

export default {
  name: "Register",
  data() {
    return {
      input: {
        name: "",
        email: "",
        password: "",
      },
    };
  },
  setup() {
    const { mutate: addNewUser } = useMutation(
      gql`
        mutation addNewUser($input: NewPartnerUser) {
          addNewUser(input: $input) {
            id
            name
            email
          }
        }
      `
    );
    return {
      addNewUser,
    };
  },
  methods: {
    async handleRegister() {
      try {
        let { data } = await this.addNewUser({
          input: this.input,
        });
        this.$router.push("/login");
        Swal.fire({
          title: "Register Berhasil",
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
      class="form-signin w-100 m-auto position-absolute top-50 start-50 translate-middle border border-secondary border-2 rounded-4 shadow p-3 bg-body-tertiary rounded"
    >
      <RouterLink to="/">
        <img
          src="../assets/logo-wanderia.png"
          class="mx-auto d-block pb-4"
          alt="Wanderia"
          width="200"
        />
      </RouterLink>
      <form @submit.prevent="handleRegister">
        <h1 class="h3 mb-3 fw-normal">Register</h1>

        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Name</label>
          <input
            v-model="input.name"
            type="text"
            class="form-control"
            id="name"
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Email</label>
          <input
            v-model="input.email"
            type="email"
            class="form-control"
            id="email"
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Password</label>
          <input
            v-model="input.password"
            type="password"
            class="form-control"
            id="password"
          />
        </div>

        <button class="w-100 btn btn-lg btn-primary mb-2" type="submit">
          Register
        </button>
        <center>
          <p>Sudah punya akun? <a href="/login">Login</a></p>
        </center>
      </form>
    </main>
  </div>

  <!-- <div class="d-flex align-self-center mt-5">
    <main class="form-signin w-100 m-auto">
      <RouterLink to="/">
        <img
          src="../assets/logo-wanderia.png"
          class="mx-auto d-block pb-4"
          alt="Wanderia"
          width="200"
        />
      </RouterLink>
      <form @submit.prevent="handleRegister">
        <h1 class="h3 mb-3 fw-normal">Register</h1>

        <div class="mb-3">
          <label for="name" class="col-sm-2 col-form-label">Name</label>

          <input
            type="text"
            v-model="input.name"
            class="form-control"
            id="name"
          />
        </div>
        <div class="mb-3">
          <label for="email" class="col-sm-2 col-form-label"
            >Email address</label
          >

          <input
            type="email"
            v-model="input.email"
            class="form-control"
            id="email"
          />
        </div>
        <div class="mb-3">
          <label for="password" class="col-sm-2 col-form-label">Password</label>

          <input
            type="password"
            v-model="input.password"
            class="form-control"
            id="password"
          />
        </div>

        <button class="w-100 btn btn-lg btn-primary mb-2" type="submit">
          Register
        </button>
        <center>
          <p>Sudah punya akun? <a href="/login">Login</a></p>
        </center>
      </form>
    </main>
  </div> -->
</template>
