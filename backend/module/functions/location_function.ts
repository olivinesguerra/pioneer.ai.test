
import { 
    FoursquareRepository,
    SonnetRepository 
} from "../repository";


export const queryLocation = async (query: string) => {
    const { params } = await SonnetRepository.formParameters(query);
    const res = await FoursquareRepository.searchPlaces(params);
    return res?.data;
};