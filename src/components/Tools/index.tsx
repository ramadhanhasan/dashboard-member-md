"use client";

import { Button } from "../ui/button";
import { ITools } from "../../app/(dashboard)/tools/_interfaces";
import Link from "next/link";
import { FormatMedia, TypeToolEnum, TypeUrlEnum } from "../../constants/data";
import defaultLogo from "../../../public/images/Default/document.jpg";
import Image from "next/image";

const Tools = ({ tools }: { tools: ITools[] }) => {
  return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 lg:grid-cols-4">
        {tools.map((tool: ITools) => (
          <div key={tool.id} className="max-w-sm transform overflow-hidden rounded bg-white text-center shadow-lg transition-transform duration-300 hover:scale-105 focus:outline-none">
            <Image
              width={0}
              height={0}
              sizes="100vw"
              className="w-full"
              src={
                tool.format === FormatMedia.DOCUMENT
                  ? defaultLogo
                  : (tool.url ?? "https://via.placeholder.com/400x200")
              }
              alt={tool.name}
            />
            <div className="px-6 pb-2 pt-4">
              <p className="font- mb-2 mr-2 inline-block rounded-full bg-blue-200 px-3 py-1 text-xs capitalize text-blue-700">
                {tool.type}
              </p>
              <p className="mb-2 mr-2 inline-block rounded-full bg-yellow-200 px-3 py-1 text-xs font-semibold capitalize text-blue-700">
                {tool.format}
              </p>
            </div>
            <div className="px-6 py-1">
              <p className="truncate-2 mb-2 text-lg font-bold capitalize">
                {tool.name}
              </p>
            </div>
            <div className="rounded-full px-6 py-4">
              {tool.type_url === TypeUrlEnum.DOWNLOAD ? (
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  href={
                    tool.custom_url && tool.custom_url != ""
                      ? tool.custom_url
                      : tool.url || ""
                  }
                >
                  <Button className="w-full text-white">Download</Button>
                </Link>
              ) : (
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  href={
                    tool.custom_url && tool.custom_url != ""
                      ? tool.custom_url
                      : tool.url || ""
                  }
                >
                  <Button className="w-full text-white">Open Link</Button>
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>

  );
};

export default Tools;
