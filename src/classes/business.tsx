 export enum BusinessSize {
    Private = 'Private',
    Public = 'public',
    International = 'International',
    Global = 'global'
}

class Business {
    id!:number
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
    owner!: string;
    businessSize!: BusinessSize;
    industryType!: string;
    establishmentDate!: string;

    constructor(description: string, name: string, email: string, logo: string, phone: string, address: { city: string, street: string, num: number }, owner: string, businessSize: BusinessSize, industryType: string, establishmentDate: string,id:number) {
        this.id=id
        this.description = description;
        this.name = name;
        this.email = email;
        this.logo = logo;
        this.phone = phone;
        this.address = address;
        this.owner = owner;
        this.businessSize = businessSize;
        this.industryType = industryType;
        this.establishmentDate = establishmentDate;

    }
}

export default Business 


