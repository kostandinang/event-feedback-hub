"use client";

import { useStore } from "@/app/store";
import { StarRating } from "@/app/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {} from "@/graphql/feedback";
import { useEffect } from "react";

const starRatings: StarRating[] = [
  { value: 1, label: "Poor" },
  { value: 2, label: "Fair" },
  { value: 3, label: "Good" },
  { value: 4, label: "Very Good" },
  { value: 5, label: "Amazing" },
];

export default function FeedbackRatingFilter() {
  const { filterRating, setFilterRating } = useStore();

  const handleChange = (value: string) => {
    const parsedRating = parseInt(value);
    setFilterRating(parsedRating);
  };

  return (
    <Select value={filterRating?.toString()} onValueChange={handleChange}>
      <SelectTrigger className="w-[220px]">
        <SelectValue placeholder="Filter by ⭐" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem key={"0"} value={"0"}>
          All
        </SelectItem>
        {starRatings.map((rating) => (
          <SelectItem key={rating.value} value={rating.value.toString()}>
            {"⭐".repeat(rating.value)} - {rating.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
