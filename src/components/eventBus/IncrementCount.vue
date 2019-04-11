<!-- IncrementCount.vue -->
<template>
  <button @click="increment()">+</button>
</template>

<script>
import { EventBus } from "./EventBus.js";
export default {
  name: "IncrementCount",
  data() {
    return {
      num: 1,
      deg: 180,
      A: "A"
    };
  },
  methods: {
    increment() {
      EventBus.$emit("incremented", {
        num: this.num,
        deg: this.deg,
        A: this.A
      });
    }
  }
};
</script>