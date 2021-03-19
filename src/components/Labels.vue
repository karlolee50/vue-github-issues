<template>
  <div>
    <b-badge 
      v-for="label in labels" 
      :key="label.id"
      variant="pill"
      :style="{ background: `#${label.color}`, color: 'white' }">
      {{ label.name }}
    </b-badge>
  </div>
</template>

<script>
export default {
  name: 'Labels',

  props: ['labels']
}
</script>