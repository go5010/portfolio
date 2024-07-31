import { getFirestore } from "firebase/firestore";
import { FirestoreProvider } from "reactfire";

export default function FirebaseSDKProviders({ children }: any) {
  const firestore = getFirestore();
  return <FirestoreProvider sdk={firestore}>{children}</FirestoreProvider>;
}
