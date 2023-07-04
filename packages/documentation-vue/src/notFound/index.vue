<template>
  <div
    class="flex flex-col justify-center items-center min-h-screen bg-no-repeat bg-cover bg-[url('https://a-cloud.b-cdn.net/media/original/20acd60ff6e49607aa60f60eee49bf8b/bg-brizy-builder.jpg')] bg-red-800"
  >
    <div class="img">
      <img src="./assets/warning.svg" class="w-[64px] h-[64px]" alt="Warning" />
    </div>
    <div
      class="text-[40px] md:text-[38px] lg:text-[40px] text-center font-bold leading-[46px] pt-[50px] mb-[30px] tracking-[-2px] lg:w-[820px] lg:leading-[72px] lg:tracking-[-2px]"
    >
      Error: missing keys in the config
    </div>
    <div class="mb-[10px] text-[15px] lg:text-[20px] font-light">
      <span>Site URL: </span>
      <span class="text-oceanBlue">Next_Public_Site-URL</span>
    </div>
    <div class="mb-[30px] lg:text-[20px] text-[15px] font-light">
      <span>Vercel URL: </span>
      <span class="text-oceanBlue">Next_Public_Vercel_URL</span>
    </div>
    <div
      class="text-center text-[16px] text-russianViolet opacity-60 font-light pb-[50px] leading-[30px] mx-[20px] lg:w-[820px] lg:leading-[38px]"
    >
      <i>Note: Please make sure to add the correct API keys in the config.</i>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "NotFound",
};
</script>
