<template>
  <div
    class="flex flex-col flex-[2_2_0%] mx-[15px] md:my-[20px] md:ml-[15px] lg:ml-[75px]"
  >
    <div class="mb-[15px] md:mb-[0px]"></div>
    <Step title="Step 1: Choose project">
      <div class="text-[17px]">
        <div>
          <span class="leading-8">
            Access the project from <i>Dashboard</i>.
          </span>
        </div>
      </div>
    </Step>
    <div className="mb-[59px]"></div>
    <Step title="Step 2: Find the environment variables">
      <div className="text-[17px] break-all">
        <div>
          <span className="leading-8">
            In tab <i>Setting</i> access the menu{{ " " }}
            <i>Environment Variables.</i>
          </span>
        </div>
      </div>
    </Step>
    <div className="mb-[59px]"></div>
    <Step title="Step 3: Fill the environment variable">
      <div className="text-[17px] break-all">
        <span className="leading-8">
          The <i>key</i> should be: <b>API_KEY</b> and the <i>value</i>
          {{ " : " }}
          <br />
          <br />
          <div>
            <i>{{ token }}</i>
            &nbsp; &nbsp; &nbsp;
            <button className="text-oceanBlue" @click="copyToClipboard">
              <b>Copy</b>
            </button>
          </div>
        </span>
      </div>
    </Step>
  </div>
</template>

<script lang="ts">
import Step from "./Step.vue";

export default {
  name: "Steps",
  components: {
    Step,
  },
  props: {
    token: {
      type: String,
      required: false,
    },
  },
  methods: {
    copyToClipboard() {
      const tokenValue = this.token ?? "";
      navigator.clipboard.writeText(tokenValue);
    },
  },
};
</script>
