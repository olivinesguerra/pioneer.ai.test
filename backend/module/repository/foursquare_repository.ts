import axios from "axios";
import dotenv from 'dotenv';
dotenv.config()

export const searchPlaces = async (
    params: any,
    numberOfRetries: number
) => {
    try {
        console.log("Number of retries", numberOfRetries);
        console.log("params", params);
        const u = new URLSearchParams(params).toString();
        const res =  await axios.get(
            `https://api.foursquare.com/v3/places/search?${u}`,
            {
                headers: {
                  Authorization: `${process.env.FOURSQUARE_API_KEY}`
                }
            }
        );
        console.log(res?.data);
        const { results } = res?.data;

        if (results?.length > 0) {
            return res?.data;
        }
        
        if (numberOfRetries < 10) {
            const nextRetry = numberOfRetries + 1;
            return await searchPlaces(params, nextRetry);
        }

        return { result: [] };
    }catch(err) {
        throw err;
    }
};