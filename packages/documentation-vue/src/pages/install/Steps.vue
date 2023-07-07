<template>
  <div
    class="flex flex-col flex-[2_2_0%] mx-[15px] md:my-[20px] md:ml-[15px] lg:ml-[75px]"
  >
    <div class="mb-[15px] md:mb-[0px]"></div>
    <Step title="Step 1: Find the environment variables">
      <div class="text-[17px] break-all">
        <div>
          <span class="leading-8">
            In tab <i>Setting</i> access the menu{{ " " }}
            <i>
              <a class="text-oceanBlue" target="_blank" href="{{ href }}">
                Environment Variables
              </a>
              .
            </i>
          </span>
        </div>
      </div>
    </Step>
    <div class="mb-[59px]"></div>
    <Step title="Step 2: Fill the environment variable">
      <div class="text-[17px] break-all">
        <span class="leading-8">
          The <i>key</i> should be: <b>API_KEY</b> and the <i>value</i>
          {{ " : " }}
          <br />
          <br />
          <div>
            <i>{{ token }}</i>
            &nbsp; &nbsp; &nbsp;
            <button class="text-oceanBlue" @click="copyToClipboard">
              <b>Copy</b>
            </button>
          </div>
        </span>
      </div>
    </Step>
    <div class="mb-[59px]"></div>
    <Step title="Step 3: Redeploy your project">
      <div class="text-[17px] break-all">
        <div>
          <span class="leading-8">
            <a class="text-oceanBlue" href="{{ href }}" target="_blank">
              Redeploy </a
            >{{ " " }}
            your project to update the value of these variables in the
            deployment.
          </span>
        </div>
      </div>
    </Step>
    <!--    <div className="mb-[65px]" />-->
    <!--    <div className="text-[16px] text-russianViolet opacity-60 leading-[1.8rem] tracking-[-.023em]">-->
    <!--      <em>-->
    <!--        Note: Please use the following credentials to add Brizy to Vercel.-->
    <!--      </em>-->
    <!--    </div>-->
  </div>
</template>

<script lang="ts">
import Step from "./Step.vue";
import { defineComponent } from "vue";

interface StepsData {
  tokenValue?: string;
  hrefValue?: string;
}

export default defineComponent({
  name: "Steps",
  components: {
    Step,
  },
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
  data(): StepsData {
    return {
      tokenValue: this.token || "",
      hrefValue: this.href || "",
    };
  },
  methods: {
    copyToClipboard() {
      const tokenValue = this.tokenValue || "";
      navigator.clipboard.writeText(tokenValue);
    },
  },
});
</script>
