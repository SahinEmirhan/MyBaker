<script setup>
import axios from 'axios'
const route = useRoute();
// Verileri çekmek için useLazyFetch kullanımı
const { pending, data: products, status } = await useLazyFetch('http://localhost:3000/products', { credentials: 'include' })

// Verileri reaktif hale getirmek için ref kullanımı
const productsRef = reactive({products})

// Veriler yüklendiğinde productsRef güncellenir
watch(products, (newProducts) => {
  productsRef.products = newProducts
})

// route.params.id ile eşleşen ürünü bulmak için computed kullanımı
const product = computed(() => {
  for(let i = 0 ; i < productsRef.products.length; i++)
  {
    
    for(let j = 0 ; j < productsRef.products[i].purchased.length ; j++)
    {
      if(productsRef.products[i].purchased[j]._id == route.params.id)
      {
        return productsRef.products[i]
      }
    }
    
  }
})

definePageMeta({
  layout: "custom",
});

let deliveryCode = ref("");
const onConfirm = async () => {
  console.log(deliveryCode.value)
let response = await axios.post(`http://localhost:3000/products/${product.value._id}/deliver` , {code : parseInt(deliveryCode.value)} , {withCredentials:true})
if(response.statusText == 'OK')
{
  return navigateTo('/profile/restaurant/listings')
}
}

</script>

<template>
  <div class="max-w-4xl mx-auto p-5">
    <div v-if="pending" class="text-center text-lg py-10">Loading...</div>
    <div v-else class="bg-white rounded-lg shadow-lg overflow-hidden mt-20">
      <div class="relative">
        <NuxtImg :src="`http://localhost:3000/images/${product.fileName}`" class="w-full h-auto object-cover" alt="Product Image" />
      </div>
      <div class="p-5">
        <div class="flex justify-between items-center border-b pb-5 mb-5">
          <h1 class="text-4xl font-bold">{{ product?.name }}</h1>
          <h3 class="text-4xl font-semibold text-blue-500">{{ product?.price }} TL</h3>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h3 class="text-3xl font-medium mb-2">Description</h3>
            <p class="text-xl text-gray-700">{{ product.description }}</p>
          </div>
          <div>
            <h3 class="text-3xl font-medium mb-2">Delivery Code</h3>
            <div class="pb-10 flex items-center space-x-4">
              <input v-model="deliveryCode" type="text" class="form-input py-3 border-2 border-gray-400 px-5" required />
              <button @click="onConfirm" class="text-white bg-green-700 px-8 py-3">
                Teslim Et
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

