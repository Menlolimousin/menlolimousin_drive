/* global google */
import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import {
  GoogleMap,
  DirectionsRenderer,
  useLoadScript,
} from "@react-google-maps/api";
import Spinners from "@components/Spinners";

import { Error } from "@utils/lib/Messages";
import api from "@utils/lib/api";
import { useSelector } from "react-redux";
import { AppState } from "store";
import { useRouter } from "next/router";
const geocode = async (place_id: string) => {
  return await api()
    .get<{
      result: [
        {
          place_id: string;
          formatted_address: string;
          geometry: { location: { lat: number; lng: number } };
        }
      ];
    }>("/Location/geocodeforPlaceId", {
      params: { place_id },
    })
    .then((data) => {
      const location = {
        lat: data.data.result[0].geometry.location.lat,
        lng: data.data.result[0].geometry.location.lng,
      };
      return location;
    })
    .catch(() => {
      Error("There was a problem finding the location, please try again.");
    });
};
interface LatLng {
  center: {
    lat: number;
    lng: number;
  };
  pickup: {
    lat: number;
    lng: number;
  };
  dropOff: {
    lat: number;
    lng: number;
  };
}
const Map: React.FC<any> = ({ form, height = "100vh" }) => {
  const key: any = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;
  let libraries: any;
  libraries = ["geometry", "drawing", "places"];
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: key,
    libraries,
  });
  const router = useRouter();
  const [location, setLocation] = useState<LatLng>({
    center: { lat: 0, lng: 0 },
    pickup: { lat: 0, lng: 0 },
    dropOff: { lat: 0, lng: 0 },
  });
  const mapRef = useRef<any>();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const mapContainerStyle = {
    height,
    width: "100%",
  };

  const { Drive } = useSelector((state: AppState) => state.drive);

  const [directions, setDirections] = useState<null | any>(null);
  const [polyLineOptions, setPolyline] = useState<any>(null);
  const filterStops = Drive?.stops?.find((item: { isConfirm: boolean }) => {
    return !item.isConfirm;
  });
  useEffect(() => {
    if (Drive?.stops?.length) {
      if (filterStops) {
        geocode(filterStops?.placeId).then((data: any) => {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              setLocation({
                ...location,
                center: {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude,
                },
                pickup: data,
              });
            },
            () => null
          );
        });
      } else if (Drive?.dropOffPlaceId) {
        geocode(Drive?.dropOffPlaceId).then((data: any) => {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              setLocation({
                ...location,
                center: {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude,
                },
                pickup: data,
              });
            },
            () => null
          );
        });
      }
    } else {
      if (Drive?.dropOffPlaceId) {
        geocode(Drive?.dropOffPlaceId).then((data: any) => {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              setLocation({
                ...location,
                center: {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude,
                },
                pickup: data,
              });
            },
            () => null
          );
        });
      }
    }
  }, [router, Drive]);
  useEffect(() => {
    if (
      location?.center?.lat !== 0 &&
      location?.center?.lng !== 0 &&
      location?.pickup?.lat !== 0 &&
      location?.pickup?.lng !== 0
    ) {
      const DirectionsService = new google.maps.DirectionsService();
      var polyline = new google.maps.Polyline({
        strokeColor: "#000000",
        strokeOpacity: 0.8,
        strokeWeight: 5,
      });
      setPolyline(polyline);
      DirectionsService.route(
        {
          origin: new google.maps.LatLng(
            location?.center?.lat,
            location?.center?.lng
          ),
          destination: new google.maps.LatLng(
            location?.pickup?.lat,
            location?.pickup?.lng
          ),
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            setDirections(result);
          } else {
            // Error("Unable to draw a roadmap for desired locations");
          }
        }
      );
    }
  }, [location, router]);

  if (loadError) return <div>"Error"</div>;
  if (!isLoaded)
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Spinners type={"TailSpin"} w={80} h={80} />
      </div>
    );

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={14}
      center={location?.center}
      options={{ disableDefaultUI: true, zoomControl: false }}
      onLoad={onMapLoad}
    >
      {directions && (
        <DirectionsRenderer
          directions={directions}
          options={{
            polylineOptions: polyLineOptions,
          }}
        />
      )}
    </GoogleMap>
  );
};

export default memo(Map);
