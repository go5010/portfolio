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
    svc.findPlaceFromQuery(placeRequest, (results, status) => {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        setSearchResults(results);
        const newDetailsResults = [...detailsResults];
        results?.forEach((result) => {
          const detailsReq = {
            placeId: result.place_id,
            fields: ["photos", "address_components", "opening_hours"],
          };
          const detailsCallback = (detailsRes: any, detailsSta: any) => {
            if (detailsSta == google.maps.places.PlacesServiceStatus.OK) {
              newDetailsResults.push(detailsRes);
            }
          };
          // @ts-ignore
          svc.getDetails(detailsReq, detailsCallback);
        });
        setDetailsResults(newDetailsResults);
      }
    });
  };

  // nearbySearch
  const nearbySearch = () => {
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
        const newResults = results?.filter((result) => {
          return result.vicinity?.includes("川越市");
        });
        const newSearchResults = newResults;
        const newDetailsResults = [...detailsResults];

        for (const result of newResults!) {
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
      }
    });
  };

  // useEffect(() => {
  //   if (!placesLib || !map) return;
  //   nearbySearch();
  // }, [placesLib, map]);
  // console.log(searchResults, detailsResults);

  // if (!searchResults.length || !detailsResults.length) {
  //   return (
  //     <>
  //       <div>loading...</div>{" "}
  //       <Map
  //         style={{ width: "0px", height: "0px" }}
  //         defaultCenter={{ lat: 35.6895, lng: 139.6917 }}
  //         defaultZoom={10}
  //         gestureHandling={"greedy"}
  //         mapId={process.env.NEXT_PUBLIC_GOOGLE_MAP_ID}
  //         disableDefaultUI={true}
  //       />
  //     </>
  //   );
  // }

  return (
    <>
      <div className="flex mt-6">
        <input className="border border-gray-400 rounded-tl-md rounded-bl-md h-[30px] focus:outline-none p-2"></input>
        <AreaDropdownMenu setQueryLngLat={setQueryLngLat} />
        <PlaceTypeDropdown setQueryPlaceType={setQueryPlaceType} />
      </div>
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
  );
});
