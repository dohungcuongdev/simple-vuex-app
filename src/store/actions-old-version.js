import Vue from 'vue';

export default {
    // actions - the actions requested from client
    // multiple actions may use the same mutation
    getAllGitReposFromAPI({ commit }) {
        console.log('action getAllGitReposFromAPI is processing')
        if(isAvailableServerAPI) {
            let API_URL = 'git/repos'; // if you build a third-party server between git and this app
            if(isGitHubServer) {
                API_URL = HARD_CODE_API_URL_ROOT; // use github api directly
            }
            Vue.http.get(API_URL).then(response => {
                commit('setGitRepos', response.data);
            });
        } else {
            //test without server API
            commit('setGitRepos', getGitReposHardCode(22, 1));
        }
    },
    getTheFirst10GitReposFromAPI({ dispatch }) {
        console.log('action getTheFirst10GitReposFromAPI is processing')
        dispatch('getGitReposPerPageFromAPI', 1);
        
    },
    getThePrevious10GitReposFromAPI({ state, commit, dispatch }) {
        console.log('action getThePrevious10GitRepos is processing');
        let page = state.page - 1;
        if(page >= 1) {
            commit('setPage', page);
            dispatch('getGitReposPerPageFromAPI', page);
        }
    },
    getTheNext10GitReposFromAPI(context) {
        console.log('action getTheNext10GitReposFromAPI is processing')
        let page = context.state.page + 1;
        context.commit('setPage', page);
        if(isAvailableServerAPI) {
            let API_URL = 'git/repos?per_page=10&page=';// if you build a third-party server between git and this app
            if(isGitHubServer) {
                API_URL = HARD_CODE_API_URL_PER_PAGE; // use github api directly
            }
            Vue.http.get(API_URL+page).then(response => {
                context.commit('setGitRepos', response.data);
            });
        } else {
            //test without server API
            context.commit('setGitRepos', getGitReposHardCode(10, page));
        }
    },
    getGitReposPerPageFromAPI ({ commit }, page) {
        console.log('action getGitReposPerPageFromAPI is processing with page='+page)
        if(isAvailableServerAPI) {
            let API_URL = 'git/repos?per_page=10&page=';// if you build a third-party server between git and this app
            if(isGitHubServer) {
                API_URL = HARD_CODE_API_URL_PER_PAGE; // use github api directly
            }
            Vue.http.get(API_URL+page).then(response => {
                commit('setGitRepos', response.data);
            });
        } else {
            //test without server API
            commit('setGitRepos', getGitReposHardCode(10, page));
        }
    },
    updatePage({ commit }, page) {
        console.log('action updatePage is processing with page=' + page)
        commit('setPage', page);
    }
}

const isAvailableServerAPI = true;
const isGitHubServer = true;

function getGitReposHardCode(size, per_page) {
    let gitRepos = [];
    let begin = (per_page-1)*size + 1;
    let end = (per_page-1)*size+size;
    for(let i = begin; i <= end; i++) {
        gitRepos.push({id: i, name: 'repo' + i});
    }
    return gitRepos;
}

const HARD_CODE_API_URL_ROOT = 'https://api.github.com/user/repos?access_token=c6c41e803b5e4e9d2703386fca757a87258c8c7d'
const HARD_CODE_API_URL_PER_PAGE = HARD_CODE_API_URL_ROOT + '&per_page=10&page=';