import Instructions from "@/components/Game/Instructions.vue";
import SetWord from "@/components/Game/SetWord.vue";
import GuessWord from "@/components/Game/GuessWord.vue";
import StartGame from "@/components/Game/StartGame.vue";
import Game from "@/views/Game.vue";
import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";
import Home from "../views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/game",
    name: "Game",
    component: Game,
    redirect: {
      name: "Start",
    },
    children: [
      {
        name: "Start",
        path: "",
        component: StartGame,
      },
      {
        name: "SetWord",
        path: "",
        component: SetWord,
      },
      {
        name: "GuessWord",
        path: "",
        component: GuessWord,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
