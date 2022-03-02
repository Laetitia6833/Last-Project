import { createRouter, createWebHistory } from "vue-router";
import VueJwtDecode from "vue-jwt-decode";
import Home from "../views/Home.vue";
import Results from "../views/Results.vue";
import Signup from "../views/sign/Signup.vue";
import Signin from "../views/sign/Signin.vue";
import Student from "../views/Student/Student.vue";
import StudentProfil from "../views/Student/StudentProfil.vue";
import User from "../views/User/User.vue";
import Admin from "../views/Admin/Admin.vue";
import PublicStudent from "../views/Student.vue";
// import UserProfil from '../views/User/UserProfil.vue'

function access(to, from, next, userRole) {
  const token = localStorage.accessToken;
  if (localStorage.accessToken) {
    const role = VueJwtDecode.decode(token).role;
    if (role === userRole) {
      const id = VueJwtDecode.decode(token).id;
      if (id !== to.params.id) {
        next({ name: "NoAccess" });
      } else {
        next();
      }
    } else {
      next({ name: "NoAccess" });
    }
  } else {
    next({ name: "NoAccess" });
  }
}

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/results",
    name: "Results",
    component: Results,
  },
  {
    path: "/signin",
    name: "Signin",
    component: Signin,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/profil/:id",
    name: "PublicProfil",
    component: PublicStudent,
  },
  {
    path: "/noAccess",
    name: "NoAccess",
    component: () => import("../views/NoAccess.vue"),
  },
  {
    path: "/student/:id",
    name: "Student",
    component: Student,
    beforeEnter: (to, from, next) => {
      access(to, from, next, "STUDENT");
    },
    children: [
      {
        path: "",
        component: StudentProfil,
      },
      {
        name: "StudentUpdate",
        path: "/student/:id/studentUpdate",
        component: () => import("../views/Student/StudentUpdate.vue"),
      },
      {
        name: "Missions",
        path: "/student/:id/missions",
        component: () => import("../views/Student/Missions.vue"),
      },
    ],
  },
  {
    path: "/user/:id",
    name: "User",
    component: User,
    beforeEnter: (to, from, next) => {
      access(to, from, next, "USER");
    },
    children: [
      {
        path: "",
        component: () => import("../views/User/UserProfil.vue"),
      },
      {
        path: "/user/:id/update",
        name: "UserUpdate",
        component: () => import("../views/User/UserUpdate.vue"),
      },
    ],
  },
  {
    path: "/admin/:id",
    name: "Admin",
    component: Admin,
    beforeEnter: (to, from, next) => {
      access(to, from, next, "ADMIN");
    },
    children: [
      {
        path: "",
        component: () => import("../views/Admin/Dashboard.vue"),
      },
      {
        path: "all",
        component: () => import("../views/Admin/All.vue"),
      },
      {
        path: "/admin/:id/updateUser/:userId",
        name: "UpdateUser",
        component: () => import("../views/Admin/UpdateUser.vue"),
      },
      {
        path: "/admin/:id/verifyUser/:userId",
        name: "VerifyUser",
        component: () => import("../views/Admin/VerifyUser.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
