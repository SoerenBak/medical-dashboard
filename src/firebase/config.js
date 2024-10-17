// Import the necessary functions from Firebase SDK
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, serverTimestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD7lIDKZ6Y0c2LuvErDxV4Wb3tEpwHraWg",
    authDomain: "medical-dashboard-fd7a3.firebaseapp.com",
    projectId: "medical-dashboard-fd7a3",
    storageBucket: "medical-dashboard-fd7a3.appspot.com",
    messagingSenderId: "228102247025",
    appId: "1:228102247025:web:0b5553014da171778501d0"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firestore and Auth services
const projectAuth = getAuth(firebaseApp);
const projectFirestore = getFirestore(firebaseApp);

// Access a collection (replace 'your-collection-name' with your actual collection name)
const yourCollection = collection(projectFirestore, 'patients');

// Get server timestamp
const timestamp = serverTimestamp();

// Exporting the initialized services
export { projectAuth, projectFirestore, yourCollection, timestamp };
