export interface IMap {
  form: {
    center: { lat: number; lng: number };
    dropOff: string | string[] | undefined;
    latlngDropOff: { lat: number; lng: number };
    latlngPickUp: { lat: number; lng: number };
    pickup: string | string[] | undefined;
  };
}
