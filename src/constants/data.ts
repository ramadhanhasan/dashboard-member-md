export const USER_LOCAL_STORAGE_KEY = 'sidsecuretoken';
export const AFF_STORAGE_KEY = 'affcode';

export enum RouteENUM {
  CATEGORY = 'v1/categories/user/',
  LEADS = 'v1/leads/user/',
  MEMBERSHIP = 'v1/memberships/user/',
  EVENT = 'v1/events/user/',
  PRODUCT = 'v1/products/user/',
  UPLOAD = 'v1/upload/user/',
  COURSE = 'v1/courses/user/',
  LESSONS = 'v1/lessons/user/',
  TOOLS = 'v1/tools/user/',
  ORDERS = 'v1/orders/user/',
  PROVINCES = 'v1/provinces/',
  AUTH = 'v1/auth',
  USERS = 'v1/users/user/',
  REFERRAL_LINK = 'v1/referral-links/user/',
}

export enum DiscountTypeEnum {
  'NO DISCOUNT' = 'NO DISCOUNT',
  FIXED = 'FIXED',
  PERCENTAGE = 'PERCENTAGE',
}

export enum TypeEnum {
  DIGITAL = 'DIGITAL',
  PHYSICAL = 'PHYSICAL',
}

export enum FormatMedia {
  VIDEO = 'VIDEO',
  IMAGE = 'IMAGE',
  DOCUMENT = 'DOC'
}

export enum TypeUrlEnum {
  LINK = 'LINK',
  DOWNLOAD = 'DOWNLOAD'
}

export enum TypeToolEnum {
  BANNER = 'BANNER',
  STORY = 'STORY',
  FEED = 'FEED',
  'WORK PAPER' = 'WORK PAPER',
  LINK = 'LINK'
}

export enum StockTypeEnum {
  ADJUSTABLE = 'ADJUSTABLE',
  UNLIMITED = 'UNLIMITED',
}

export enum ORDER_TYPE {
  SALES = 'SALES',
  REFUND = 'REFUND',
}

export enum ORDER_STATUS {
  WAITING_PAYMENT = 'WAITING_PAYMENT',
  WAITING_SHIPMENT = 'WAITING_SHIPMENT',
  WAITING_RECEIPT = 'WAITING_RECEIPT',
  WAITING_CONFIRMATION = 'WAITING_CONFIRMATION',
  CANCELED = 'CANCELED',
  EXPIRED = 'EXPIRED',
  COMPLETED = 'COMPLETED',
  CONFIRMED = 'CONFIRMED'
}

export enum ORDER_SUB_TYPE {
  EVENT = 'EVENT',
  PRODUCT = 'PRODUCT',
  MEMBERSHIP = 'MEMBERSHIP',
  COUPON = 'COUPON',
  SHIPPING = 'SHIPPING',
  TAX = 'TAX',
  UNIQUE_CODE = 'UNIQUE_CODE',
  DISCOUNT = 'DISCOUNT',
  GWP = 'GWP',
  COMMISSION = 'COMMISSION'
}

export enum ORDER_REFUND_TYPE {
  FULLY = 'FULLY',
  PARTIALLY = 'PARTIALLY',
}

export enum ORDER_REFUND_REASON {
  SALAH_PROSES = 'Salah Proses',
  PRODUK_RUSAK = 'Produk Rusak',
  PRODUK_HABIS = 'Produk Habis',
  LAINNYA = 'Lainnya',
}