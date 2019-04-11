<!-- DecreaseCount.vue -->
<template>
  <div>
    <button>{{A}}</button>
    <button @click="decrease()">-</button>
  </div>
</template>

<script>
import { EventBus } from "./EventBus.js";
export default {
  name: "DecreaseCount",
  data() {
    return {
      num: 1,
      deg: 180,
      A: ""
    };
  },
  methods: {
    decrease() {
      EventBus.$emit("decreased", {
        num: this.num,
        deg: this.deg
      });
    }
  },
  mounted() {
    EventBus.$on("incremented", ({ num, deg, A }) => {
      this.A = A;
      console.log(A);
    });
  }
};
</script>