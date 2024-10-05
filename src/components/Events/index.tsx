"use client";

import {
  BookCheck,
  Calendar,
  Link,
  LocateIcon,
  MapPin,
  Presentation,
  TableOfContents,
} from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { IEvent } from "../../app/(dashboard)/event/_interfaces";
import TimestampConverter from "../../utils/dateFormatter";
import { formatPrice } from "../../utils/priceFormatter";
import Image from "next/image";
import { Badge } from "../ui/badge";

const Event = ({ events }: { events: IEvent[] }) => {
  const router = useRouter();
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {events.map((event: IEvent) => (
        <a
          key={event.slug}
          onClick={() => {
            router.push(`event/${event.slug}`);
          }}
          className="max-w-sm transform cursor-pointer overflow-hidden rounded bg-white text-left shadow-lg transition-transform duration-300 hover:scale-105 focus:outline-none"
        >
          <Image
            className="w-full"
            width={400}
            height={200}
            src={event.image_url ?? "https://via.placeholder.com/400x200"}
            alt={event.name}
          />
          <div className="px-6 py-1">
            <p className="truncate-2 mb-2 text-xl font-bold">{event.name}</p>
            <div
              className="ql-editor truncate-3 text-gray-700 text-base"
              dangerouslySetInnerHTML={{ __html: event.description ?? "" }}
            />
          </div>
          <div className="px-6 pb-2">
            <p className="font-bold capitalize">{event.implementation}</p>
            <p className="mr-2 text-xs">
              <Calendar width={20} className="grey mr-2 inline" />
              {TimestampConverter(event.start_date, "DD-MM-YY HH:mm")} -{" "}
              {TimestampConverter(event.end_date, "DD-MM-YY HH:mm")}
            </p>
            {event.implementation === "offline" ? (
              <p className="mr-2 text-xs">
                <MapPin width={20} className="grey mr-2 inline" />
                {event.location}
              </p>
            ) : (
              <p className="mr-2 text-xs">
                <Link width={20} className="grey mr-2 inline" />
                {event.location}
              </p>
            )}
            <div className="text-gray-500 bold mt-4 flex items-center">
              {event.price != event.net_price && (
                <div className="mr-2 text-sm text-red line-through">
                  {
                    event.price !== 0 ? formatPrice(event.price, "IDR", "id-ID") : 'GRATIS'
                  }
                </div>
              )}
              {
                event.net_price !== 0 ? formatPrice(event.net_price, "IDR", "id-ID") : 'GRATIS'
              }
            </div>
            {/* <span className="mb-2 mr-2 inline-block rounded-full bg-blue-200 px-3 py-1 text-sm font-semibold text-blue-700">
            {event.time} minutes
          </span> */}
          </div>
          <div className="rounded-full px-6 py-4">
            <Button className="w-full text-white">Lihat Event</Button>
          </div>
        </a>
      ))}
    </div>
  );
};

export default Event;
