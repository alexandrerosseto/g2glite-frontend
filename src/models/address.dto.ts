import { CityDTO } from "./city.dto";

export interface AddressDTO {
    id: string;
    street: string;
    number: string;
    observation: string;
    address: string;
    postal: string;
    city: CityDTO;
}