<template>
  <div id="app">
    <keep-alive>
      <page-header></page-header>
    </keep-alive>
    <hr>
    <body-content></body-content>
    <hr>
    <keep-alive>
      <page-footer></page-footer>
    </keep-alive>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import BodyContent from './components/BodyContent.vue'
import Footer from './components/Footer.vue'

export default {
  components: {
    'page-header': Header,
    'body-content': BodyContent,
    'page-footer': Footer
  }
};
</script>

<style>
#app {
  font-size: 13px;
  color: blue;
}
</style>