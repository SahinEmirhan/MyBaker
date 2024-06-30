<script setup>
const props = defineProps({
  listing: Object,
});
const emit = defineEmits(['delete-listing']);
</script>

<template>
  <div class="shadow rounded overflow-hidden flex justify-between mb-4">
    <div class="flex">
      <img :src="`http://localhost:3000/images/${listing.fileName}`" alt="" class="w-80 mr-3 h-44" />
      <div class="p-3">
        <h1 class="text-2xl">{{ listing.name }}</h1>
        <p class="text-blue-400">{{ listing.price }} TL</p>
      </div>
    </div>
    <div class="p-3 flex">
      <NuxtLink
        class="text-blue-400 mr-4"
        :to="`/profile/restaurant/listings/edit/${listing._id}`"
        >Düzenle
      </NuxtLink>
      <p @click="emit('delete-listing',listing._id)" class="text-red-400 cursor-pointer">Sil</p>
    </div>
  </div>
</template>