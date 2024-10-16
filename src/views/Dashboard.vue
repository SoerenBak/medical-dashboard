<template>
  <div>
    <div class="container">
        <Navigation />
    </div>
  </div>
</template>

<script>
import Navigation from '../components/Navigation.vue'
export default {
    components: { Navigation }
}
</script>

<style>
  nav {
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  nav p {
    margin: 2px auto;
    font-size: 16px;
    color: #444;
  }
  nav p.email {
    font-size: 14px;
    color: #999;
  }
</style>