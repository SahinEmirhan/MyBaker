<script setup>
import axios from 'axios'
definePageMeta({
  layout: "custom",
});

const { makes } = useProducts();

const info = useState("adInfo", () => {
  return {
    stock: "",
    price: "",
    description: "",
    name : "",
    image:null,
    fileName: null,
  };
});

const onChangeInput = (data, name) => {
  info.value[name] = data;  
};
const createListing = async () => {
console.log("listle => " , info.value)
let formData = new FormData(); // instantiate it
    // suppose you have your file ready
formData.set('imageFile', info.value.image);
const res = await axios.post('http://localhost:3000/upload' , formData , {withCredentials:true})
info.value.fileName = info.value.image.name;
const response = await axios.post('http://localhost:3000/products', info.value, {
      withCredentials: true,
    });
    if(response.statusText == 'Created')
    {
      return navigateTo('/profile/restaurant/listings')
    }
  }
const inputs = [
  {
    id: 1,
    title: "Name *",
    name: "name",
    placeholder: "Kurabiye ",
  },
  {
    id: 2,
    title: "Price *",
    name: "price",
    placeholder: "99 TL",
  },
];
</script>


<template>
  <div>
    <div class="mt-24">
      <h1 class="text-6xl">Yeni Listeleme Oluştur</h1>
    </div>
    <div class="shadow rounded p-3 mt-5 flex flex-wrap justify-between">
      <ProductAdInput
        v-for="input in inputs"
        :key="input.id"
        :title="input.title"
        :name="input.name"
        :placeholder="input.placeholder"
        @change-input="onChangeInput"
      />

      <ProductAdInput
        title="Stock *"
        name="stock"
        placeholder="enter the stock"
        @change-input="onChangeInput"
      />

      <ProductAdTextarea
        title="Description *"
        name="description"
        placeholder=""
        @change-input="onChangeInput"
      />
      <ProductAdImage @change-input="onChangeInput" />
      <button @click="createListing" class="mt-4 rounded-md bg-green-600 px-3 py-2 text-[0.8125rem] font-semibold leading-5 text-white hover:bg-indigo-500">Listele</button>
    </div>
  </div>
</template>