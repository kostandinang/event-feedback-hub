"use client";

import { useStore } from "@/app/store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {} from "@/graphql/feedback";
import { Event } from "efh-core";

export type FeedbackFilterProps = {
  events: Event[];
};

export default function FeedbackFilter(props: FeedbackFilterProps) {
  const { events } = props;
  const { filterEventId, setFilterEventId } = useStore();

  const handleChange = (value: string) => {
    setFilterEventId(value);
  };

  return (
    <div className="flex flex-row gap-2">
      <Select value={filterEventId} onValueChange={handleChange}>
        <SelectTrigger className="w-[220px]">
          <SelectValue placeholder="Filter by event" />
        </SelectTrigger>
        <SelectContent>
          {events.map((event: Event) => (
            <SelectItem key={event.id} value={event.id}>
              {event.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
