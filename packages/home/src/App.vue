<template>
  <hello />
</template>

<script lang="ts">
// Import our components from component directory
import Hello from "@/components/hello.vue";

// Use our components in our App.vue template
export default {
  components: {
    Hello,
  },
};
</script>
