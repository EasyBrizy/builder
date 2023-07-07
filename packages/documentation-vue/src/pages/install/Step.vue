<template>
  <div class="flex">
    <div class="flex-none w-12 mr-[6px]">
      <img src="./asset/check.svg" class="w-[34px] h-[34px]" alt="Check" />
    </div>
    <div class="flex-1">
      <h1 class="text-[24px] font-bold mt-[4px] mb-[6px] tracking-[-.02em]">
        {{ title }}
      </h1>
      <div class="text-gray-700">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "Step",
  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>
