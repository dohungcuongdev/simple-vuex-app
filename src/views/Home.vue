<template>
  <div>
      <ul>
        <li v-for="gitRepo in gitRepos" :key="gitRepo.id">
          <p>{{gitRepo.name}}</p>
        </li>
      </ul>
      <button @click="getAllGitRepos">getAllGitRepos</button>
      <button @click="getTheFirst10GitRepos">getTheFirst10GitRepos</button>
      <button @click="getThePrevious10GitRepos">getThePrevious10GitRepos</button>
      <button @click="getTheNext10GitRepos">getTheNext10GitRepos</button>
      <p>Input Page: </p><input @input="updatePage" ref="page" :value="page">
      <button @click="get10GitReposPerPage">get10GitReposPerPage</button>
      <br><br>
      <router-link to="/list-repos">Check List Git Repos</router-link>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'home',
  data () {
    return {
      
    }
  },
  computed: {
    ...mapGetters({
      gitRepos: 'getGitRepos',
      page: 'getPage'
    })
  },
  created() {
    this.$store.dispatch('getAllGitReposFromAPI')
  },
  methods: {
    getAllGitRepos () {
      this.$store.dispatch('getAllGitReposFromAPI')
    },
    getTheFirst10GitRepos () {
      this.$store.dispatch('getTheFirst10GitReposFromAPI')
    },
    getThePrevious10GitRepos() {
      this.$store.dispatch('getThePrevious10GitReposFromAPI')
    },
    getTheNext10GitRepos() {
      this.$store.dispatch('getTheNext10GitReposFromAPI')
    },
    get10GitReposPerPage () {
      this.$store.dispatch('getGitReposPerPageFromAPI', this.page)
    },
    updatePage() {
      this.$store.dispatch('updatePage', this.$refs.page.value)
    }
  }
}
</script>