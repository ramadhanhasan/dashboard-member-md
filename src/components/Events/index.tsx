"use client";

import { BookCheck, Calendar, Presentation, TableOfContents } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { IEvent } from "../../app/(dashboard)/event/_interfaces";
import TimestampConverter from "../../utils/dateFormatter";
import { formatPrice } from "../../utils/priceFormatter";
import Image from "next/image";

const Event = ({ events }: { events: IEvent[] }) => {
  const router = useRouter();
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {events.map((event: IEvent) => (
        <a
          key={event.slug}
          onClick={() => {
            router.push(`event/${event.slug}`)
          }}
          className="max-w-sm transform cursor-pointer overflow-hidden rounded bg-white text-left shadow-lg transition-transform duration-300 hover:scale-105 focus:outline-none"
        >
          <Image
            className="w-full"
            width={400} height={200}
            src={
              event.image_url ??
              "https://via.placeholder.com/400x200"
            }
            alt={event.name}
          />
          <div className="px-6 pb-2 pt-4">
            <p className="mr-2 text-xs">
            <Calendar width={20} className="inline mr-2 grey" />{TimestampConverter(event.start_date, 'DD-MM-YY HH:mm')} - {TimestampConverter(event.end_date, 'DD-MM-YY HH:mm')}
            </p>
            {/* <span className="mb-2 mr-2 inline-block rounded-full bg-blue-200 px-3 py-1 text-sm font-semibold text-blue-700">
            {event.time} minutes
          </span> */}
          </div>
          <div className="px-6 py-1">
            <p className="truncate-2 mb-2 text-xl font-bold">{event.name}</p>
            <div
              className="ql-editor truncate-3 text-gray-700 text-base"
              dangerouslySetInnerHTML={{ __html: event.description ?? "" }}
            />
            <div className="text-gray-500 mt-4 flex items-center bold">
              {event.price != event.net_price && (
                <div className="mr-2 text-red line-through text-sm">
                  {formatPrice(event.price, 'IDR', 'id-ID')}
                </div>
              )}
              {formatPrice(event.net_price, 'IDR', 'id-ID')}
            </div>
          </div>
          <div className="px-6 py-4 rounded-full">
            <Button className="w-full text-white">Lihat Event</Button>
          </div>
        </a>
      ))}
    </div>
  );
};

export default Event;
