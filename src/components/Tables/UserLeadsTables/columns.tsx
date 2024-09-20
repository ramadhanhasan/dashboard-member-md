'use client';
import { ColumnDef } from '@tanstack/react-table';
import { Switch } from '@/components/ui/switch';
import TimestampConverter from '../../../utils/dateFormatter';
import { IUserLead } from '../../../app/(dashboard)/leads/_interfaces';

export const FILTER_KEYS = ['search_field', 'search_value']

export const columns: ColumnDef<IUserLead>[] = [
  {
    accessorKey: 'created_at',
    header: 'CREATED AT',
    cell: ({ row }) => TimestampConverter(row.original.created_at)
  },
  {
    accessorKey: 'name',
    header: 'NAME'
  },
  {
    accessorKey: 'phone',
    header: 'PHONE'
  },
  {
    accessorKey: 'email',
    header: 'EMAIL'
  },
  {
    accessorKey: 'funnel',
    header: 'FUNNEL'
  },
  {
    header: 'MEMBER STATUS',
    cell: ({ row }) => row.original.is_member ? <p className='text-green-500 font-bold'>MEMBER</p> : <p className='font-bold'>Not Member</p> 
  }
];
