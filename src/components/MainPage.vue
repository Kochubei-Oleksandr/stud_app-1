<template>
  <div class="form">
   <h1>This response: {{list}}</h1> 
    
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      list: 'showVipPosts'
    })
  },
  created () {
    this.$store.dispatch('showVipPostsLoad')
  }
}
</script>