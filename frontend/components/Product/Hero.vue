<template>
  <div
    class="
      relative
      h-screen
      w-100
      bg-no-repeat bg-cover bg-bottom
      bg-[url('https://www.bicafemutfak.com/wp-content/uploads/2019/12/sahibinden-sat%C4%B1l%C4%B1k-cafe-ekipmanlar%C4%B1.jpg')]
    "
  >
    <div class="z-10 absolute w-full h-full flex justify-center items-center">
      <div class="text-center w-1/2">
        <h1 class="text-8xl font-serif mb-10 text-white">Ürünleri Görmek İçin Şehir Ara</h1>
        <ProductSearchBar />
      </div>
    </div>
    <div class="z-1 absolute w-full h-full bg-black opacity-50"></div>
  </div>
</template>