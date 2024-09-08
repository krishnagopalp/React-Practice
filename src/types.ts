export interface SuccessLoginProps {
  token: string;
  refreshToken: string;
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
}

export interface CurrentUserProps {
    id: number
    firstName: string
    lastName: string
    maidenName: string
    age: number
    gender: string
    email: string
    phone: string
    username: string
    password: string
    birthDate: string
    image: string
    bloodGroup: string
    height: number
    weight: number
    eyeColor: string
    hair: Hair
    ip: string
    address: Address
    macAddress: string
    university: string
    bank: Bank
    company: Company
    ein: string
    ssn: string
    userAgent: string
    crypto: Crypto
    role: string
  }
  
  export interface Hair {
    color: string
    type: string
  }
  
  export interface Address {
    address: string
    city: string
    state: string
    stateCode: string
    postalCode: string
    coordinates: Coordinates
    country: string
  }
  
  export interface Coordinates {
    lat: number
    lng: number
  }
  
  export interface Bank {
    cardExpire: string
    cardNumber: string
    cardType: string
    currency: string
    iban: string
  }
  
  export interface Company {
    department: string
    name: string
    title: string
    address: Address2
  }
  
  export interface Address2 {
    address: string
    city: string
    state: string
    stateCode: string
    postalCode: string
    coordinates: Coordinates2
    country: string
  }
  
  export interface Coordinates2 {
    lat: number
    lng: number
  }
  
  export interface Crypto {
    coin: string
    wallet: string
    network: string
  }
  