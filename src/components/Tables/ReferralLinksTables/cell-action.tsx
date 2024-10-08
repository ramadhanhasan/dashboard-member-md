'use client';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Clipboard, Copy, Edit, MoreHorizontal, TableOfContents, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from '../../ui/use-toast';
import { useQueryParam } from '../../../hooks/useQueryParam';
import { FILTER_KEYS } from './columns';
import { IReferralLink } from '../../../app/(dashboard)/links/_interfaces';

interface CellActionProps {
  data: IReferralLink;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(data.url);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 3000); // Reset after 2 seconds
    } catch (error) {
      console.error("Failed to copy!", error);
    }
  };
  
  return (
    <Button
      onClick={handleCopy}
      className={`transition-all ${
        copied ? "bg-bodydark2 text-white" : "bg-primary text-white"
      }`}
    >
      {copied ? "Copied" : "Copy Link"} {!copied && (<Clipboard width={15} className='ml-2' />)}
    </Button>
  );
};
