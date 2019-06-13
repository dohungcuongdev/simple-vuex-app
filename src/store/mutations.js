export default {
    // mutations - render or update view by changing state or whatever ...
    setGitRepos(state, gitRepos) {
        state.gitRepos = gitRepos;
        console.log('state.gitRepos is set to ');
        console.log(gitRepos);
    },
    setPage(state, page) {
        state.page = page;
        console.log('state.page is set to ' + page);
    }
}