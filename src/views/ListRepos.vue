<template>
  <div>
      <ul>
        <li v-for="gitRepo in gitRepos" :key="gitRepo.id">
          <p>{{gitRepo.name}}</p>
        </li>
        <router-link to="/home">Go Home</router-link>
      </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'list-repos',
  data () {
    return {
      
    }
  },
  computed: {
    ...mapGetters({
      gitRepos: 'getGitRepos'
    })
  }
}
</script>