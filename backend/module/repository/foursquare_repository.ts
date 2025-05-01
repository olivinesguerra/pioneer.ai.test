import axios from "axios";
import dotenv from 'dotenv';
dotenv.config()

export const searchPlaces = async (
    params: any
) => {
    try {
        const u = new URLSearchParams(params).toString();
        console.log(params);
        return await axios.get(
            `https://api.foursquare.com/v3/places/search?${u}`,
            {
                headers: {
                  Authorization: `${process.env.FOURSQUARE_API_KEY}`
                }
            }
        );
    }catch(err) {
        throw err;
    }
};