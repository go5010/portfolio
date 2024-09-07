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
  orderBy,
  deleteDoc,
  updateDoc,
  getDoc,
} from "firebase/firestore";

type spotType = {
  title: string;
  memo: string;
  location: { lat: number; lng: number };
};

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

export async function createTrip(tripName: string): Promise<any> {
  const targetUser = "testuser";
  const tripsRef = collection(firestore, "trips");
  const q = query(tripsRef, where("userID", "==", targetUser));
  const querySnapshot = await getDocs(q);
  const tripDoc = await addDoc(
    collection(firestore, "trips", querySnapshot.docs[0].id, "userTrips"),
    { title: tripName }
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

export async function renameTrip(
  targetTrip: string,
  newTripName: string
): Promise<any> {
  const targetUser = "testuser";
  const tripsRef = collection(firestore, "trips");
  const q1 = query(tripsRef, where("userID", "==", targetUser));
  const q1Snapshot = await getDocs(q1);
  const userTripsRef = collection(
    firestore,
    "trips",
    q1Snapshot.docs[0].id,
    "userTrips"
  );
  const q2 = query(userTripsRef, where("title", "==", targetTrip));
  const q2Snapshot = await getDocs(q2);
  await setDoc(
    doc(
      firestore,
      "trips",
      q1Snapshot.docs[0].id,
      "userTrips",
      q2Snapshot.docs[0].id
    ),
    { title: newTripName }
  );
}

export async function addDay(targetTripTitle: string): Promise<any> {
  const targetUser = "testuser";
  const tripsRef = collection(firestore, "trips");
  const q1 = query(tripsRef, where("userID", "==", targetUser));
  const q1Snapshot = await getDocs(q1);
  const userTripsRef = collection(
    firestore,
    "trips",
    q1Snapshot.docs[0].id,
    "userTrips"
  );
  const q2 = query(userTripsRef, where("title", "==", targetTripTitle));
  const q2Snapshot = await getDocs(q2);
  const daysRef = collection(
    firestore,
    "trips",
    q1Snapshot.docs[0].id,
    "userTrips",
    q2Snapshot.docs[0].id,
    "days"
  );
  const q3 = query(daysRef, orderBy("day", "desc"));
  const q3Snapshot = await getDocs(q3);
  const newDay = q3Snapshot.docs[0].data().day + 1;

  await addDoc(
    collection(
      firestore,
      "trips",
      q1Snapshot.docs[0].id,
      "userTrips",
      q2Snapshot.docs[0].id,
      "days"
    ),
    { day: newDay, schedules: [] }
  );
}

export async function deleteDay(
  targetTripTitle: string,
  targetDay: number
): Promise<any> {
  const targetUser = "testuser";
  const tripsRef = collection(firestore, "trips");
  const q1 = query(tripsRef, where("userID", "==", targetUser));
  const q1Snapshot = await getDocs(q1);
  const userTripsRef = collection(
    firestore,
    "trips",
    q1Snapshot.docs[0].id,
    "userTrips"
  );
  const q2 = query(userTripsRef, where("title", "==", targetTripTitle));
  const q2Snapshot = await getDocs(q2);
  const daysRef = collection(
    firestore,
    "trips",
    q1Snapshot.docs[0].id,
    "userTrips",
    q2Snapshot.docs[0].id,
    "days"
  );
  // dayフィールドの最大値を取得
  const q3 = query(daysRef, orderBy("day", "desc"));
  const q3Snapshot = await getDocs(q3);
  const maxDay = q3Snapshot.docs[0].data().day;
  // 対象日程のドキュメントを削除
  const q4 = query(daysRef, where("day", "==", targetDay));
  const q4Snapshot = await getDocs(q4);
  await deleteDoc(q4Snapshot.docs[0].ref);
  // 削除された日程の分，前に詰める
  if (targetDay !== maxDay) {
    q3Snapshot.forEach((doc) => {
      if (doc.data().day > targetDay) {
        updateDoc(doc.ref, { day: doc.data().day - 1 });
      }
    });
  }
}

export async function deleteTrip(): Promise<any> {
  const targetUser = "testuser";
  const delTargetTrip = "削除する旅行";
  const tripsRef = collection(firestore, "trips");
  const q1 = query(tripsRef, where("userID", "==", targetUser));
  const q1Snapshot = await getDocs(q1);
  const userTripsRef = collection(
    firestore,
    "trips",
    q1Snapshot.docs[0].id,
    "userTrips"
  );
  const q2 = query(userTripsRef, where("title", "==", delTargetTrip));
  const q2Snapshot = await getDocs(q2);
  const daysRef = collection(
    firestore,
    "trips",
    q1Snapshot.docs[0].id,
    "userTrips",
    q2Snapshot.docs[0].id,
    "days"
  );
  const daysSnapshot = await getDocs(daysRef);
  daysSnapshot.forEach((doc) => {
    deleteDoc(doc.ref);
  });
  await deleteDoc(q2Snapshot.docs[0].ref);
}

export async function createTripListArr(): Promise<any> {
  const targetUser = "testuser";
  const tripsRef = collection(firestore, "trips");
  const q1 = query(tripsRef, where("userID", "==", targetUser));
  const q1Snapshot = await getDocs(q1);
  const userTripsRef = collection(
    firestore,
    "trips",
    q1Snapshot.docs[0].id,
    "userTrips"
  );
  const q2 = query(userTripsRef);
  const q2Snapshot = await getDocs(q2);

  const tripList = [];
  for (const userTrip of q2Snapshot.docs) {
    let oneTripObj: { id: string; title: string; schedules: [][] } = {
      id: userTrip.id,
      title: userTrip.data().title,
      schedules: [],
    };
    const daysRef = collection(
      firestore,
      "trips",
      q1Snapshot.docs[0].id,
      "userTrips",
      userTrip.id,
      "days"
    );
    const q3 = query(daysRef, orderBy("day"));
    const q3Snapshot = await getDocs(q3);
    q3Snapshot.forEach((dayDoc) => {
      oneTripObj.schedules.push(dayDoc.data().schedules);
    });
    tripList.push(oneTripObj);
  }

  return tripList;
}

export async function deleteSpot(
  targetTripTitle: string,
  targetDay: number,
  targetSpotTitle: string
): Promise<any> {
  const targetUser = "testuser";
  const tripsRef = collection(firestore, "trips");
  const q1 = query(tripsRef, where("userID", "==", targetUser));
  const q1Snapshot = await getDocs(q1);
  const userTripsRef = collection(
    firestore,
    "trips",
    q1Snapshot.docs[0].id,
    "userTrips"
  );
  const q2 = query(userTripsRef, where("title", "==", targetTripTitle));
  const q2Snapshot = await getDocs(q2);
  const daysRef = collection(
    firestore,
    "trips",
    q1Snapshot.docs[0].id,
    "userTrips",
    q2Snapshot.docs[0].id,
    "days"
  );
  // 対象日程のdayドキュメントを取得
  const q3 = query(daysRef, orderBy("day"));
  const q3Snapshot = await getDocs(q3);
  const targetDayDocRef = q3Snapshot.docs[targetDay - 1].ref;
  // 書き換え先の配列を作成
  const newSchedules = q3Snapshot.docs[targetDay - 1]
    .data()
    .schedules.filter((spot: spotType) => {
      return spot.title !== targetSpotTitle;
    });
  // schedulesフィールドの書き換え
  await updateDoc(targetDayDocRef, { schedules: newSchedules });
}

export async function saveSpotMemo(
  targetTripTitle: string,
  targetDay: number,
  targetSpotTitle: string,
  newSpotMemo: string
): Promise<any> {
  const targetUser = "testuser";
  const tripsRef = collection(firestore, "trips");
  const q1 = query(tripsRef, where("userID", "==", targetUser));
  const q1Snapshot = await getDocs(q1);
  const userTripsRef = collection(
    firestore,
    "trips",
    q1Snapshot.docs[0].id,
    "userTrips"
  );
  const q2 = query(userTripsRef, where("title", "==", targetTripTitle));
  const q2Snapshot = await getDocs(q2);
  const daysRef = collection(
    firestore,
    "trips",
    q1Snapshot.docs[0].id,
    "userTrips",
    q2Snapshot.docs[0].id,
    "days"
  );
  // 対象日程のdayドキュメントを取得
  const q3 = query(daysRef, orderBy("day"));
  const q3Snapshot = await getDocs(q3);
  const targetDayDocRef = q3Snapshot.docs[targetDay - 1].ref;
  // 書き換え先の配列を作成
  const newSchedules = q3Snapshot.docs[targetDay - 1]
    .data()
    .schedules.map((spot: spotType) => {
      if (spot.title !== targetSpotTitle) return spot;
      spot.memo = newSpotMemo;
      return spot;
    });
  // schedulesフィールドの書き換え
  await updateDoc(targetDayDocRef, { schedules: newSchedules });
}
