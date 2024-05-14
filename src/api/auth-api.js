import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';

export const logoutUser = () => {
  return auth().signOut();
}

export const signUpUser = async ({ name, email, password }) => {
  try {
    const user = await auth()
      .createUserWithEmailAndPassword(email, password)
    auth().currentUser.updateProfile({
      displayName: name,
    })
    return { user }
  } catch (error) {
    return {
      error: error.message,
    }
  }
}

export const loginUser = async ({ email, password }) => {
  return auth().signInWithEmailAndPassword(email, password)
}

export const sendEmailWithPassword = async (email) => {
  try {
    await firebase.auth().sendPasswordResetEmail(email)
    return {}
  } catch (error) {
    return {
      error: error.message,
    }
  }
}