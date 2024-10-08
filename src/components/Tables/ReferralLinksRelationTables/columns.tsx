'use client';
import { ColumnDef } from '@tanstack/react-table';
import { Switch } from '@/components/ui/switch';
import TimestampConverter from '../../../utils/dateFormatter';
import { IReferralLink } from '../../../app/(dashboard)/links/_interfaces';
import { Button } from '../../ui/button';
import { CellAction } from './cell-action';

export const FILTER_KEYS = ['search_field', 'search_value']

export const columns: ColumnDef<IReferralLink>[] = [
  {
    accessorKey: 'name',
    header: 'NAME'
  },
  {
    accessorKey: 'url',
    header: 'URL'
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
