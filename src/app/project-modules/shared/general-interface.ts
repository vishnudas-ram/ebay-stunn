export interface Iuser {
  id?:number,
  avatar?:string;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone_no?: string;
  is_profile_completed?: boolean;
  overseas_buyers_note?: string;
  payment_method?: string;
  shipping_method?: string;
  transaction_matter?: string;
}

export interface IfleaMarket {
  icon: string;
  id: number;
  link: string;
  logo: string;
  name: string;
}

export interface Iproduct{
  photos: string;
  platform: string;
  price: string;
  product_name: string;
  url: string;
}

export interface Iscrape{
  id:	number;
  user: Iuser | string;
  platform: IfleaMarket | string;
  count: number;
  url: string;
  status: string;
  created_on: string;
}

export enum scrapeStatus{
  SCRAPPING = "Scrapping",
  SCRAPPINGCOMPLETED = "Scrapping Completed",
  SCRAPPINGFAILED = "Scrapping Failed"
}

export interface IproductDetail{
  id:string;
  brand?: string;
  category?: string;
  condition?: string;
  delivery_method: string;
  description?: string;
  estimated_shipping_date: string;
  photos: string;
  platform: string;
  price: string;
  product_name: string;
  rating?: string;
  scrapping: string;
  seller?: string
  size?: string
  stock_status: string;
  url: string;
}

export enum productScrapeStatus{
  SUCCESS="SUCCESS",
  PENDING="PENDING",
  FAILURE="FAILURE",
}
