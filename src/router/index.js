import { createRouter, createWebHistory } from 'vue-router'
import Welcome from '../views/Welcome.vue'
import Dashboard from '../views/Dashboard.vue'
import Patients from '../views/Patients.vue'
import PatientDetails from '../views/PatientDetails.vue'
import { projectAuth } from '@/firebase/config'
import AddPatient from '@/views/AddPatient.vue'

// Route guard to ensure user is authenticated
const requireAuth = (to, from, next) => {
   let user = projectAuth.currentUser
   if (!user) {
      next({ name: 'Welcome' }) // Redirect to Welcome page if not authenticated
   } else {
      next() // Proceed if authenticated
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
   },
   {
      path: '/dashboard/patients/:id',
      name: 'PatientDetails',
      component: PatientDetails,
      beforeEnter: requireAuth // Require auth for patient details too
   },
   {
      path: '/dashboard/add-patient',
      name: 'AddPatient',
      component: AddPatient,
      beforeEnter: requireAuth 
    }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL), // Using HTML5 history mode
  routes
})

export default router
