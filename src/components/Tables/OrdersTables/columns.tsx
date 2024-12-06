"use client";
import { ColumnDef } from "@tanstack/react-table";
import { IOrder } from "../../../app/(dashboard)/order/_interfaces";
import TimestampConverter from "../../../utils/dateFormatter";
import { formatPrice } from "../../../utils/priceFormatter";
import { ORDER_STATUS, ORDER_SUB_TYPE } from "../../../constants/data";
import { CellAction } from "./cell-action";

export const FILTER_KEYS = ["search_field", "search_value"];

export const columns: ColumnDef<IOrder>[] = [
  {
    accessorKey: 'order_number',
    header: 'Nomor Order'
  },
  {
    accessorKey: 'order_number',
    header: 'Waktu Order',
    cell: ({ row }) => TimestampConverter(row.original.created_at)
  },
  {
    accessorKey: 'order_number',
    header: 'Waktu Expired',
    cell: ({ row }) => {
      return row.original.status === ORDER_STATUS.WAITING_PAYMENT || row.original.status === ORDER_STATUS.EXPIRED ? TimestampConverter(row.original.expired_at) : ''
    }
  },
  {
    accessorKey: "sub_type",
    header: "Tipe Order",
    cell: ({ row }) => {
      return <div className="text-center">
        { row.original.sub_type === ORDER_SUB_TYPE.MEMBERSHIP && (
          <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">MEMBERSHIP</span>
          )
        }
        { 
          row.original.sub_type === ORDER_SUB_TYPE.EVENT && (
            <span className="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300">EVENT</span>
          )
        }
        {
          row.original.sub_type === ORDER_SUB_TYPE.PRODUCT && (
            <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">PRODUK</span>
          )
        }
      </div>
    }
  },
  {
    header: 'Status',
    cell: ({ row }) => {
      if ( row.original.status === ORDER_STATUS.WAITING_PAYMENT) {
        return <div className="text-orange-500 text-center font-bold">Menunggu Pembayaran</div>
      } else if ( row.original.status === ORDER_STATUS.CONFIRMED) {
        return <div className="text-green-500 text-center font-bold">Pembayaran Terverifikasi</div>
      } else if ( row.original.status === ORDER_STATUS.EXPIRED) {
        return <div className="text-red-500 text-center font-bold">Pesanan Expired</div>
      } 
    }
  },
  {
    header: 'Harga Total',
    cell: ({ row }) =>  <strong>{formatPrice(row.original.total_net_price || 0, 'IDR', 'id-ID')}</strong>
  },
  {
    header: "",
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
