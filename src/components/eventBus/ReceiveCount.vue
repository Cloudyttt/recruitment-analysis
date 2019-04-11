
<template>
  <div id="receiveCount">
    {{A}}
    <div class="container" :style="{transform: 'rotateY(' + degValue + 'deg)'}">
      <div class="front">
        <div class="increment">
          <IncrementCount/>
        </div>
        <div class="show-front">{{fontCount}}</div>
        <div class="decrement">
          <DecreaseCount/>
        </div>
      </div>

      <div class="back">
        <div class="increment">
          <IncrementCount/>
        </div>
        <div class="show-back">{{backCount}}</div>
        <div class="decrement">
          <DecreaseCount/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import IncrementCount from "./IncrementCount";
import DecreaseCount from "./DecreaseCount";
import { EventBus } from "./EventBus.js";
export default {
  name: "Receive",
  components: {
    IncrementCount,
    DecreaseCount
  },
  data() {
    return {
      degValue: 0,
      fontCount: 0,
      backCount: 0,
      A: ""
    };
  },
  mounted() {
    EventBus.$on("incremented", ({ num, deg, A }) => {
      this.A = A;
      console.log(A);
      this.fontCount += num;
      this.$nextTick(() => {
        this.backCount += num;
        this.degValue += deg;
      });
    });
    EventBus.$on("decreased", ({ num, deg }) => {
      this.fontCount -= num;
      this.$nextTick(() => {
        this.backCount -= num;
        this.degValue -= deg;
      });
    });
  }
};
</script>