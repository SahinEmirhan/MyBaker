

<template>
  <div>
    <div class="mt-32 flex">
      <NuxtErrorBoundary>
        
        <NuxtPage />
        <template #error="{ error }">
          <div class="text-center mx-auto flex flex-col">
            <h1 class="text-5xl text-red-600 mb-4">
              Üzgünüm, bir şeyler ters gitti..
            </h1>
            <code>{{ error }}</code>
            <button
              class="text-white bg-blue-400 px-10 py-3 rounded mt-4"
              @click="error.value = null"
            >
              Geri Dön
            </button>
          </div>
        </template>
      </NuxtErrorBoundary>
    </div>
  </div>
</template>
  