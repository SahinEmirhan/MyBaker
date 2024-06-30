<script setup>
import axios from 'axios'
let user = {
    username : '',
    password : ''
}

let onSubmit = async() => {
    console.log('user :>> ', user);
    const response = await axios.post('http://localhost:3000/users/login', {username : user.username , password : user.password})
    if(response.data.success)
    {
        const token = useCookie('token')
        const userType = useCookie('userType')
        token.value = response.data.token
        userType.value = response.data.userType
        window.location.reload
        window.location.href = 'http://localhost:8000';
    }
}

    let alertVisible = ref(false)
    let errMessage = ref('')
    let errStatus = ref('')
    let headMsg = ref('')
    let showAlertComponent = (msg , head ,status) => {
        alertVisible.value = true
        errMessage.value = msg
        errStatus.value = status 
        headMsg.value = head
        setTimeout( async ()=> {
            alertVisible.value = false
        } , 4000)
    }

</script>

<template>
 <div class="flex justify-center mt-8">
    <div class="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full absolute justify-center">
        <div class="flex justify-center mb-6">
        </div>
        <h2 class="text-2xl font-semibold text-center mb-4">Giriş Yap</h2>

            <div class="mb-4">
                <label for="kullaniciAdi" class="block text-gray-700 text-sm font-semibold mb-2">Kullanıcı Adı *</label>
                <input @keyup.enter="onSubmit" v-model="user.username" type="text" id="kullaniciAdi" class="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500" required="" placeholder="Email adresinizi girin">
            </div>
            <div class="mb-6">
                <label for="sifre" class="block text-gray-700 text-sm font-semibold mb-2">Şifre *</label>
                <input @keyup.enter="onSubmit" v-model="user.password" type="password" id="sifre" class="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500" required="" placeholder="Şifrenizi girin">
            </div>
            <button @click="onSubmit()" class="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Giriş Yap</button>
        <p class="text-gray-600 text-xs text-center mt-4">
            Giriş yaparak, MyBaker'in
            <a class="text-blue-500 hover:underline" target="_blank">Kullanım Koşulları'nı</a>
            kabul etmiş olursunuz.
        </p>
    </div>

    <AlertComponent :msg="errMessage" :status="errStatus" :headMsg ="headMsg" v-if="alertVisible" />

</div>


</template>



<style scoped>

</style>