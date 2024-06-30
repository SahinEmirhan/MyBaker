<script setup>
import axios from 'axios'
definePageMeta({
  layout: "custom",
});
let {pending , data : listings , status} = await useLazyFetch("http://localhost:3000/products" , {credentials: 'include'} )
const state = reactive({listings})
console.log(state.listings)
const deleteListing = async (id) => {
let response = await axios.delete(`http://localhost:3000/products/${id}` , {withCredentials:true})
state.listings = state.listings.filter(listing => listing._id !== id)
}
console.log(listings)
const purchasedProducts = computed(() => {
  let temp = []
  for(let i = 0 ; i < state.listings?.length ; i++)
  {
    temp[i] = {purchased : state.listings[i].purchased , name: state.listings[i].name  , price: state.listings[i].price , fileName: state.listings[i].fileName  }  
  }
  
  return temp
})

const activeTab = ref('listed')
</script>
<style scoped>
button {
  transition: background-color 0.3s ease-in-out;
}
</style>
<template>
  <div>
    
    <!-- Tablar -->
    <div class="flex justify-center space-x-4 mt-24">
      <button 
        :class="{'bg-blue-500 text-white': activeTab === 'listed'}"
        class="py-2 px-4 rounded"
        @click="activeTab = 'listed'"
      >
        Listedeki Ürünler
      </button>
      <button 
        :class="{'bg-blue-500 text-white': activeTab === 'sold'}"
        class="py-2 px-4 rounded"
        @click="activeTab = 'sold'"
      >
        Satılan Ürünler
      </button>
      <button 
        :class="{'bg-blue-500 text-white': activeTab === 'delivered'}"
        class="py-2 px-4 rounded"
        @click="activeTab = 'delivered'"
      >
        Teslim Edilen Ürünler
      </button>
    </div>
    <div class="flex justify-end mt-10 items-center">
        <NuxtLink
          to="/profile/restaurant/listings/create"
          class="
            w-12
            h-12
            bg-blue-500
            flex
            justify-center
            items-center
            rounded-full
            text-white
            text-2xl
            font-bold
            shadow-lg
            hover:bg-blue-600
            transition
            duration-300
            ease-in-out
            cursor-pointer
          "
          >+
        </NuxtLink>
      </div>
    <!-- Listedeki Ürünler -->
    <div v-if="activeTab === 'listed'">
      

      <div v-if="!pending" >
        <div v-for="listing in state.listings" :key="listing._id" class="bg-white shadow-lg rounded-lg overflow-hidden  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-5">
          <div  class="flex">
            <img :src="`http://localhost:3000/images/${listing.fileName}`" alt="" class="w-40 h-40 object-cover" />
            <div class="p-4">
              <h1 class="text-2xl font-semibold">{{ listing.name }}</h1>
              <h1 class="text-lg font-medium text-gray-400">{{ listing.description }}</h1>
              <p class="text-blue-500 text-xl font-medium">{{ listing.price }} TL</p>
            </div>
          </div>
          <div class=" grid grid-rows-2 p-4 flex justify-end">
            <div>
              <NuxtLink
              class="text-blue-500 font-medium hover:underline"
              :to="`/profile/restaurant/listings/edit/${listing._id}`"
              >Düzenle
            </NuxtLink>
            
            <NuxtLink
              class="text-red-500 font-medium hover:underline ml-4"
              @click="deleteListing(listing._id)"
              to="#"
              >Sil
            </NuxtLink>
            
            </div>
            <p :class="listing.stock == 0 ? 'text-red-500' : 'text-green-500'" class=" text-xl font-medium m-auto">Stok : {{ listing.stock }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Satılan Ürünler -->
    <div v-if="activeTab === 'sold'">
      <div class="" v-for="purchasedProduct in purchasedProducts">
        <div v-for="item in purchasedProduct.purchased" :key="item._id">
          <div v-if="item.status == 'Purchased'" class="bg-white shadow-lg rounded-lg overflow-hidden grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-5">
            <div class="flex">
              <img :src="`http://localhost:3000/images/${purchasedProduct.fileName}`" alt="" class="w-40 h-40 object-cover" />
              <div class="p-4">
                <h1 class="text-2xl font-semibold">{{ purchasedProduct.name }}</h1>
                <p class="text-blue-500 text-xl font-medium">{{ purchasedProduct.price }} TL</p>
                <p class="text-gray-400 text-xl font-medium mt-2">Ürün : {{ item._id[item._id.length - 1]  + item._id[item._id.length - 2]  + item._id[item._id.length - 3] + item._id[item._id.length - 4] + item._id[item._id.length - 5] }}</p>
                
              </div>
              
            </div>
            <div class="p-4 flex justify-end">
              <NuxtLink
                class="text-blue-500 font-medium hover:underline"
                :to="`/profile/restaurant/listings/detail/${item._id}`"
                >Detay Görüntüle
              </NuxtLink>
              
            </div>
          </div>
          
        </div>
        
      </div>
    </div>

    <!-- Teslim Edilen Ürünler -->
    <div v-if="activeTab === 'delivered'">
      <div class="" v-for="purchasedProduct in purchasedProducts">
        <div v-for="item in purchasedProduct.purchased" :key="item._id">
          <div v-if="item.status == 'Delivered'" class="bg-white shadow-lg rounded-lg overflow-hidden grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
            <div class="flex">
              <img :src="`http://localhost:3000/images/${purchasedProduct.fileName}`" alt="" class="w-40 h-40 object-cover" />
              <div class="p-4">
                <h1 class="text-2xl font-semibold">{{ purchasedProduct.name }}</h1>
                <p class="text-blue-500 text-xl font-medium">{{ purchasedProduct.price }} TL</p>
                <p class="text-gray-400 text-xl font-medium mt-2">Ürün : {{ item._id[item._id.length - 1]  + item._id[item._id.length - 2]  + item._id[item._id.length - 3] + item._id[item._id.length - 4] + item._id[item._id.length - 5] }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

