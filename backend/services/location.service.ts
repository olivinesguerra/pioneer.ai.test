import type { Context, Service, ServiceSchema, ServiceSettingSchema } from "moleculer";
import * as AppFunctions from "../module/functions";
import { success, error } from "../module/util/response";

export interface ActionHelloParams {
    name: string;
}

export interface GetQueryParams {
    query: {
        search: string,
    }
 }
 
interface LocationSettings extends ServiceSettingSchema {
    defaultName: string;
}

interface LocationMethods {
    uppercase(str: string): string;
}

interface LocationLocalVars {
    myVar: string;
}

type LocationThis = Service<LocationSettings> & LocationMethods & LocationLocalVars;

const LocationService: ServiceSchema<LocationSettings> = {
    name: "location",

    /**
     * Settings
     */
    settings: {
        defaultName: "Moleculer",
    },

    /**
     * Dependencies
     */
    dependencies: [],

    /**
     * Actions
     */
    actions: {
        search: {
            rest: {
                method: "GET",
                path: "/search",     
            },
            async handler(ctx: Context<GetQueryParams>): Promise<any> {

                try {
                    const { query } = ctx?.params;
                    const data = await AppFunctions.LocationFunctions.queryLocation(query.search);
                    return success("success", data, 200);
                    return;                 
                }catch(err) {
                    return error("Error", { message: err?.message}, 400);
                }
            },
        },
    },

    /**
     * Events
     */
    events: {},

    /**
     * Methods
     */
    methods: {},

    /**
     * Service created lifecycle event handler
     */
    created() {},

    /**
     * Service started lifecycle event handler
     */
    async started() {},

    /**
     * Service stopped lifecycle event handler
     */
    async stopped() {},
};

export default LocationService;
