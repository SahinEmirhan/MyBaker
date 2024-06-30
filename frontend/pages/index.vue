<script setup>
useHead({
  title: "Baker",
});
const {data} = useFetch(`/api/product/5`)
</script>

<template>
  <div>
    <ProductHero />
  </div>
</template>
  
