<script setup>
import axios from 'axios'
let route = useRoute()
let card = reactive({
    number : null,
    owner : '',
    cvv : null,
    exDate : null
})

watch(() => card.exDate , (value) => {
if(value.length == 2 && card.exDate[1] != '/')
{
    console.log('card.exDate :>> ', card.exDate);
    card.exDate += '/'
}
if(value.length == 6)
{
    card.exDate = card.exDate.substring(0, value.length - 1);
}

} )

watch(() => card.cvv , (value) => {

if(value.length == 4)
{
    card.cvv = card.cvv.substring(0, value.length - 1);
}

} )

const payNow = async () => {
    if(card.number?.length != 16 )
    {
        console.log('invalid card number');
    }
    else if( card.exDate.length != 5)
    {
        console.log('wrong ex date')
    }
    else if (card.cvv?.length != 3)
    {
        console.log('wrong cvv')
    }
    else if( card.owner.length < 2)
    {
        console.log('wrong name')
    }
    else{
        let response = await axios.post(
      `http://localhost:3000/products/${route.params.id}`,
      {},  // İstek gövdesi (boş olabilir)
      {
        withCredentials: true,
      }
    )
        navigateTo(`/profile/person/listings`)
    }
    
}
</script>

<template>
    <div>
        <div class="max-w-sm mx-auto mt-20 bg-white rounded-md shadow-md overflow-hidden">
    <div class="px-6 py-4 bg-gray-900 text-white" >
        <h1 class="text-lg font-bold">Kredi Kartı</h1>
    </div>
    <div class="px-6 py-4">

        <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2" for="card-number">
                Kart Numarası
            </label>
            <input
                v-model="card.number"
                :class="card.number?.length != 16 ? 'border-red-400' : 'border-green-400'"
                class="appearance-none border  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="card-number" type="text" placeholder="**** **** **** ****">
        </div>

        <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2" for="expiration-date">
                Son Kullanım Tarihi
            </label>
            <input
                v-model="card.exDate"
                :class="card.exDate?.length != 5 ? 'border-red-400' : 'border-green-400'"
                class="appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="expiration-date" type="text" placeholder="MM/YY">
        </div>

        <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2" for="cvv">
                CVV
            </label>
            <input
                v-model="card.cvv"
                :class="card.cvv?.length != 3 ? 'border-red-400' : 'border-green-400'"
                class="appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="cvv" type="text" placeholder="***">
        </div>

        <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2" for="cvv">
                Kart Sahibi
            </label>
            <input
                v-model="card.owner"
                :class="card.owner?.length < 2 ? 'border-red-400' : 'border-green-400'"
                class="appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text" placeholder="İsim Soyisim">
        </div>
        <button @click="payNow" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full">
            Şimdi Öde
        </button>
    </div>
</div>
    </div>
</template>


