<template>
  <div
    class="flex flex-col justify-center items-center min-h-screen bg-no-repeat bg-cover bg-[url('https://a-cloud.b-cdn.net/media/original/20acd60ff6e49607aa60f60eee49bf8b/bg-brizy-builder.jpg')] bg-red-800 p-[20px]"
  >
    <div class="img">
      <img
        height="90px"
        width="90px"
        src="https://a-cloud.b-cdn.net/media/original/0218ab9f5dcad9d431490666835988d0/Brizy new mark.svg"
        alt=""
        draggable="false"
        loading="lazy"
      />
    </div>
    <div
      class="text-[36px] md:text-[38px] lg:text-[60px] text-center font-bold leading-[46px] pt-[50px] pb-[40px] tracking-[-1px] lg:w-[820px] lg:leading-[72px] lg:tracking-[-2px]"
    >
      Welcome to Brizy
    </div>
    <div
      class="text-center text-[15px] font-light pb-[50px] leading-[24px] lg:text-[20px] lg:w-[820px] lg:leading-[38px]"
    >
      To integrate our template on Vercel please click on{{ " " }}
      <span class="font-bold text-oceanBlue">connect</span> button to receive
      the API_KEY.
    </div>
    <button
      class="bg-oceanBlue text-[15px] md:text-[17px] font-bold py-[11px] px-[25px] rounded-[4px] text-white lg:py-[19px] lg:px-[44px] lg:tracking-[1px] lg:text-[15px]"
      @click="handleClick"
    >
      CONNECT
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Welcome",
  props: {
    href: {
      type: String,
      required: true,
    },
  },
  methods: {
    handleClick(): void {
      const hrefValue = this.$props.href;
      window.location.replace(hrefValue);
    },
  },
});
</script>
