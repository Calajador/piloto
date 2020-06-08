import { Identification } from './Identification';
import { DrivingLicense } from './DrivingLicense';
import { Address } from './Address';

export interface Person{
    firstName:string;
    lastName:string;
    id?:any;
    dateBorn:any;
    gender:string;
    identifications:Identification[];
    drivingLicenses:DrivingLicense[];
    addresses:Address[];
}