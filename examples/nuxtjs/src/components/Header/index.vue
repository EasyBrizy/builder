<template>
  <header :style="styles">
    <h1>Services page</h1>
  </header>
</template>

<script>
export default {
  name: "Header_Component",
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
