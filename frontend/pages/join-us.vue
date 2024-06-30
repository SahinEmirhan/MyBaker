
<script setup>
import axios from 'axios'
let user = {
    name : null,
    city : null,
    email : null,
    username : null,
    password : null,
    userType : 'Restaurant'
}

const onSubmit = async () => {
    const response = await axios.post('http://localhost:3000/users/register-restaurant' ,  user)
    if(response.data.success)
    {
        return navigateTo('/login')
    }
}
</script>

<template>
    <div class="flex justify-center mt-8">
        <div class="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full absolute justify-center">
            <div class="flex justify-center mb-6">
            </div>
            <h2 class="text-2xl font-semibold text-center mb-4">Yeni bir hesap oluştur</h2>
            <p class="text-gray-600 text-center mb-6">Kaydolmak için bilgilerinizi girin.</p>
            
                <div class="mb-4">
                    <label for="fullName" class="block text-gray-700 text-sm font-semibold mb-2">Şirket Adı *</label>
                    <input v-model="user.name" type="text" id="fullName" class="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500" required="" placeholder="Adınızı giriniz">
                </div>

                <div class="mb-4">
                    <label for="fullName" class="block text-gray-700 text-sm font-semibold mb-2">Şehir *</label>
                    <input v-model="user.city" type="text" id="fullName" class="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500" required="" placeholder="Yaşadığınız şehri giriniz">
                </div>

                <div class="mb-4">
                    <label for="fullName" class="block text-gray-700 text-sm font-semibold mb-2">Adres *</label>
                    <input v-model="user.email" type="text" id="fullName" class="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500" required="" placeholder="Yaşadığınız adresi giriniz">
                </div>

                <div class="mb-4">
                    <label for="email" class="block text-gray-700 text-sm font-semibold mb-2">Email *</label>
                    <input @keyup.enter="onSubmit" v-model="user.username" type="email" id="email" class="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500" required="" placeholder="Email adresinizi giriniz">
                </div>
               
                <div class="mb-6">
                    <label for="password" class="block text-gray-700 text-sm font-semibold mb-2">Şifre *</label>
                    <input @keyup.enter="onSubmit" v-model="user.password" type="password" id="password" class="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500" required="" placeholder="Şifrenizi giriniz">
                    <p class="text-gray-600 text-xs mt-1">Bir büyük harf, bir rakam, minimum 8 karakter içermelidir.</p>
                </div>

                <button @click="onSubmit" type="submit" class="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Kaydol</button>
                <p class="text-gray-600 text-xs text-center mt-4">
                    Kayıt yaparak, MyBaker'in
                    <a class="text-blue-500 hover:underline" target="_blank">Kullanım Koşulları'nı</a>
                    kabul etmiş olursunuz.
                </p>
            
        </div>
    </div>
</template>




<style  scoped>

</style>