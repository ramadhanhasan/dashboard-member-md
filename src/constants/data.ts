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

export enum COMMISSION_ACTION {
  ADDITION = 'ADDITION',
  REDUCTION = 'REDUCTION'
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

export const BankList = [
  {
    "name": "PT. BANK CIMB NIAGA - (CIMB)",
    "code": "022"
  },
  {
    "name": "PT. BANK CIMB NIAGA UNIT USAHA SYARIAH - (CIMB SYARIAH)",
    "code": "730"
  },
  {
    "name": "PT. BNI SYARIAH",
    "code": "427"
  },
  {
    "name": "PT. BANK BCA SYARIAH",
    "code": "536"
  },
  {
    "name": "PT. BANK BUKOPIN",
    "code": "441"
  },
  {
    "name": "PT. BANK CENTRAL ASIA, TBK - (BCA)",
    "code": "014"
  },
  {
    "name": "PT. BANK DANAMON INDONESIA",
    "code": "011"
  },
  {
    "name": "PT. BANK DKI",
    "code": "111"
  },
  {
    "name": "PT. BANK DBS INDONESIA",
    "code": "046"
  },
  {
    "name": "PT. BANK HSBC INDONESIA",
    "code": "087"
  },
  {
    "name": "PT. BANK MANDIRI (PERSERO), TBK",
    "code": "008"
  },
  {
    "name": "PT. BANK MANDIRI TASPEN POS",
    "code": "564"
  },
  {
    "name": "PT. BANK MAYBANK INDONESIA, TBK",
    "code": "016"
  },
  {
    "name": "PT. BANK MAYORA",
    "code": "553"
  },
  {
    "name": "PT. BANK MEGA, TBK",
    "code": "426"
  },
  {
    "name": "PT. BANK MUAMALAT INDONESIA, TBK",
    "code": "147"
  },
  {
    "name": "PT. BANK NEGARA INDONESIA (PERSERO), TBK (BNI)",
    "code": "009"
  },
  {
    "name": "PT. BANK OCBC NISP, TBK",
    "code": "028"
  },
  {
    "name": "PT. BANK OCBC NISP, TBK UNIT USAHA SYARIAH",
    "code": "731"
  },
  {
    "name": "PT. BANK PERMATA, TBK",
    "code": "013"
  },
  {
    "name": "PT. BANK PERMATA, TBK UNIT USAHA SYARIAH",
    "code": "721"
  },
  {
    "name": "PT. BANK RAKYAT INDONESIA (PERSERO), TBK (BRI)",
    "code": "002"
  },
  {
    "name": "PT. BANK RAKYAT INDONESIA AGRONIAGA, TBK",
    "code": "494"
  },
  {
    "name": "PT. BANK SYARIAH BRI - (BRI SYARIAH)",
    "code": "422"
  },
  {
    "name": "PT. BANK SYARIAH BUKOPIN",
    "code": "521"
  },
  {
    "name": "PT. BANK SYARIAH MANDIRI",
    "code": "451"
  },
  {
    "name": "PT. BANK TABUNGAN NEGARA (PERSERO), TBK (BTN)",
    "code": "200"
  },
  {
    "name": "PT. BANK TABUNGAN NEGARA (PERSERO), TBK UNIT USAHA SYARIAH",
    "code": "723"
  },
  {
    "name": "PT. BANK TABUNGAN PENSIUNAN NASIONAL - (BTPN)",
    "code": "213"
  },
  {
    "name": "PT. BANK TABUNGAN PENSIUNAN NASIONAL SYARIAH - (BTPN Syariah)",
    "code": "547"
  },
  {
    "name": "PT. BANK WOORI SAUDARA INDONESIA 1906, TBK (BWS)",
    "code": "212"
  },
  {
    "name": "PT. BANK JABAR BANTEN SYARIAH",
    "code": "425"
  },
  {
    "name": "PT. BANK PEMBANGUNAN DAERAH BANTEN",
    "code": "137"
  },
  {
    "name": "PT. BANK CAPITAL INDONESIA",
    "code": "054"
  },
  {
    "name": "PT. BANK DKI UNIT USAHA SYARIAH",
    "code": "724"
  },
  {
    "name": "PT. BANK ICBC INDONESIA",
    "code": "164"
  },
  {
    "name": "PT. BANK JTRUST INDONESIA, TBK",
    "code": "095"
  }
]