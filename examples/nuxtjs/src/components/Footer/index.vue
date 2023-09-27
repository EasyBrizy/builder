<template>
  <footer :style="styles">
    <h4>Footer Copyright</h4>
  </footer>
</template>

<script>
export default {
  name: "Footer_Component",
  data() {
    return {
      styles: {
        height: "80px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        backgroundColor: "antiquewhite",
      },
    };
  },
};
</script>
