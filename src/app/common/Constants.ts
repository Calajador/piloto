export class Constants{
    static readonly URL_BASE="https://195.55.226.131:443/itaca/dev/itaca/";
    static readonly URL_OAUTH="https://195.55.226.131:443/itaca/dev/oauth-provider/oauth2/token";

    static readonly  UrlApis={
       
        LOGIN:`${Constants.URL_BASE}login/v1/validate`,
        GET_PRODUCTS:`${Constants.URL_BASE}workshop/v1/products?user_name=`,
        POST_CREATE_PERSON:`${Constants.URL_BASE}person/v1/person`,
        POST_SEARCH_PERSON:`${Constants.URL_BASE}person/v1/person/search`,
        GET_VEHICLE_BRANDS:`${Constants.URL_BASE}catalog/v1/vehicles/brands`,
        GET_MODEL_BRANDS:`${Constants.URL_BASE}catalog/v1/vehicles/brands/:id/models`,
        GET_COVERING:`${Constants.URL_BASE}workshop/v1/coverages?id_product=`
    }


}