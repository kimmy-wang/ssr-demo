<template>
  <div>App</div>
  <nav>
    <router-link to="/">Demo</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view />
</template>

<script lang="ts">
export default {
  name: "App",
};
</script>

<style scoped></style>
