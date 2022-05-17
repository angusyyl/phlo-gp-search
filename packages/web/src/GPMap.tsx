import GoogleMapReact from "google-map-react";
import React, { useState } from "react";
import { useEffect } from "react";
import { useEffectAsync } from "./hooks/useEffectAsync";
import { faUserMd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as styles from "./GPMap.module.css";

export const GPMap = () => {
  const defaultLocation = {
    lat: 55.8627026,
    lng: -4.2460259,
  };

  const defaultMapParams = {
    center: defaultLocation,
    zoom: 13,
  };

  const [searchLocation, setSearchLocation] = useState(defaultLocation);

  const [gps, setGps] = useState<any | undefined>(undefined);

  // wrap it into promise-based
  const getCurrentPosition = (options?: PositionOptions): Promise<GeolocationPosition> => {
    if (!navigator.geolocation) {
      throw new Error('Geolocation service is not available!');
    }
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    })
  };

  useEffectAsync(async () => {
    const currPos = await getCurrentPosition();
    console.debug(`lat: ${currPos.coords.latitude}`);
    console.debug(`lng: ${currPos.coords.longitude}`);

    try {
      setSearchLocation({ lat: currPos.coords.latitude, lng: currPos.coords.longitude });
    } catch (err) {
      console.error(`Could not find current location: ${err}`);
      setSearchLocation(defaultLocation);
    }
  }, []);

  useEffectAsync(async () => {
    const gpsResponse = await fetch(
      `http://localhost:3000/gps?lat=${searchLocation.lat}&lng=${searchLocation.lng}`
    );
    const gpsRaw = await gpsResponse.json();
    setGps(gpsRaw);
  }, [searchLocation]);

  // toggle selected state
  const selectGP = (name: string) => {
    setGps(
      gps.map((gp: any) => gp.selected = false)
    );
    setGps(
      gps.map((gp: any) => gp.name === name ? { ...gp, selected: !gp.selected } : gp)
    );
    // console.debug(JSON.stringify(gps));
  };

  return (
    <>
      {gps && (
        <>
          <GoogleMapReact
            bootstrapURLKeys={{ key: "AIzaSyC2CmhUmpXIxkcQubwX42E1GqlJ_YgcjtU" }}
            defaultCenter={defaultMapParams.center}
            defaultZoom={defaultMapParams.zoom}
            center={{ lat: searchLocation.lat, lng: searchLocation.lng }}
          >
            {gps.map((gp: any) => (
              <GPMapIcon
                key={gp.name}
                gp={gp}
                lat={gp.location.lat}
                lng={gp.location.lng}
                text={gp.name}
                onClick={() => selectGP(gp.name)}
              ></GPMapIcon>
            ))}
          </GoogleMapReact>
          {gps.map((gp: any) => (
            <Doctor key={gp.name} doctor={gp} onClick={() => selectGP(gp.name)}>{gp.name}</Doctor>
          ))}
        </>
      )}
    </>
  );
};

const GPMapIcon = ({ gp, onClick }: any) => {
  return (
    <FontAwesomeIcon
      icon={faUserMd}
      size="2x"
      className={gp.selected ? styles.mapIconHighlight : styles.mapIcon}
      onClick={onClick}
    ></FontAwesomeIcon>
  );
};

const Doctor = ({ doctor, onClick }: any) => {
  return (
    <div className={doctor.selected ? styles.doctorContainerHighlight : ''} onClick={onClick}>
      <div>Name: {doctor.name}</div>
      <div>Address: {doctor.address}</div>
    </div>
  );
}