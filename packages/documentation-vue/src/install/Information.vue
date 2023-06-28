<template>
  <div
    class="flex flex-col flex-[1_1_0%] my-[25px] mx-[15px] md:my-[20px] md:mr-[18px]"
  >
    <Title :title="title"></Title>
    <Description>
      <div class="lg:text-[20px] lg:leading-[2.40rem]">
        <span>
          To connect our template to <b>Vercel</b> you should accomplish a few
          steps which you can find on the right.
        </span>
      </div>
    </Description>
  </div>
</template>

<script lang="ts">
import Description from "./Description.vue";
import Title from "./Title.vue";

export default {
  name: "Information",
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  components: {
    Description,
    Title,
  },
};
</script>
