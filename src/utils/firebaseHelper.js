import { db } from './firebase';
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy, 
  where 
} from 'firebase/firestore';

// Collection references
const contactColRef = collection(db, 'contacts');
const newsletterColRef = collection(db, 'newsletters');
const tourColRef = collection(db, 'tours');

// Helper to save a Contact Lead
export const submitContactForm = async (formData) => {
  const newLead = {
    name: formData.name,
    email: formData.email,
    subject: formData.subject,
    message: formData.message,
    date: new Date().toISOString(),
    status: 'New'
  };
  const docRef = await addDoc(contactColRef, newLead);
  return { id: docRef.id, ...newLead };
};

// Helper to save a Newsletter Signup
export const submitNewsletterForm = async (email) => {
  // Check for duplicates first by fetching
  const q = query(newsletterColRef, where('email', '==', email.toLowerCase()));
  const snapshot = await getDocs(q);
  if (!snapshot.empty) {
    return null; // Already subscribed
  }

  const newLead = {
    email: email.toLowerCase(),
    date: new Date().toISOString(),
    status: 'Active'
  };
  const docRef = await addDoc(newsletterColRef, newLead);
  return { id: docRef.id, ...newLead };
};

// Helper to save a Tour Booking Request
export const submitTourForm = async (formData) => {
  const newLead = {
    name: formData.name,
    email: formData.email,
    phone: formData.phone,
    preferredDate: formData.preferredDate || 'N/A',
    preferredTime: formData.preferredTime || 'N/A',
    residenceType: formData.residenceType || 'Duplex Penthouse',
    date: new Date().toISOString(),
    status: 'Pending'
  };
  const docRef = await addDoc(tourColRef, newLead);
  return { id: docRef.id, ...newLead };
};

// Helper to get all leads from a collection for Admin Dashboard
export const fetchLeads = async (collectionName) => {
  const colRef = collection(db, collectionName);
  const q = query(colRef, orderBy('date', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

// Helper to update status of a lead
export const updateLeadStatus = async (collectionName, leadId, newStatus) => {
  const docRef = doc(db, collectionName, leadId);
  await updateDoc(docRef, { status: newStatus });
};

// Helper to delete a lead record
export const deleteLead = async (collectionName, leadId) => {
  const docRef = doc(db, collectionName, leadId);
  await deleteDoc(docRef);
};
