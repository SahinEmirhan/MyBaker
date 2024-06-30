<script setup>
import axios from 'axios'
const route = useRoute();

// Verileri çekmek için useLazyFetch kullanımı
const { pending, data: products, status } = useLazyFetch('http://localhost:3000/products', { credentials: 'include' })

// Verileri reaktif hale getirmek için ref kullanımı
const productsRef = ref([])

// Veriler yüklendiğinde productsRef güncellenir
watch(products, (newProducts) => {
  productsRef.value = newProducts
})

// route.params.id ile eşleşen ürünü bulmak için computed kullanımı
const product = computed(() => {
  return productsRef.value.find(product => product._id === route.params.id)
})
const onConfirm = async () => {
let response = await axios.put(`http://localhost:3000/products/${route.params.id}` , product.value , {withCredentials:true})
if(response.statusText == 'OK')
{
  return navigateTo('/profile/restaurant/listings')
}
}

</script>

<template>
   <div v-if="pending">Loading...</div>
   <div v-else-if="product" class="rounded shadow-lg my-20 bg-white max-w-4xl mx-auto">
    <div class="flex justify-center p-10 border-b">
      <NuxtImg :src="`http://localhost:3000/images/${product.fileName}`" class="w-full rounded-lg" style="max-height: 750px; max-width: 750px;" alt="Product Image" />
    </div>
    <div class="p-10 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <div class="flex flex-col">
        <label class="text-2xl mb-2" for="productName">Name</label>
        <input v-model="product.name" id="productName" type="text" class="form-input px-4 py-2 border rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" required />
      </div>
      <div class="flex flex-col">
        <label class="text-2xl mb-2" for="productPrice">Price</label>
        <input v-model="product.price" id="productPrice" type="text" class="form-input px-4 py-2 border rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" required />
      </div>
      <div class="flex flex-col">
        <label class="text-2xl mb-2" for="productStock">Stock</label>
        <input v-model="product.stock" id="productStock" type="text" class="form-input px-4 py-2 border rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" required />
      </div>
      <div class="col-span-full">
        <label class="text-2xl mb-2" for="productDescription">Description</label>
        <textarea v-model="product.description" id="productDescription" class="form-input w-full px-4 py-2 border rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" rows="4" required></textarea>
      </div>
    </div>
    <div class="flex justify-center p-10">
      <button @click="onConfirm" class="text-white bg-blue-500 px-10 py-3 rounded-lg hover:bg-blue-600 transition-colors duration-300">
        Onayla
      </button>
    </div>
  </div>
    <div v-else>
      Product not found
  </div>
</template>

