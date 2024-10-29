import { createRouter, createWebHistory } from 'vue-router'
import Welcome from '../views/Welcome.vue'
import Dashboard from '../views/Dashboard.vue'
import Patients from '../views/Patients.vue'
import PatientDetails from '../views/PatientDetails.vue'
import { projectAuth } from '@/firebase/config'
import AddPatient from '@/views/AddPatient.vue'
import AddNote from '@/components/Patients/AddNote.vue'
import AddAllergy from '@/components/Patients/AddAllergy.vue'
import NoteDetails from '@/components/Patients/NoteDetails.vue'
import AllergyDetails from '@/components/Patients/AllergyDetails.vue'
import PatientChart from '@/components/Dashboard/PatientChart.vue'
import UnreadMessages from '@/components/Dashboard/UnreadMessages.vue'
import AddMedicalHistory from '@/views/Patients/AddMedicalHistory.vue'
import MedicalHistoryDetails from '@/components/Patients/MedicalHistoryDetails.vue'

const requireAuth = (to, from, next) => {
   let user = projectAuth.currentUser
   if (!user) {
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
   },
   {
      path: '/dashboard/patients/:id',
      name: 'PatientDetails',
      component: PatientDetails,
      beforeEnter: requireAuth
   },
   {
      path: '/dashboard/add-patient',
      name: 'AddPatient',
      component: AddPatient,
      beforeEnter: requireAuth 
    },
    {
      path: '/dashboard/patients/:id/add-note',
      name: 'AddNote',
      component: AddNote,
      beforeEnter: requireAuth 
    },
    {
      path: '/dashboard/patients/:id/notes/:noteId',
      name: 'NoteDetails',
      component: NoteDetails,
      beforeEnter: requireAuth
    },
    {
      path: '/dashboard/patients/:id/add-allergy',
      name: 'AddAllergy',
      component: AddAllergy,
      beforeEnter: requireAuth 
    },
    {
      path: '/dashboard/patients/:id/allergies/:allergyId',
      name: 'AllergyDetails',
      component: AllergyDetails,
      beforeEnter: requireAuth
    },
    {
      path: '/dashboard/patients/patient-chart',
      name: 'PatientChart',
      component: PatientChart,
      beforeEnter: requireAuth
    },
    {
      path: '/dashboard/patients/unread-messages',
      name: 'UnreadMessages',
      component: UnreadMessages,
      beforeEnter: requireAuth
    },
    {
      path: '/patients/:patientId/medical-history/add',
      name: 'AddMedicalHistory',
      component: AddMedicalHistory,
      beforeEnter: requireAuth
    },
    {
      path: '/patients/:patientId/medical-history/:historyId',
      name: 'MedicalHistoryDetails',
      component: MedicalHistoryDetails,
      beforeEnter: requireAuth,
      props: true, 
    },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL), // Using HTML5 history mode
  routes
})

export default router
