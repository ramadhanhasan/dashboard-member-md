'use client';
import { ColumnDef } from '@tanstack/react-table';
import TimestampConverter from '../../../utils/dateFormatter';
import { IHistoryCommission } from '../../../app/(dashboard)/commission/_interfaces';
import { formatPrice } from '../../../utils/priceFormatter';
import { COMMISSION_ACTION } from '../../../constants/data';

export const FILTER_KEYS = ['search_field', 'search_value']

export const columns: ColumnDef<IHistoryCommission>[] = [
  {
    header: 'Previous Balance',
    cell: ({ row }) => formatPrice(row.original.previous_balance || 0, 'IDR', 'id-ID')
  },
  {
    header: 'Adjustment',
    cell: ({ row }) => formatPrice(row.original.adjustment || 0, 'IDR', 'id-ID')
  },
  {
    header: 'Increment / Decrement',
    cell: ({ row }) => row.original.commission_action === COMMISSION_ACTION.ADDITION ? <p className='text-green-500 font-bold'>Masuk</p> : <p className='text-red-500 font-bold'>Withdrawl</p>
  },
  {
    header: 'Final Balance',
    cell: ({ row }) => formatPrice(row.original.final_balance || 0, 'IDR', 'id-ID')
  },
  {
    header: 'Notes',
    accessorKey: 'notes'
  },
  {
    header: 'Created at',
    cell: ({ row }) => TimestampConverter(row.original.created_at)
  },
];
