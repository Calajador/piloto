export interface OAuthResponse{
    token_type:string;
    access_token:string;
    expires_in:number;
    consented_on:number;
    scope:string;
}