<script>
// import { mapActions } from "pinia";
// import { useCounterStore } from "../stores/counter";
import { useQuery, useMutation } from "@vue/apollo-composable";
// import { PARTNER_LOGIN_QUERY } from "../stores/queries";
// import { gql } from "@apollo/client";
import gql from "graphql-tag";

export default {
  name: "login",
  setup() {
    const { mutate: login } = useMutation(
      gql`
        mutation login($input: InputLogin) {
          login(input: $input) {
            access_token
          }
        }
      `
    );
    return {
      login,
    };
  },
  data() {
    return {
      input: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async handleLogin() {
      try {
        // console.log(this.login);
        let { data } = await this.login({
          input: this.input,
        });
        localStorage.setItem("access_token", data.login.access_token);
        this.$router.push("/dashboard");
        Swal.fire({
          title: "Login Berhasil",
        });
        // console.log(result);
      } catch (error) {
        Swal.fire(error.message);
      }
    },
    // ...mapActions(useCounterStore, ["login"]),
    // loginPost() {
    //   let user = {
    //     email: this.email,
    //     password: this.password,
    //   };
    //   this.login(user);
    // },
    // async login() {
    // console.log(this);
    // console.log(gql);
    // const { data } = await this.$apollo.mutate({
    //   mutation: gql`
    //     mutation Mutation($input: InputLogin) {
    //       login(input: $input) {
    //         access_token
    //       }
    //     }
    //   `,
    //   variables: {
    //     InputLogin: {
    //       email: this.email,
    //       password: this.password,
    //     },
    //   },
    // });
    // localStorage.setItem("access_token", data.access_token);
    // },
  },
};
</script>

<template>
  <div>
    <main
      class="form-signin w-100 position-absolute top-50 start-50 translate-middle border border-secondary border-2 rounded-4 shadow p-3 bg-body-tertiary rounded"
    >
      <RouterLink to="/">
        <img
          src="../assets/logo-wanderia.png"
          class="mx-auto d-block pb-4"
          alt="Wanderia"
          width="200"
        />
      </RouterLink>
      <form @submit.prevent="handleLogin">
        <h1 class="h3 mb-3 fw-normal">Login</h1>

        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label"
            >Email address</label
          >
          <input
            v-model="input.email"
            type="email"
            class="form-control border border-secondary"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Password</label>
          <input
            v-model="input.password"
            type="password"
            class="form-control border border-secondary"
            id="exampleInputPassword1"
          />
        </div>

        <button class="w-100 btn btn-lg btn-primary mb-2" type="submit">
          Sign in
        </button>
        <div class="text-center">
          <p>Belum punya akun? <a href="/register">Register</a></p>
        </div>
      </form>
    </main>
  </div>
</template>
