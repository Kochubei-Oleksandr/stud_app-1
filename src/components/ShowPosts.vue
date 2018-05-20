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
      list: 'showPosts'
    })
  },
  created () {
    this.$store.dispatch('showPostsLoad')
  }
}
</script>
