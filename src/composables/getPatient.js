import { ref } from 'vue'
import { doc, getDoc } from 'firebase/firestore'
import { projectFirestore } from '../firebase/config'

const getPatient = (id) => {
  const patient = ref(null)
  const error = ref(null)

  const load = async () => {
    try {
      const res = await getDoc(doc(projectFirestore, 'patients', id))
      
      if (!res.exists()) {
        throw Error('That patient does not exist')
      }
      patient.value = { ...res.data(), id: res.id }
    } catch (err) {
      error.value = err.message
    }
  }

  return { patient, error, load }
}

export default getPatient
