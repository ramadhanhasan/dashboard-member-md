'use client';
import { ColumnDef } from '@tanstack/react-table';
import { Switch } from '@/components/ui/switch';
import TimestampConverter from '../../../utils/dateFormatter';
import { IUserLead } from '../../../app/(dashboard)/leads/_interfaces';

export const FILTER_KEYS = ['search_field', 'search_value']

export const columns: ColumnDef<IUserLead>[] = [
  {
    accessorKey: 'created_at',
    header: 'TANGGAL',
    cell: ({ row }) => TimestampConverter(row.original.created_at)
  },
  {
    accessorKey: 'name',
    header: 'NAMA'
  },
  {
    accessorKey: 'phone',
    header: 'NOMOR WHATSAPP',
    cell: ({ row }) => row.original.phone.slice(0, -6) + '******'
  },
  {
    accessorKey: 'email',
    header: 'EMAIL',
    cell: ({ row }) => '****' + row.original.email.slice(row.original.email.length - 14, row.original.email.length)
  },
  {
    accessorKey: 'funnel',
    header: 'FUNNEL'
  },
  {
    header: 'STATUS MEMBER',
    cell: ({ row }) => row.original.is_member ? <p className='text-green-500 font-bold'>MEMBER</p> : row.original.is_expired ? <p className='font-bold font-red=500'>Expired</p> : <p className='font-bold'>Bukan Member</p>
  }
];
