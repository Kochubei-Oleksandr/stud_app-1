<template>
  <div class="form">
   <h1>This response: {{showPost}}</h1> 
    
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['showPost'])
  },
  created () {
    this.$store.dispatch('showPostLoad', {id: this.$route.params.id})
  },
}
</script>
