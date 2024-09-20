export interface IProvince {
    id: string
    created_at: Date
    updated_at: Date
    deleted_at: Date
    name: string
    cities: ICity[]
  }
  
  export interface ICity {
    id: string
    created_at: Date
    updated_at: Date
    deleted_at: Date
    name: string
    type: string
    province_id: string
    subdistricts: ISubdistrict[]
  }
  
  export interface ISubdistrict {
    id: string
    created_at: Date
    updated_at: Date
    deleted_at: Date
    name: string
    city_id: string
  }