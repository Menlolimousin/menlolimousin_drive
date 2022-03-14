import axios from "axios";
import Cookies from "js-cookie";

const api = () => {
  const token = Cookies.get("driveToken");

  return axios.create({
    baseURL:
      process.env.NODE_ENV === "production"
        ? "https://menlolimousin.herokuapp.com/api/v1"
        : "http://localhost:5000/api/v1",
    headers: {
      Authorization: `Bearer: ${token}`,
    },
  });
};
export const getLocation = async (place_id: string) => {
  return await api()
    .get("/Location/geocodeforPlaceId", {
      params: { place_id },
    })
    .then((data) => {
      const location = data?.data?.result.map(
        (item: { geometry: { location: { lat: number; lng: number } } }) => {
          return item?.geometry?.location;
        }
      );

      return location;
    })
    .catch((err) => {
      console.log(err.response);
    });
};
export default api;
