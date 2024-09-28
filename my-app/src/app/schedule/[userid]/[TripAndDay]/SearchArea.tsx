import SearchResult from "@/components/organism/SearchResult";
import { Map, useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import React, {
  Dispatch,
  FC,
  memo,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import AreaDropdownMenu from "./AreaDropdown";
import PlaceTypeDropdown from "./PlaceTypeDropdown";
import PrimaryButton from "@/components/atoms/PrimaryButton";

type TypeOfIsLack = "Area" | "PlaceType" | "";

export const SearchArea: FC<{
  setIsChangedSpotList: Dispatch<SetStateAction<boolean>>;
}> = memo(({ setIsChangedSpotList }) => {
  const map = useMap();
  const placesLib = useMapsLibrary("places");
  const [queryKeyword, setQueryKeyword] = useState<string>("");
  const [queryLngLat, setQueryLngLat] = useState<Array<number>>([]);
  const [queryPlaceType, setQueryPlaceType] = useState<string>("");
  const [searchResults, setSearchResults] = useState<any>([]);
  const [detailsResults, setDetailsResults] = useState<any>([]);
  //エリア・カテゴリ検索の未入力アラート用
  const [isLack, setIsLack] = useState<TypeOfIsLack>("");
  const [resultLoading, setResultLoading] = useState<boolean>(false);
  const [didSearch, setDidSearch] = useState<boolean>(false); //初期表示用

  const placeRequest = {
    query: queryKeyword,
    fields: ["name", "rating", "geometry", "types", "place_id"],
  };

  const nearbyRequest = {
    location: { lat: queryLngLat[1], lng: queryLngLat[0] },
    radius: 7000,
    type: queryPlaceType,
  };

  // findPlaceSearch
  const findPlaceSearch = () => {
    if (!placesLib || !map) return;

    const svc = new placesLib.PlacesService(map);
    const getDetailsPromise = (
      request: google.maps.places.PlaceDetailsRequest
    ): Promise<{
      res: google.maps.places.PlaceResult | null;
      status: google.maps.places.PlacesServiceStatus;
    }> => {
      return new Promise((resolve, reject) => {
        svc.getDetails(request, (res, status) => {
          resolve({ res, status });
        });
      });
    };

    svc.findPlaceFromQuery(placeRequest, async (results, status) => {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        setSearchResults(results);
        console.log(results);
        const newDetailsResults: Array<any> = [];

        for (const result of results!) {
          const detailsReq = {
            placeId: result.place_id ?? "",
            fields: ["photos", "address_components", "opening_hours"],
          };
          const detailsCallback = (detailsRes: any, detailsSta: any) => {
            if (detailsSta == google.maps.places.PlacesServiceStatus.OK) {
              const detailsResObj = {
                photos: detailsRes.photos,
                address_components: detailsRes.address_components,
                opening_hours: detailsRes.opening_hours,
              };
              console.log(detailsResObj);
              newDetailsResults.push(detailsResObj);
            }
          };
          const { res, status } = await getDetailsPromise(detailsReq);
          detailsCallback(res, status);
        }
        setDetailsResults(newDetailsResults);
        setResultLoading(false);
      }
    });
  };

  // nearbySearch
  const nearbySearch = () => {
    console.log(placesLib, map);
    if (!placesLib || !map) return;

    const svc = new placesLib.PlacesService(map);
    const getDetailsPromise = (
      request: google.maps.places.PlaceDetailsRequest
    ): Promise<{
      res: google.maps.places.PlaceResult | null;
      status: google.maps.places.PlacesServiceStatus;
    }> => {
      return new Promise((resolve, reject) => {
        svc.getDetails(request, (res, status) => {
          resolve({ res, status });
        });
      });
    };

    svc.nearbySearch(nearbyRequest, async (results, status) => {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        // 対象市区町村だけにフィルタリング
        // const newResults = results?.filter((result) => {
        //   return result.vicinity?.includes("川越市");
        // });
        const newSearchResults = results;
        const newDetailsResults: Array<any> = [];

        for (const result of results!) {
          const detailsReq = {
            placeId: result.place_id ?? "",
            fields: ["photos", "address_components", "opening_hours"],
          };
          const detailsCallback = (detailsRes: any, detailsSta: any) => {
            if (detailsSta == google.maps.places.PlacesServiceStatus.OK) {
              const detailsResObj = {
                photos: detailsRes.photos,
                address_components: detailsRes.address_components,
                opening_hours: detailsRes.opening_hours,
              };
              newDetailsResults.push(detailsResObj);
            }
          };
          const { res, status } = await getDetailsPromise(detailsReq);
          detailsCallback(res, status);
        }
        setSearchResults(newSearchResults);
        setDetailsResults(newDetailsResults);
        setResultLoading(false);
      }
    });
  };

  // 検索
  const executeSearch = () => {
    // キーワード・エリア・カテゴリ全て未入力
    if (!queryKeyword && !queryLngLat.length && !queryPlaceType) {
      setIsLack("");
    }
    // キーワード入力あり
    else if (queryKeyword) {
      setIsLack(""); //リセット
      setDidSearch(true);
      setResultLoading(true);
      findPlaceSearch();
    }
    // エリア・カテゴリ入力あり
    else if (!queryKeyword && queryLngLat.length && queryPlaceType) {
      setIsLack(""); //リセット
      setDidSearch(true);
      setResultLoading(true);
      nearbySearch();
    }
    // カテゴリが未入力
    else if (!queryKeyword && queryLngLat.length && !queryPlaceType) {
      setIsLack("PlaceType");
    }
    // エリアが未入力
    else if (!queryKeyword && !queryLngLat.length && queryPlaceType) {
      setIsLack("Area");
    }
  };

  return (
    <>
      <div className="flex mt-6 justify-center items-center">
        <div className="flex mr-10">
          <input
            className="border border-gray-400 rounded-tl-md rounded-bl-md h-[30px] focus:outline-none p-2 placeholder-gray-300"
            onChange={(event) => {
              setQueryKeyword(event.target.value);
            }}
            placeholder="キーワード"
          ></input>
          <AreaDropdownMenu setQueryLngLat={setQueryLngLat} isLack={isLack} />
          <PlaceTypeDropdown
            setQueryPlaceType={setQueryPlaceType}
            isLack={isLack}
          />
        </div>
        <PrimaryButton onClickFunc={executeSearch}>検索</PrimaryButton>
      </div>

      {/* 検索未実施 */}
      {!didSearch && (
        <>
          <div className="text-center font-extrabold xs:text-lg md:text-xl w-full mt-8">
            「キーワード」か「エリアとカテゴリ」で検索してみましょう！
          </div>
          {/* Places API実行用Map */}
          <Map
            style={{ width: "0px", height: "0px" }}
            defaultCenter={{ lat: 35.6895, lng: 139.6917 }}
            defaultZoom={10}
            gestureHandling={"greedy"}
            disableDefaultUI={true}
            mapId={process.env.NEXT_PUBLIC_GOOGLE_MAP_ID}
          />
        </>
      )}
      {/* 検索中 */}
      {didSearch && resultLoading && (
        <>
          <div>loading...</div>
          {/* Places API実行用Map */}
          <Map
            style={{ width: "0px", height: "0px" }}
            defaultCenter={{ lat: 35.6895, lng: 139.6917 }}
            defaultZoom={10}
            gestureHandling={"greedy"}
            disableDefaultUI={true}
            mapId={process.env.NEXT_PUBLIC_GOOGLE_MAP_ID}
          />
        </>
      )}
      {/* 検索完了 */}
      {((didSearch && !resultLoading && searchResults.length) ||
        (didSearch && !resultLoading && detailsResults.length)) && (
        <>
          <div className="h-[20px]"></div>
          {searchResults.map((result: any, index: number) => {
            return (
              <SearchResult
                searchResult={result}
                detailsResult={detailsResults[index]}
                setIsChangedSpotList={setIsChangedSpotList}
              />
            );
          })}
          {/* Places API実行用Map */}
          <Map
            style={{ width: "0px", height: "0px" }}
            defaultCenter={{ lat: 35.6895, lng: 139.6917 }}
            defaultZoom={10}
            gestureHandling={"greedy"}
            disableDefaultUI={true}
            mapId={process.env.NEXT_PUBLIC_GOOGLE_MAP_ID}
          />
        </>
      )}
      {/* 検索結果なし */}
      {((didSearch && !resultLoading && !searchResults.length) ||
        (didSearch && !resultLoading && !detailsResults.length)) && (
        <>
          <div>検索結果が見つかりませんでした</div>
          {/* Places API実行用Map */}
          <Map
            style={{ width: "0px", height: "0px" }}
            defaultCenter={{ lat: 35.6895, lng: 139.6917 }}
            defaultZoom={10}
            gestureHandling={"greedy"}
            disableDefaultUI={true}
            mapId={process.env.NEXT_PUBLIC_GOOGLE_MAP_ID}
          />
        </>
      )}
    </>
  );
});
