// firebaseとのデータのやり取りは基本このファイルで行う．
// login/logoutは，_appディレクトリのauth.tsで行う．世間的にこんな感じ．
// ディレクトリの_（アンダースコア）は，毎回読み込むことを防ぐ，アプリが軽くなる．page.tsxファイルがないディレクトリは全部アンダースコアをつけて良い？

import { firestore } from "@/_firebase/firebaseConfig";
import {
  DocumentData,
  collection,
  getDocs,
  doc,
  setDoc,
  addDoc,
  query,
  where,
} from "firebase/firestore";

export async function getTests(): Promise<any[] | null> {
  try {
    const ref = collection(firestore, "test");
    const snapshot = await getDocs(ref);

    // ドキュメントが存在しない場合はnullを返す
    if (snapshot.empty) {
      console.error("ドキュメントが見つかりません。");
      return null;
    }

    const tests: DocumentData[] = [];
    snapshot.forEach((doc) => {
      tests.push(doc.data());
    });

    console.log("tests取得");

    return tests;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export async function createTrip(): Promise<any> {
  const tripsRef = collection(firestore, "trips");
  const q = query(tripsRef, where("userID", "==", "xxxxx"));
  const querySnapshot = await getDocs(q);
  const tripDoc = await addDoc(
    collection(firestore, "trips", querySnapshot.docs[0].id, "userTrips"),
    { title: "沖縄旅行" }
  );
  await addDoc(
    collection(
      firestore,
      "trips",
      querySnapshot.docs[0].id,
      "userTrips",
      tripDoc.id,
      "days"
    ),
    { day: 1, schedules: [] }
  );
}

export async function renameTrip(): Promise<any> {
  const tripsRef = collection(firestore, "trips");
  const q1 = query(tripsRef, where("userID", "==", "xxxxx"));
  const q1Snapshot = await getDocs(q1);
  const userTripsRef = collection(
    firestore,
    "trips",
    q1Snapshot.docs[0].id,
    "userTrips"
  );
  const q2 = query(userTripsRef, where("title", "==", "沖縄旅行"));
  const q2Snapshot = await getDocs(q2);
  await setDoc(
    doc(
      firestore,
      "trips",
      q1Snapshot.docs[0].id,
      "userTrips",
      q2Snapshot.docs[0].id
    ),
    { title: "入力した旅行名" }
  );
}
