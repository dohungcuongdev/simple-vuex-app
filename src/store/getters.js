export default {
    // getters - data in computed() shared across the components
    // multiple components may use the same getter in computed()
    getGitRepos: state => state.gitRepos,
    getPage: state => state.page,
}