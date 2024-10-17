import { createRouter, createWebHistory } from 'vue-router'
import Welcome from '../views/Welcome.vue'
import Dashboard from '../views/Dashboard.vue'
import Patients from '../views/Patients.vue'
import { projectAuth } from '@/firebase/config'

const requireAuth = (to, from, next) => {
   let user = projectAuth.currentUser
   if(!user) {
      next({ name: 'Welcome' })
   } else {
      next()
   }
}

const routes = [
 {
    path: '/',
    name: 'Welcome',
    component: Welcome
 },
 {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    beforeEnter: requireAuth
 },
 {
   path: '/dashboard/patients',
   name: 'Patients',
   component: Patients,
   beforeEnter: requireAuth
}
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
