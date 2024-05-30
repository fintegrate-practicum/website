 export enum BusinessSize {
    Private = 'Private',
    Public = 'public',
    International = 'International',
    Global = 'global'
}


class Business {
    companyNumber!:string
    description!: string;
    name!: string;
    email!: string;
    logo!: string;
    phone!: string;
    address!: {
        city: string;
        street: string;
        num: number;
    };
    businessSize!: BusinessSize;
    industryType!: string;
    establishmentDate!: string;
}

export default Business 


