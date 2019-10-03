const routes = [
  {
    path: '/',
    name: 'practice',
    component: () => import(/* webpackChunkName: "home" */ '@/pages/Practice.vue'),
  },
  {
    path: '/game',
    name: 'game',
    component: () => import(/* webpackChunkName: "game" */ '@/pages/Game.vue'),
  },
];

export default routes;
