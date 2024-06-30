<script setup>
const city = ref("");
const cityError = ref(false);

const handleSearch = () => {
  if (!city.value) {
    return (cityError.value = true);
  }
  navigateTo(`/city/${city.value}/product`);
};
</script>

<template>
  <div
    class="
      font-serif
      w-[1000px]
      text-2xl
      rounded-full
      bg-white
      flex
      justify-between
      overflow-hidden
      drop-shadow-2xl
      mx-auto
    "
  >
    <input
      type="text"
      class="py-3 px-5 w-full text-2xl rounded-top rounded-bottom rounded-left focus:outline-none"
      :class="cityError ? 'border-red-500 border' : ''"
      placeholder="Şehir Giriniz..."
      v-model="city"
      @keydown.enter="handleSearch"
    />
    <button class="bg-sky-500 px-10 text-white"  @click="handleSearch">
      Ara
    </button>
  </div>
</template>