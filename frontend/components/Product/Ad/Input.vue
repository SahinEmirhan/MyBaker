<script setup>
const props = defineProps({
  title: String,
  name: String,
  placeholder: String,
});

const emits = defineEmits(["changeInput"]);
const state = ref("");
const onChange = () => {
  emits("changeInput", state.value, props.name);
};
</script>

<template>
  <div class="flex flex-col w-[48%] mt-2">
    <label for="" class="text-cyan-500 mb-1 text-sm">{{ title }}</label>
    <input
      :type=" ((title == 'Price *') || (title == 'Stock *' )) ? 'number' : 'text' "
      class="p-2 border w-100 rounded"
      :placeholder="placeholder"
      v-model="state"
      :name="name"
      @input="onChange"
    />
    <h3 v-if="title == 'Price *' " class="text-lg">Alacağınız Tutar : {{ (state * 0.9).toFixed(2) }} TL</h3>
  </div>
</template>