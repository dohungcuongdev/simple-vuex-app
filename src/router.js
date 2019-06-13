import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './views/Home.vue';
import ListRepos from './views/ListRepos.vue';

Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        { path: '/', redirect: '/home' },
        { path: '/home', component: Home },
        { path: '/list-repos', component: ListRepos }
    ]
});
