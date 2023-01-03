import { createRouter, createWebHistory } from "vue-router";
import MusicApp from "../views/MusicApp.vue";

const routes = [
  {
    path: "/",
    name: "HomePage",
    component: MusicApp,
    children: [
      {
        path: "",
        name: "home",
        component: () => import("../views/HomeView.vue"),
      },
      {
        path: "search",
        name: "search",
        component: () => import("../views/SearchView.vue"),
      },
      {
        path: "new-release-albums",
        name: "newRelease",
        component: () => import("../views/NewReleaseView.vue"),
      },
      {
        path: "album/:id",
        name: "album",
        props: true,
        component: () => import("../views/AlbumView.vue"),
      },
    ],
  },
  // {
  //   path: "/search",
  //   name: "search",
  //   component: SearchView,
  // },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ left: 0, top: 0 });
      }, 500);
    });
  },
  routes,
});

export default router;
