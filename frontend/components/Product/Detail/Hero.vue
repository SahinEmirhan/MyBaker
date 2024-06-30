<script setup>
const props = defineProps({
  product: Object,
  starOrt : Number,
});
</script>

<template>
  <div class="mt-10">
    <NuxtImg :src="`http://localhost:3000/images/${product?.fileName}`" class="w-full" alt="" />
    <h1 class="mt-10 text-4xl">{{ product.name }}</h1>
    <div class="flex space-x-1 ml-5">
            <svg v-for="i in starOrt" :key="i" class="w-5 h-5 text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <svg v-for="i in (5 - starOrt)" :key="i" class="w-5 h-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
    </div>
    <div class="text-slate-500 flex text-lg mt-3 border-b pb-5 justify-between">
      <div>
        <p class="font-bold text-2xl">{{ product.price }} TL</p>
      </div>

      <div>
        <p class="font-bold text-dark-500 text-2xl">Stok : {{ product.stock }}</p>
      </div>
    </div>
  </div>
</template>