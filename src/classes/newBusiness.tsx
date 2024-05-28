class NewBusiness {
    id!:string;
    name!: string;
    email!: string;   
    owner!: string;
    

    constructor(id:string, name: string, email: string,owner:string) {
        this.id=id
        this.name = name;
        this.email = email;
        this.owner = owner;
    }
}

export default NewBusiness 


