import SearchResult from "@/components/organism/SearchResult";
import { Map, useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import React, {
  Dispatch,
  FC,
  memo,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import municipalities from "./municipalities.json";
import AreaDropdownMenu from "./AreaDropdown";
import PlaceTypeDropdown from "./PlaceTypeDropdown";

export const SearchArea: FC<{
  setIsChangedSpotList: Dispatch<SetStateAction<boolean>>;
}> = memo(({ setIsChangedSpotList }) => {
  const map = useMap();
  const placesLib = useMapsLibrary("places");

  const [searchResults, setSearchResults] = useState<any>([]);
  const [detailsResults, setDetailsResults] = useState<any>([]);

  const request = {
    query: "東京スカイツリー",
    fields: ["name", "rating", "geometry", "types", "place_id"],
  };

  const request2 = {
    location: { lat: 35.92533750162224, lng: 139.48583982465075 },
    radius: 7000,
    type: "cafe",
  };

  // useEffect(() => {
  //   if (!placesLib || !map) return;

  //   const svc = new placesLib.PlacesService(map);
  //   svc.findPlaceFromQuery(request, (results, status) => {
  //     console.log(results);

  //     if (status == google.maps.places.PlacesServiceStatus.OK) {
  //       const detailsReq = {
  //         placeId: results![0].place_id,
  //         fields: ["photos", "address_components", "opening_hours"],
  //       };
  //       const detailsCallback = (detailsRes: any, detailsSta: any) => {
  //         if (detailsSta == google.maps.places.PlacesServiceStatus.OK) {
  //           console.log(detailsRes);
  //           setPhotoUrl(detailsRes.photos[0].getUrl());
  //         }
  //       };
  //       // @ts-ignore
  //       svc.getDetails(detailsReq, detailsCallback);
  //     }
  //   });
  //   // svc.nearbySearch(request2, (results, status) => {
  //   //   const results2 = results?.filter((result) => {
  //   //     return result.vicinity?.includes("川越市");
  //   //   });
  //   //   console.log(results2);
  //   // });
  // }, [placesLib, map]);

  // findPlaceSearch
  const findPlaceSearch = () => {
    if (!placesLib || !map) return;

    const svc = new placesLib.PlacesService(map);
    svc.findPlaceFromQuery(request, (results, status) => {
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

    svc.nearbySearch(request2, async (results, status) => {
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
      <div>{municipalities.三重県[0]}</div>
      <div className="flex">
        <input className="border border-gray-400 rounded-tl-md rounded-bl-md h-[30px] focus:outline-none p-2"></input>
        <AreaDropdownMenu />
        <PlaceTypeDropdown />
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
