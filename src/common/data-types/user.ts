export type User = {
    "id": number,
    "name": string,
    "username": string,
    "email": string,
    "address": UserAddress,
    "phone": string,
    "website": string,
    "company": UserCompany
}

export type UserFormValues = {
    name: string;
    phone: string;
    city: string;
    suite: string;
    street: string;
    email: string;
    username: string;
}

type UserAddress = {
    "street": string,
    "suite": string,
    "city": string,
    "zipcode": string,
    "geo": {
        "lat": string,
        "lng": string
    }
}

type UserCompany = {
    "name": string,
    "catchPhrase": string,
    "bs": string
}

