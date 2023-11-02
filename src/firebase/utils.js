import { db } from "./config";
import { addDoc, collection, doc,getDoc, getDocs, orderBy, query, updateDoc, where } from "firebase/firestore";

export const getDashboard = async (collectionName) => {
  const arr = [];
  const collectionRef = collection(db, collectionName);
  const docSnap = await getDocs(
    query(
      collectionRef
    ),
    orderBy('nnnDay')
  )
  try {
    docSnap.forEach((doc)=>{
      const data = doc.data();
      const id = doc.id;
      arr.push({id,data});
    })
  }
  catch (err){
    console.log(err);
  }
  return (arr);
}

export const updateDashboard = async(collectionName, data) =>{
  console.log(data);
  if(data.isNewUser){
    const docRef = await addDoc(collection(db, collectionName), {
      // checkinDays: ...data.checkinDays
      currentStreak: 1,
      name: data.name,
      nnnDay: 1,
      photoURL: data.photoURL,
      checkinDays: [...data.checkinDays],
      uid: data.uid
    })
    try {
      console.log("Data is uploaded with ID: ", docRef.id);
    } catch (err) {
      console.log(err);
    }
  }
  else{
    const docRef = doc(db, collectionName, data.docID);
    const docSnap = await getDoc(docRef);
    const currentData = docSnap.data(); //data before update
    await updateDoc(docRef, {
      checkinDays: [...currentData, ...data.checkinDays],
      currentStreak: data.failed ? 0 : currentData.currentStreak + 1,
      nnnDay: data.failed ? currentData.nnnDay: currentData.nnnDay +1
    })
  }
}

export const getUserIDFirestore = async(collectionName, userID)=>{
  const arr = [];
  const collectionRef = collection(db, collectionName);
  const docSnap = await getDocs(
    query(
      collectionRef,
      where('uid', '==', userID)
    ),
  )
  try {
    docSnap.forEach((doc)=>{
      const id = doc.id;
      arr.push(id);
    })
  }
  catch (err){
    console.log(err);
  }
  return (arr);
}