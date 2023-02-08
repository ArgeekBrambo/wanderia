<script>
export default {
  name: "CardBusinesses",
  props: ["business"],
};
</script>
<template>
  <div class="card border border-secondary" style="width: 18rem">
    <img
      class="card-img-top mt-2"
      style="height: 200px"
      :src="business.imageUrl"
      alt="Card image cap"
    />
    <div class="card-body">
      <h4 class="card-title font-weight-bold">
        <b>{{ business.name }}</b>
      </h4>
      <p class="card-text">{{ business.address }}</p>
    </div>
    <div class="d-flex justify-content-around mb-4">
      <RouterLink
        :to="`/business/${business.id}`"
        class="btn text-white"
        style="background-color: #4a388e"
        >Detail</RouterLink
      >
      <RouterLink
        :to="`/editbusiness/${business.id}`"
        class="btn text-white"
        style="background-color: #893189"
      >
        Edit
      </RouterLink>
      <a href="#" class="btn btn-danger">Delete</a>
    </div>
  </div>
</template>
