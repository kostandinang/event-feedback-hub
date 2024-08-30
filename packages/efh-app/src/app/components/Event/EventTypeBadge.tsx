import { EventType } from "@/app/types";
import React from "react";

type BadgeProps = {
  type: EventType;
};

const eventTypeColors: Record<EventType, string> = {
  conference: "bg-blue-100 text-blue-500",
  workshop: "bg-green-100 text-green-500",
  webinar: "bg-purple-100 text-purple-500",
};

export const EventTypeBadge: React.FC<BadgeProps> = ({ type }) => {
  const badgeColor = eventTypeColors[type];

  return (
    <span
      className={`text-center inline w-max px-2 py-2 text-xss font-xss rounded-full ${badgeColor}`}
    >
      {type.charAt(0).toUpperCase() + type.slice(1)}
    </span>
  );
};

export default EventTypeBadge;
