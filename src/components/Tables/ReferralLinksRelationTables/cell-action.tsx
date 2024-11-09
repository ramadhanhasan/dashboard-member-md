"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Clipboard,
  Copy,
  Edit,
  FilePenLine,
  MoreHorizontal,
  SquareArrowOutUpRight,
  TableOfContents,
  Trash,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "../../ui/use-toast";
import { useQueryParam } from "../../../hooks/useQueryParam";
import { FILTER_KEYS } from "./columns";
import { IReferralLink } from "../../../app/(dashboard)/links/_interfaces";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { ReferralLinkAttributeForm } from "../../Forms/ReferralLinkAttributeForm";
import useGetAllQuery from "../../../app/(dashboard)/links/_query/useGetAllQuery";

interface CellActionProps {
  data: IReferralLink;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [copied, setCopied] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(data.url);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 3000); // Reset after 2 seconds
    } catch (error) {
      console.error("Gagal untuk copy link!", error);
    }
  };

  const { paginationParams, filterParams, sortParams } =
  useQueryParam(FILTER_KEYS);

  const {
    refetechDataReferralLinks
  } = useGetAllQuery({
    ...paginationParams,
    filterParams,
    ...sortParams
  });

  const handleChildSubmit = () => {
    router.refresh();
    refetechDataReferralLinks();
  };

  return (
    <>
      <ReferralLinkAttributeForm
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        initialData={data.referral_link_attributes?.length ? data.referral_link_attributes[0] : null}
        id={data.referral_link_attributes?.length ? data.referral_link_attributes[0].id : null}
        setRefetch={handleChildSubmit}
        referralLinkId={data.id ?? ""}
      />
      <div className="text-center max-w-48 flex flex-col rounded-lg shadow-sm">
        <Button
          onClick={handleCopy}
          className={`transition-all ${
            copied
              ? "mb-1 w-48 bg-bodydark2 text-white"
              : "mb-1 w-48 bg-primary text-white"
          }`}
        >
          {copied ? "Copied" : "Copy Link"}{" "}
          {!copied && <Clipboard width={15} className="ml-2" />}
        </Button>
        <Link
          href={data.url}
          target="_blank"
          rel="noopener noreferrer"
          passHref={true}
          // className="max-w rounded-md bg-bodydark2 text-white"
        >
          <Button className="mb-1 w-48 bg-bodydark2 text-white">
            Preview
            <SquareArrowOutUpRight width={15} className="ml-2" />
          </Button>
        </Link>
        {data.is_pixel_meta && (
          <Button
          variant="outline"
          className="mb-1 w-48"
          onClick={(event) => {
            setIsDialogOpen(true);
          }}
          >
            {data.referral_link_attributes?.length && data.referral_link_attributes[0].utm_pixel?.trim() != "" ? "Ubah" : "Tambah"} Pixel Meta{" "}
            <FilePenLine width={15} className="ml-2" />
          </Button>
        )}
      </div>
    </>
  );
};
