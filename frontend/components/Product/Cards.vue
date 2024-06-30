<script setup>
const props = defineProps(
  {
    products 
  }
)
const favorite = useLocalStorage("favorite", {});

const handleFavorite = (id) => {
  if (id in favorite.value) {
    delete favorite.value[id];
  } else {
    favorite.value = {
      ...favorite.value,
      [id] : true
    }
  }
};
</script>

<template>
  <div class="w-full">

    <ProductCard
      v-for="product in products"
      :key="product._id"
      :product="product"
      @favor="handleFavorite"
      :favored="product._id in favorite"
    />
  </div>
</template>