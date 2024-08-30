import { create } from "zustand";
import { EventFeedback, TabId } from "./types";

interface Store {
  activeTab: TabId;
  setActiveTab: (tab: TabId) => void;

  filterEventId: string | undefined;
  setFilterEventId: (eventId: string) => void;

  filterRating: number;
  setFilterRating: (rating: number) => void;

  feedbacks: EventFeedback[];
  setFeedbacks: (feedbacks: EventFeedback[]) => void;
}

export const useStore = create<Store>((set) => ({
  activeTab: "feedbacks",
  setActiveTab: (tab: TabId) => set({ activeTab: tab }),

  filterEventId: undefined,
  setFilterEventId: (eventId: string) => set({ filterEventId: eventId }),

  filterRating: 1,
  setFilterRating: (rating: number) => set({ filterRating: rating }),

  feedbacks: [],
  setFeedbacks: (feedbacks: EventFeedback[]) => set({ feedbacks: feedbacks }),
}));
