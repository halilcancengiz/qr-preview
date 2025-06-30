// API TYPES (REQ, RES) START

export interface IGetMenuBySlugResponse {
    menu: ICategory[],
    theme: string,
    business: IBusiness
}
export interface IGetMenuBySlugRequest {
    slug: string | undefined
}

export interface BaseResponse<T> {
    message: string,
    statusCode: string
    data?: T
}

// API TYPES (REQ, RES) END


export interface IProduct {
    _id: string
    userId: string,
    categoryId: string,
    name: string,
    description: string,
    price: number,
    currency: "TRY" | "USD" | "EUR",
    image: string,
    allergens: string[],
    isVisible: boolean,
    preparationTime: number,
    sortOrder: number,
    views: number
    createdAt: Date,
    updatedAt: Date,

}

export interface ICategory {
    _id: string
    userId: string
    name: string,
    image: string,
    products: IProduct[],
    isVisible: boolean,
    createdAt: Date,
    updatedAt: Date,
}

export interface IBusiness {
    _id: string,
    userId: string,
    businessName: string,
    businessAddress: IBusinessAddress
    businessType: "restaurant" | "cafe" | "bar" | "fastfood" | "bakery" | "bistro" | "pub" | "dessert" | "other"
    image: string,
    owner: IOwner,
    slug: string | undefined,
    socialMedia: ISocialMedia,
    createdAt: string,
    updatedAt: string,
    openingHours: string
}

export interface IBusinessAddress {
    country: string,
    city: string,
    district: string,
    street: string,
    zipCode: string
}

export interface IOwner {
    name: string,
    phoneNumber: string
}

export interface ISocialMedia {
    facebook: string,
    instagram: string,
    x: string
    website: string,
}