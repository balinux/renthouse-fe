import { Listing } from "./listing";

export interface Transaction {
    id: number
    user_id: number
    listing_id: number
    start_date: string
    end_date: string
    price_per_day: string
    total_days: number
    fee: string
    total_price: string
    status: string
    created_at: string
    updated_at: string
    listing: Listing
  }
  