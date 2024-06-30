<script setup>

</script>

<template>
  <div class="bg-gray-100 flex items-center justify-center min-h-screen">
    <div class="bg-white shadow-lg rounded-lg p-8 max-w-2xl w-full my-10">
      <div class="flex flex-col items-center">
        <!-- İşletme Fotoğrafı -->
        <img class="w-48 h-48 rounded-lg shadow-md mb-6" src="https://via.placeholder.com/200" alt="İşletme Fotoğrafı">
        
        <!-- İşletme İsmi -->
        <h2 class="text-3xl font-semibold text-gray-800 mb-2">İşletme İsmi</h2>
        
        <!-- İşletme Adresi -->
        <p class="text-gray-600 mb-4">123 Sokak, Şehir, Ülke</p>
        
        <!-- Ortalama Yıldız Derecelendirmesi -->
        <div class="flex items-center mb-6">
          <svg class="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.23 3.775a1 1 0 00.95.69h3.973c.969 0 1.371 1.24.588 1.81l-3.215 2.335a1 1 0 00-.364 1.118l1.23 3.775c.3.921-.755 1.688-1.54 1.118l-3.215-2.335a1 1 0 00-1.175 0l-3.215 2.335c-.785.57-1.84-.197-1.54-1.118l1.23-3.775a1 1 0 00-.364-1.118L2.208 9.202c-.783-.57-.381-1.81.588-1.81h3.973a1 1 0 00.95-.69l1.23-3.775z"/>
          </svg>
          <svg class="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.23 3.775a1 1 0 00.95.69h3.973c.969 0 1.371 1.24.588 1.81l-3.215 2.335a1 1 0 00-.364 1.118l1.23 3.775c.3.921-.755 1.688-1.54 1.118l-3.215-2.335a1 1 0 00-1.175 0l-3.215 2.335c-.785.57-1.84-.197-1.54-1.118l1.23-3.775a1 1 0 00-.364-1.118L2.208 9.202c-.783-.57-.381-1.81.588-1.81h3.973a1 1 0 00.95-.69l1.23-3.775z"/>
          </svg>
          <svg class="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.23 3.775a1 1 0 00.95.69h3.973c.969 0 1.371 1.24.588 1.81l-3.215 2.335a1 1 0 00-.364 1.118l1.23 3.775c.3.921-.755 1.688-1.54 1.118l-3.215-2.335a1 1 0 00-1.175 0l-3.215 2.335c-.785.57-1.84-.197-1.54-1.118l1.23-3.775a1 1 0 00-.364-1.118L2.208 9.202c-.783-.57-.381-1.81.588-1.81h3.973a1 1 0 00.95-.69l1.23-3.775z"/>
          </svg>
          <svg class="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.23 3.775a1 1 0 00.95.69h3.973c.969 0 1.371 1.24.588 1.81l-3.215 2.335a1 1 0 00-.364 1.118l1.23 3.775c.3.921-.755 1.688-1.54 1.118l-3.215-2.335a1 1 0 00-1.175 0l-3.215 2.335c-.785.57-1.84-.197-1.54-1.118l1.23-3.775a1 1 0 00-.364-1.118L2.208 9.202c-.783-.57-.381-1.81.588-1.81h3.973a1 1 0 00.95-.69l1.23-3.775z"/>
          </svg>
          <svg class="w-6 h-6 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.23 3.775a1 1 0 00.95.69h3.973c.969 0 1.371 1.24.588 1.81l-3.215 2.335a1 1 0 00-.364 1.118l1.23 3.775c.3.921-.755 1.688-1.54 1.118l-3.215-2.335a1 1 0 00-1.175 0l-3.215 2.335c-.785.57-1.84-.197-1.54-1.118l1.23-3.775a1 1 0 00-.364-1.118L2.208 9.202c-.783-.57-.381-1.81.588-1.81h3.973a1 1 0 00.95-.69l1.23-3.775z"/>
          </svg>
          
        </div>
           <!-- Ürünleri Görüntüle Butonu -->
           <button class="mb-6 px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 focus:outline-none">
          Ürünleri Görüntüle
          </button>
       
    
     <div class="bg-white shadow-lg rounded-lg p-8 max-w-2xl w-full">
    <h3 class="text-xl font-medium text-gray-800 mb-4">Yorumlar</h3>
    
    <!-- Yorumlar listesi -->
    <div class="space-y-4">
      <div v-for="(review, index) in paginatedReviews" :key="index" class="border p-4 rounded-lg">
        <div class="flex items-center mb-2">
          <h4 class="text-lg font-semibold text-gray-800 mr-2">{{ review.name }}</h4>
          <div class="flex items-center">
            <!-- Yıldız derecelendirme simgeleri -->
            <template v-for="star in 5">
              <svg v-if="star <= review.rating" class="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.23 3.775a1 1 0 00.95.69h3.973c.969 0 1.371 1.24.588 1.81l-3.215 2.335a1 1 0 00-.364 1.118l1.23 3.775c.3.921-.755 1.688-1.54 1.118l-3.215-2.335a1 1 0 00-1.175 0l-3.215 2.335c-.785.57-1.84-.197-1.54-1.118l1.23-3.775a1 1 0 00-.364-1.118L2.208 9.202c-.783-.57-.381-1.81.588-1.81h3.973a1 1 0 00.95-.69l1.23-3.775z"/>
              </svg>
              <svg v-else class="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.23 3.775a1 1 0 00.95.69h3.973c.969 0 1.371 1.24.588 1.81l-3.215 2.335a1 1 0 00-.364 1.118l1.23 3.775c.3.921-.755 1.688-1.54 1.118l-3.215-2.335a1 1 0 00-1.175 0l-3.215 2.335c-.785.57-1.84-.197-1.54-1.118l1.23-3.775a1 1 0 00-.364-1.118L2.208 9.202c-.783-.57-.381-1.81.588-1.81h3.973a1 1 0 00.95-.69l1.23-3.775z"/>
              </svg>
            </template>
          </div>
        </div>
        <p class="text-gray-700">{{ review.comment }}</p>
      </div>
      
      <!-- Eksik yorumları doldurmak için boş kartlar -->
      <div v-if="paginatedReviews.length < pageSize">
        <div v-for="i in pageSize - paginatedReviews.length" :key="`empty-review-${i}`" class="border p-4 rounded-lg opacity-0">
          <div class="flex items-center mb-2">
            <h4 class="text-lg font-semibold text-gray-800 mr-2">&nbsp;</h4>
            <div class="flex items-center">
              <!-- Yıldız derecelendirme simgeleri -->
              <template v-for="star in 5">
                <svg class="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.23 3.775a1 1 0 00.95.69h3.973c.969 0 1.371 1.24.588 1.81l-3.215 2.335a1 1 0 00-.364 1.118l1.23 3.775c.3.921-.755 1.688-1.54 1.118l-3.215-2.335a1 1 0 00-1.175 0l-3.215 2.335c-.785.57-1.84-.197-1.54-1.118l1.23-3.775a1 1 0 00-.364-1.118L2.208 9.202c-.783-.57-.381-1.81.588-1.81h3.973a1 1 0 00.95-.69l1.23-3.775z"/>
                </svg>
              </template>
            </div>
          </div>
          <p class="text-gray-700">&nbsp;</p>
        </div>
      </div>
    
    <!-- Sayfalama kontrolleri -->
    <div v-if="totalPages > 1" class="mt-4 flex justify-center">
      <button @click="previousPage" :disabled="currentPage === 1" class="px-3 py-2 bg-gray-200 text-gray-700 rounded-lg shadow mr-2" v-if="currentPage > 1">Önceki</button>
      <template v-for="page in totalPages" :key="page">
        <button @click="changePage(page)" :class="{ 'bg-blue-500 text-white': currentPage === page, 'bg-gray-200 text-gray-700': currentPage !== page }" class="px-3 py-2 rounded-lg shadow mr-2">{{ page }}</button>
      </template>
      <button @click="nextPage" :disabled="currentPage === totalPages" class="px-3 py-2 bg-gray-200 text-gray-700 rounded-lg shadow" v-if="currentPage < totalPages">Sonraki</button>
    </div>
  </div>
  </div>
        
     
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const reviews = ref([
  { name: 'Ahmet Yılmaz', rating: 4, comment: 'Harika bir yer! Kesinlikle tavsiye ederim.' },
  { name: 'Mehmet Kaya', rating: 5, comment: 'Hizmet kalitesi harika.' },
  { name: 'Ayşe Demir', rating: 3, comment: 'Ortalama bir deneyim yaşadım.' },
  { name: 'Fatma Yıldız', rating: 2, comment: 'Beklentilerimi karşılamadı.' },
  { name: 'Nazım Sisli', rating: 4, comment: 'Çok Lezzetli.' },
  { name: 'Ali Tekin', rating: 4, comment: 'Çok memnun kaldım, tekrar gideceğim.' },
  { name: 'Zeynep Ak', rating: 5, comment: 'Her şey mükemmeldi, teşekkürler.' }
]);

const currentPage = ref(1);
const pageSize = 5; // Sayfa başına görüntülenecek yorum sayısı

const paginatedReviews = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize;
  return reviews.value.slice(startIndex, startIndex + pageSize);
});

const totalPages = computed(() => Math.ceil(reviews.value.length / pageSize));

const changePage = (page) => {
  currentPage.value = page;
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};
</script>

<style scoped>
body {
  margin: 0;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
}
</style>
