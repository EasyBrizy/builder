<template>
  <div
    class="flex items-center justify-center bg-no-repeat bg-cover md:h-[100vh] md:bg-[url('https://a-cloud.b-cdn.net/media/original/20acd60ff6e49607aa60f60eee49bf8b/bg-brizy-builder.jpg')]"
  >
    <div
      class="flex flex-col text-cetaceanBlue font-sans bg-cover bg-no-repeat min-h-[100vh] md:min-h-[0vh] bg-[url('https://a-cloud.b-cdn.net/media/original/20acd60ff6e49607aa60f60eee49bf8b/bg-brizy-builder.jpg')] md:bg-none md:mx-[15px] md:flex-row lg:w-[1180px]"
    >
      <Information title="Documentation" />
      <Divider />
      <Steps :token="token" :href="href" />
    </div>
  </div>
</template>

<script lang="ts">
import Divider from "./Divider.vue";
import Information from "./Information.vue";
import Steps from "./Steps.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Install",
  props: {
    token: {
      type: String,
      required: true,
    },
    href: {
      type: String,
      required: true,
    },
  },
  components: {
    Divider,
    Information,
    Steps,
  },
});
</script>
