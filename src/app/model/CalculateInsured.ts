export interface CalculateInsured{
    idModality: number;
    idProduct: number;
    idPolicyHolder:number;
    idInsured:number;
    idVersion:number;
    paymentFrequency: number;
    version: string;
    brand: string;
    model: string;
    numberPlate: string;
    cost: number;
    yearVehicle: number;
    vehicleKilometers: number;
    expectedKilometers: number;

}