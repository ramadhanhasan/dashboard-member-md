'use client';
import { ColumnDef } from '@tanstack/react-table';
import TimestampConverter from '../../../utils/dateFormatter';
import { IHistoryCommission } from '../../../app/(dashboard)/commission/_interfaces';
import { formatPrice } from '../../../utils/priceFormatter';
import { COMMISSION_ACTION } from '../../../constants/data';

export const FILTER_KEYS = ['search_field', 'search_value']

export const columns: ColumnDef<IHistoryCommission>[] = [
  {
    header: 'Komisi Tersedia Sebelumnya',
    cell: ({ row }) => formatPrice(row.original.previous_balance || 0, 'IDR', 'id-ID')
  },
  {
    header: 'Nominal',
    cell: ({ row }) => formatPrice(row.original.adjustment || 0, 'IDR', 'id-ID')
  },
  {
    header: 'Masuk / Keluar',
    cell: ({ row }) => row.original.commission_action === COMMISSION_ACTION.ADDITION ? <p className='text-green-500 font-bold'>Masuk Komisi</p> : <p className='text-red-500 font-bold'>Sudah Dicairkan</p>
  },
  {
    header: 'Komisi Tersedia Akhir',
    cell: ({ row }) => formatPrice(row.original.final_balance || 0, 'IDR', 'id-ID')
  },
  {
    header: 'Note',
    accessorKey: 'notes'
  },
  {
    header: 'Tanggal',
    cell: ({ row }) => TimestampConverter(row.original.created_at)
  },
];
