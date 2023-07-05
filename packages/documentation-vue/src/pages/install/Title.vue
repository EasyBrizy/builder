<template>
  <span
    class="text-[40px] font-bold my-[14px] tracking-tighter break-all md:my-[0px] md:leading-[3rem] md:mb-[20px]"
  >
    {{ title }}
  </span>
</template>

<script lang="ts">
export default {
  name: "Title",
  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>
