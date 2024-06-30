<script setup>
import axios from 'axios'
const route = useRoute()
let star = ref(4);
let comment = ref("");

const onConfirm = async () => {
let response = await axios.post(`http://localhost:3000/comments/${route.params.id}` , {star : star.value , comment : comment.value} , {withCredentials:true})
console.log(response)
if(response.statusText == 'OK')
{
  return navigateTo('/profile/person/listings')
}
}
</script>


<template>
    <div>
            <!-- component -->
<div class="min-h-screen bg-gray-300 py-6 flex flex-col justify-center sm:py-12">
  <div class="py-3 sm:max-w-xl sm:mx-auto">
    <div class="bg-white min-w-1xl flex flex-col rounded-xl shadow-lg">
      <div class="px-12 py-5">
        <h2 class="text-gray-800 text-3xl font-semibold">Görüşleriniz Bizim İçin Önemli!</h2>
      </div>
      <div class="bg-gray-200 w-full flex flex-col items-center">
        <div class="flex flex-col items-center py-6 space-y-3">
          <span class="text-lg text-gray-800">Memnun Kaldınız mı?</span>
          <div class="flex space-x-3">
            <svg @mouseover="star = 1 " class="w-12 h-12" :class="star >= 1 ? 'text-yellow-500' : 'text-gray-500'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <svg @mouseenter="star = 2" class="w-12 h-12" :class="star >= 2 ? 'text-yellow-500' : 'text-gray-500'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <svg @mouseenter="star = 3" class="w-12 h-12" :class="star >= 3 ? 'text-yellow-500' : 'text-gray-500'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <svg  @mouseenter="star = 4" class="w-12 h-12" :class="star >= 4 ? 'text-yellow-500' : 'text-gray-500'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <svg  @mouseenter="star = 5" class="w-12 h-12 " :class="star >= 5 ? 'text-yellow-500' : 'text-gray-500'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
        </div>
        <div class="w-3/4 flex flex-col">
          <textarea v-model="comment" rows="3" class="p-4 text-gray-500 rounded-xl resize-none" placeholder="Yorumunuz..."></textarea>
          <button @click="onConfirm" class="py-3 my-8 text-lg bg-blue-500 rounded-xl text-white">Değerlendir</button>
        </div>
      </div>
      <div class="h-20 flex items-center justify-center">
        <a href="/" class="text-gray-600">Belki Sonra</a>
      </div>
    </div>
  </div>
</div>
    </div>
</template>