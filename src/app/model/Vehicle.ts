export interface Vehicle{
    version:number;
    versionText?:string;
    plate:string;
    model?:string;
    brand?:string;
    price:number;
    year:number;
    currentKms:number;
    expectedKms:number;
}