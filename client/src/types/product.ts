export enum ProductStatus {
  OffShelf = 0,
  OnShelf = 1
}

export interface Product {
  id: number
  name: string
  price: number
  original_price: number
  stock: number
  sales: number
  cover: string
  images: string
  description: string
  detail: string
  category_id: number | null
  category_name: string
  status: number
  is_hot: number
  is_new: number
  created_at: string
  updated_at: string
}

export interface ProductQueryParams {
  keyword?: string
  category_id?: number | ''
  sort?: string
  page?: number
  pageSize?: number
  status?: number | ''
  _admin?: number
}

export interface Category {
  id: number
  name: string
  icon: string
  sort_order: number
  status: number
}