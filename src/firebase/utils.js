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

const isTheSameDay = (date, otherDate)=>{
  // console.log(date.toDateString(), otherDate.toDateString());
  return date.toDateString() === otherDate.toDateString();
}


export const updateDashboard = async(collectionName, data) =>{
  // console.log(data);
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
    const checkValidRegistration = currentData.checkinDays.every((iter)=>{
      return isTheSameDay(iter.toDate(), data.checkinDays[0]);
    })
    if(!checkValidRegistration){
      await updateDoc(docRef, {
        checkinDays: currentData.checkinDays.concat(data.checkinDays),
        currentStreak: data.failed ? 0 : currentData.currentStreak + 1,
        nnnDay: data.failed ? currentData.nnnDay: currentData.nnnDay +1
      })
      // console.log("Ready to add");
    }
    else{
      // console.log("Today is registered");
      return false;
    }
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