<script setup>
const route = useRoute()
const { pending, data:products, error, execute } = await useLazyFetch('http://localhost:3000/products/list', {
  credentials: 'include'
})
const filteredProducts = computed(() => {
  const minPrice = parseFloat(route.query.minPrice) || 0
  const maxPrice = parseFloat(route.query.maxPrice) || Infinity
  return products.value?.filter(product => (product.ownedBy.city.toLowerCase()  === route.params.city.toLowerCase() && (product.ownedBy.name === route.params.make || !route.params.make)) && (product.price >= minPrice &&
    product.price <= maxPrice) ) || []
})

const cities = ref(new Set())
const state = reactive({products})
watchEffect(() => {
  state.products?.forEach(product => {
    if (product.ownedBy?.name) {
      cities.value.add(product.ownedBy.name)
    }
  })
})

const citiesArray = computed(() => Array.from(cities.value))
watch(
  ()=> route.query , 
  () => {
    window.location.reload();
  }
  )

</script>

<template>


   
  <div class="flex m-auto">
  <ProductSideBar :citiesArray="citiesArray"/>
  <div v-if="pending">Loading...</div>
  
  <div v-else>


    <div class="w-full">
      <div  v-for="product in filteredProducts">
        <div v-if="product.stock > 0 "
    class="
      relative
      shadow
      border
      w-full
      overflow-hidden
      mb-5
      cursor-pointer
      h-[200px]
    "
    style="min-width: 800px;;"
  >
 

    
    
    <div class="flex h-full" @click="navigateTo(`/product/${product.name}-${product._id}`)">
    
      <NuxtImg :src="`http://localhost:3000/images/${product.fileName}`" class="w-[300px] h-full" />
      
      <div class="p-4 flex flex-col">
        
        <div>
          <h1 class="text-2xl text-blue-700">{{ product.name }}
            
          </h1>
          <!--
          <div class="space-x-1 ml-5 absolute flex right-7 top-5 justify-end">
            <svg class="w-5 h-5 text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <svg class="w-5 h-5 text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <svg class="w-5 h-5 text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <svg class="w-5 h-5 text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <svg class="w-5 h-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
          -->
          <h4 class="text-gray-500 mb-4">{{ product.ownedBy.name }}</h4>
          <p class="text-gray-700">
            {{ product.description }}
          </p>
        </div>
        <h1 class="mt-auto text-xl">{{ product.price }} TL</h1>
        <h3 class="mt-auto text-xl text-gray-800 absolute right-7 bottom-4">Stok: {{ product.stock }}</h3>
      </div>
    </div>
      </div>
      </div>
      

    </div>
  </div>
  </div>
</template>
