// firebaseとのデータのやり取りは基本このファイルで行う．
// login/logoutは，_appディレクトリのauth.tsで行う．世間的にこんな感じ．
// ディレクトリの_（アンダースコア）は，毎回読み込むことを防ぐ，アプリが軽くなる．page.tsxファイルがないディレクトリは全部アンダースコアをつけて良い？

import { firestore } from "@/_firebase/firebaseConfig";
import { useLoginUser } from "@/hooks/useLoginUser";
import { UserContext } from "@/providers/UserProvider";
import firebase from "firebase/compat/app";
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
import { useContext } from "react";

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

// user新規登録
export async function addUser(authUserID: string): Promise<any> {
  await addDoc(collection(firestore, "trips"), { userID: authUserID });
}

export async function createTrip(
  targetUserID: string,
  tripName: string
): Promise<any> {
  // 現在時刻取得
  const now = new Date();
  const year = now.getFullYear(); // 年
  const month = String(now.getMonth() + 1).padStart(2, "0"); // 月 (0から始まるため+1)
  const day = String(now.getDate()).padStart(2, "0"); // 日
  const hours = String(now.getHours()).padStart(2, "0"); // 時
  const minutes = String(now.getMinutes()).padStart(2, "0"); // 分
  const seconds = String(now.getSeconds()).padStart(2, "0"); // 秒
  const formattedDateTime = `${year}${month}${day}${hours}${minutes}${seconds}`;

  const tripsRef = collection(firestore, "trips");
  const q = query(tripsRef, where("userID", "==", targetUserID));
  const querySnapshot = await getDocs(q);
  const tripDoc = await addDoc(
    collection(firestore, "trips", querySnapshot.docs[0].id, "userTrips"),
    { title: tripName, createdAt: formattedDateTime }
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
  targetUserID: string,
  targetTrip: string,
  newTripName: string
): Promise<any> {
  const tripsRef = collection(firestore, "trips");
  const q1 = query(tripsRef, where("userID", "==", targetUserID));
  const q1Snapshot = await getDocs(q1);
  const userTripsRef = collection(
    firestore,
    "trips",
    q1Snapshot.docs[0].id,
    "userTrips"
  );
  const q2 = query(userTripsRef, where("title", "==", targetTrip));
  const q2Snapshot = await getDocs(q2);
  const createdAt = q2Snapshot.docs[0].data().createdAt;
  await setDoc(
    doc(
      firestore,
      "trips",
      q1Snapshot.docs[0].id,
      "userTrips",
      q2Snapshot.docs[0].id
    ),
    { title: newTripName, createdAt: createdAt }
  );
}

export async function addDay(
  targetUserID: string,
  targetTripTitle: string
): Promise<any> {
  const tripsRef = collection(firestore, "trips");
  const q1 = query(tripsRef, where("userID", "==", targetUserID));
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
  targetUserID: string,
  targetTripTitle: string,
  targetDay: number
): Promise<any> {
  const tripsRef = collection(firestore, "trips");
  const q1 = query(tripsRef, where("userID", "==", targetUserID));
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
  console.log(targetTripTitle, targetDay);
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

export async function deleteTrip(
  targetUserID: string,
  targetTrip: string
): Promise<any> {
  const delTargetTrip = targetTrip;
  const tripsRef = collection(firestore, "trips");
  const q1 = query(tripsRef, where("userID", "==", targetUserID));
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

export async function createTripListArr(targetUserID: string): Promise<any> {
  const tripsRef = collection(firestore, "trips");
  const q1 = query(tripsRef, where("userID", "==", targetUserID));
  const q1Snapshot = await getDocs(q1);
  const userTripsRef = collection(
    firestore,
    "trips",
    q1Snapshot.docs[0].id,
    "userTrips"
  );
  const q2 = query(userTripsRef, orderBy("createdAt"));
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
  targetUserID: string,
  targetTripTitle: string,
  targetDay: number,
  targetSpotTitle: string
): Promise<any> {
  const tripsRef = collection(firestore, "trips");
  const q1 = query(tripsRef, where("userID", "==", targetUserID));
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
  targetUserID: string,
  targetTripTitle: string,
  targetDay: number,
  targetSpotTitle: string,
  newSpotMemo: string
): Promise<any> {
  const tripsRef = collection(firestore, "trips");
  const q1 = query(tripsRef, where("userID", "==", targetUserID));
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

export async function saveSpot(
  targetUserID: string,
  targetTripID: string,
  targetDay: number,
  searchResult: any,
  detailsResult: any
): Promise<any> {
  const tripsRef = collection(firestore, "trips");
  const q1 = query(tripsRef, where("userID", "==", targetUserID));
  const q1Snapshot = await getDocs(q1);
  const userTripsRef = collection(
    firestore,
    "trips",
    q1Snapshot.docs[0].id,
    "userTrips"
  );
  const q2 = query(userTripsRef, where("__name__", "==", targetTripID));
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
  const newSchedules = [...q3Snapshot.docs[targetDay - 1].data().schedules];
  const newSpotObj = {
    ...(searchResult.name && { title: searchResult.name }),
    ...(detailsResult.photos[0] && {
      photo1: detailsResult.photos[0].getUrl(),
    }),
    ...(detailsResult.photos[1] && {
      photo2: detailsResult.photos[1].getUrl(),
    }),
    ...(detailsResult.photos[2] && {
      photo3: detailsResult.photos[2].getUrl(),
    }),
    ...(detailsResult.photos[3] && {
      photo4: detailsResult.photos[3].getUrl(),
    }),
    ...(searchResult.rating && { rating: searchResult.rating }),
    ...(searchResult.vicinity && { address: searchResult.vicinity }),
    ...(detailsResult.opening_hours && {
      open_hours_mon: detailsResult.opening_hours.weekday_text[0],
    }),
    ...(detailsResult.opening_hours && {
      open_hours_tue: detailsResult.opening_hours.weekday_text[1],
    }),
    ...(detailsResult.opening_hours && {
      open_hours_wed: detailsResult.opening_hours.weekday_text[2],
    }),
    ...(detailsResult.opening_hours && {
      open_hours_thu: detailsResult.opening_hours.weekday_text[3],
    }),
    ...(detailsResult.opening_hours && {
      open_hours_fri: detailsResult.opening_hours.weekday_text[4],
    }),
    ...(detailsResult.opening_hours && {
      open_hours_sat: detailsResult.opening_hours.weekday_text[5],
    }),
    ...(detailsResult.opening_hours && {
      open_hours_sun: detailsResult.opening_hours.weekday_text[6],
    }),
    ...(searchResult.geometry && {
      location: {
        lat: searchResult.geometry.location.lat(),
        lng: searchResult.geometry.location.lng(),
      },
    }),
    memo: "",
  };
  newSchedules.push(newSpotObj);
  // schedulesフィールドの書き換え
  await updateDoc(targetDayDocRef, { schedules: newSchedules });
}
