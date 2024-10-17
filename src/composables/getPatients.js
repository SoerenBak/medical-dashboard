import { ref } from 'vue'
import { collection, getDocs } from 'firebase/firestore'
import { projectFirestore } from '../firebase/config'

const getPatients = () => {
  const patients = ref([])
  const error = ref(null)

  const load = async () => {
    try {
      const res = await getDocs(collection(projectFirestore, 'patients'))

      // Map Firestore document data to your patient objects
      patients.value = res.docs.map(doc => {
        const data = doc.data()
        return {
          id: doc.id,
          FirstName: data.FirstName,
          LastName: data.LastName,
          Gender: data.Gender,
          DateofBirth: data.DateofBirth,
          BloodType: data.BloodType,
        }
      })
    } catch (err) {
      error.value = err.message
    }
  }

  return { patients, error, load }
}

export default getPatients
