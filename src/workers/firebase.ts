import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
// import "firebase/performance";

export const init = async (config: any) => {
  firebase.initializeApp(config);
};

/**
 * Get user
 */
export const getUser = async () => {
  return await new Promise((resolve: any) => {
    firebase.auth().onAuthStateChanged((user: any) => {
      resolve(user);
    });
  });
};
