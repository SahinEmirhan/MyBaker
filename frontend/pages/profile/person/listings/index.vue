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
    temp[i] = {purchased : state.listings[i].purchased , name: state.listings[i].name  , price: state.listings[i].price , fileName: state.listings[i].fileName , id : state.listings[i]._id  }  
  }
  
  return temp
})
const activeTab = ref('purchased')
</script>

<template>
  <div class="container mx-auto p-8">
    <!-- Tablar -->
    <div class="flex justify-center space-x-4 mt-24">
      <button 
        :class="{'bg-blue-500 text-white': activeTab === 'purchased'}"
        class="py-2 px-4 rounded shadow-lg hover:bg-blue-600 transition duration-300 ease-in-out"
        @click="activeTab = 'purchased'"
      >
        Satın Alınan Ürünler
      </button>
      <button 
        :class="{'bg-blue-500 text-white': activeTab === 'delivered'}"
        class="py-2 px-4 rounded shadow-lg hover:bg-blue-600 transition duration-300 ease-in-out"
        @click="activeTab = 'delivered'"
      >
        Teslim Edilen Ürünler
      </button>
    </div>

    <!-- Satın Alınan Ürünler -->
    <div v-if="activeTab === 'purchased'">
    <div >
      <div   v-for="purchasedProduct in purchasedProducts" :key="purchasedProduct.id">
        <div v-for="item in purchasedProduct.purchased" :key="item._id">
          <div  class="">

          
          <div   v-if="item.status == 'Purchased'" class="bg-white shadow-lg rounded-lg overflow-hidden  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-5">
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
                :to="`/profile/person/listings/detail/${item._id}`"
                >Detay Görüntüle
              </NuxtLink>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>

</div>


    <!-- Teslim Edilen Ürünler -->
    <div v-if="activeTab === 'delivered'">
      <div >
        <div  v-for="purchasedProduct in purchasedProducts" :key="purchasedProduct.id">
          <div  v-for="item in purchasedProduct.purchased" :key="item._id">
            <div  v-if="item.status == 'Delivered'" class="bg-white shadow-lg rounded-lg overflow-hidden  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-5">
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
                  v-if="!item.comment"
                  class="text-blue-500 font-medium hover:underline"
                  :to="`/rate/${purchasedProduct.id}`"
                  >Değerlendir
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>