import Vue from 'vue';

const isAvailableServerAPI = true;
const isGitHubServer = true;

const HARD_CODE_API_URL_ROOT = 'https://api.github.com/user/repos?access_token=c6c41e803b5e4e9d2703386fca757a87258c8c7d'
const HARD_CODE_API_PARAM_PER_PAGE = '&per_page=';
const HARD_CODE_API_PARAM_PAGE = '&page=';
const HARD_CODE_MAX_REPOS = 71;

function getGitReposHardCode(size, per_page) {
    let gitRepos = [];
    let begin = (per_page - 1) * size + 1;
    let end = (per_page - 1) * size + size;
    for (let i = begin; i <= end; i++) {
        gitRepos.push({ id: i, name: 'repo' + i });
    }
    return gitRepos;
}

export default {
    // actions - the actions requested from client
    // multiple actions may use the same mutation
    getAllGitReposFromAPI({ dispatch }) {
        console.log('action getAllGitReposFromAPI is processing')
        dispatch('getGitReposPerPageFromAPI', { page: 1, perPage: HARD_CODE_MAX_REPOS }); // the git repos length < 1000 for sure
    },
    getTheFirst10GitReposFromAPI({ dispatch }) {
        console.log('action getTheFirst10GitReposFromAPI is processing')
        dispatch('getGitReposPerPageFromAPI', 1);
    },
    getThePrevious10GitReposFromAPI({ state, commit, dispatch }) {
        console.log('action getThePrevious10GitRepos is processing');
        let page = state.page - 1;
        if (page >= 1) {
            commit('setPage', page);
            dispatch('getGitReposPerPageFromAPI', page);
        }
    },
    getTheNext10GitReposFromAPI({ state, commit, dispatch }) {
        console.log('action getTheNext10GitReposFromAPI is processing')
        let page = state.page + 1;
        if (page * 10 - HARD_CODE_MAX_REPOS < 10) {
            commit('setPage', page);
            dispatch('getGitReposPerPageFromAPI', page);
        }
    },
    getGitReposPerPageFromAPI({ commit }, page) {
        console.log(page);
        let perPage = 10;
        if (page.perPage) {
            perPage = page.perPage;
        }
        console.log('action getGitReposPerPageFromAPI is processing with page=' + page + ' perPage=' + perPage)
        if (isAvailableServerAPI) {
            let apiURL = 'git/repos?per_page=' + perPage + '&page=' + page;// if you build a third-party server between git and this app
            if (isGitHubServer) {
                apiURL = HARD_CODE_API_URL_ROOT + HARD_CODE_API_PARAM_PER_PAGE + perPage + HARD_CODE_API_PARAM_PAGE + page; // use github api directly
            }
            console.log(apiURL);
            Vue.http.get(apiURL).then(response => {
                console.log(response);
                commit('setGitRepos', response.data);
            });
        } else {
            //test without server API
            commit('setGitRepos', getGitReposHardCode(perPage, page));
        }
    },
    updatePage({ commit }, page) {
        console.log('action updatePage is processing with page=' + page)
        commit('setPage', page);
    }
}