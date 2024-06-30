<script setup>


const route = useRoute();
const router = useRouter();

const { toTitleCase } = useUtilities();

const refProducts = reactive({ products: [] });
const refComments = reactive({ comments: [] });

const { pending: pendingProducts, data: productsData, error: errorProducts, execute: fetchProducts } = useLazyFetch('http://localhost:3000/products/list', {
  credentials: 'include'
});

const product = computed(() => {
  console.log('refProducts.products:', refProducts.products);
  return refProducts.products.find(p => p._id == route.params.id) || {};
});

const { pending: pendingComments, data: commentsData, error: errorComments, execute: fetchComments } = useLazyFetch(`http://localhost:3000/comments/${route.params.id}`, {
  credentials: 'include'
});

watchEffect(async () => {
  console.log('Route ID changed:', route.params.id);
  if (route.params.id) {
    await fetchProducts();
    console.log('Products fetched:', productsData.value);
    refProducts.products = productsData.value || [];

    const currentProduct = refProducts.products.find(p => p._id == route.params.id);
    console.log('Current Product:', currentProduct);
    if (currentProduct && currentProduct._id) {
      await fetchComments();
      console.log('Comments fetched:', commentsData.value);
      refComments.comments = commentsData.value || [];
    }
  }
});

useHead({
  title: toTitleCase(route.params.name),
});

definePageMeta({
  layout: "custom",
});
console.log(refComments.comments.length)
const starOrt = computed(() => {
  let temp = 0;
  if(refComments.comments.length != 0)
  {
    for(let i =0 ; i < refComments.comments?.length ; i++)
  {
    temp += refComments.comments[i]?.star
  }
  temp /= refComments.comments?.length
  }
  
  return (Math.floor(temp + 0.5))
})
</script>

<template>
  <div v-if="pendingProducts || pendingComments">
    Loading...
  </div>
  <div v-else>
    <div class="mt-10">
    <NuxtImg :src="`http://localhost:3000/images/${product?.fileName}`" class="w-full" alt="" />
    
    
    <div class="text-slate-500 flex text-lg mt-3 pb-5 justify-start mt-10" style="align-items: center;">

        <h1 class=" text-4xl">{{ product.name }}</h1>
        <div v-if="starOrt" class="flex space-x-2 mx-7" style="align-items: center;" >
            <svg v-for="i in starOrt" :key="i" class="w-7 h-7 text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <svg v-for="i in (5 - starOrt)" :key="i" class="w-7 h-7 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
      </div>
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
    <ProductDetailDescription  :description="product.description"/>
    
    <button @click="() => router.push(`/purchase/${product._id}`)" class="bg-blue-400 text-white px-10 py-3 rounded mt-2">
      Satın Al
    </button>

    <h5 class="text-3xl mt-10">Yorumlar</h5>

    <article v-if="refComments.comments.length > 0" v-for="item in refComments.comments" :key="item._id" class="p-6 text-base bg-white rounded-lg bg-blue-100 mt-3">
      <footer class="flex justify-between items-center mb-2">
        <div class="flex items-center">
          <p class="inline-flex items-center text-sm text-gray-900 dark:text-dark font-semibold">{{ item.name }} {{ item.surname }}</p>
          <div class="flex space-x-1 ml-5">
            <svg v-for="i in item.star" :key="i" class="w-5 h-5 text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <svg v-for="i in (5 - item.star)" :key="i" class="w-5 h-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
        </div>
      </footer>
      <p class="text-gray-500 dark:text-gray-400">{{ item.comment }}</p>
    </article>

    <div v-else class="p-6 text-base bg-white rounded-lg bg-blue-100 mt-3">
      Hiç Yorum Bulunamadı.
    </div>
  </div>
</template>
