import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";

export type FeedbackRating = {
  rating: number;
  readonly?: boolean;
};

export default function FeedbackRating(props: FeedbackRating) {
  const { readonly } = props;
  const [rating, setRating] = useState<string>(props.rating?.toString());

  const handleChange = (value: string) => {
    setRating(value);
  };

  return (
    <RadioGroup
      disabled={readonly}
      value={rating}
      onValueChange={handleChange}
      className={`flex space-x-0`}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <label
          key={star}
          className={`${readonly ? "cursor-default" : "cursor-pointer"}`}
        >
          <RadioGroupItem value={star.toString()} className={`sr-only`} />
          <span
            className={
              rating && parseInt(rating) >= star
                ? "text-yellow-500"
                : "text-gray-400"
            }
          >
            ⭐
          </span>
        </label>
      ))}
    </RadioGroup>
  );
}
