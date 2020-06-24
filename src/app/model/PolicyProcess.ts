import { VehicleModel } from './VehicleModel';
import { Policy } from './Policy';
import { Payment } from './Payment';

export interface PolicyProcess{
    policyHolder:number;
    insured:number;
    agent:number;
    vehicle:VehicleModel;
    policy:Policy;
    payment:Payment;
    
}