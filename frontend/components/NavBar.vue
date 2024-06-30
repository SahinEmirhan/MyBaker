<template>
  
  <header
    class="
      sticky
      top-0
      z-50
      flex
      justify-between
      items-center
      space-x-1
      border-b
      bg-white
      p-4
      shadow-md
    "
  >
    <NuxtLink class="text-3xl font-mono" to="/">MyBaker</NuxtLink>
    <div v-if="token" class="pr-2">
      <a class="mr-8 text-1xl" :href="`/profile/${userType}/listings`">Profile</a>
      <a @click="logout"  href="/login" class="text-1xl">Logout</a>
    </div>
    
    <div v-if="!token" class="pr-2">
      <a class="mr-8 text-1xl" href="/login">Login</a>
      <a class="text-1xl" href="/register">Register</a>
    </div>
  </header>

</template>

<script setup>
const userType = useCookie('userType')
const token = useCookie('token')
const logout = () => {
token.value = null;
}
</script>