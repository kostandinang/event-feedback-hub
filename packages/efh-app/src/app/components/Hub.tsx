"use client";

import { client } from "@/lib/apollo-client";
import { gql, ApolloProvider, useQuery } from "@apollo/client";
import FeedbackItem from "./Feedback/FeedbackItem";
import EventList from "./Event/EventList";
import FeedbackList from "./Feedback/FeedbackList";
import FeedbackFilter from "./Feedback/FeedbackFilter";
import { GET_EVENTS } from "@/graphql/event";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { TabsList } from "@radix-ui/react-tabs";
import { CalendarIcon, StarIcon } from "@radix-ui/react-icons";
import { useStore } from "../store";
import { TabId } from "../types";

export default function Hub() {
  const { activeTab, setActiveTab } = useStore();
  const { data, loading, error } = useQuery(GET_EVENTS, {});

  if (loading) return <Skeleton className="w-[100px] h-[20px] rounded-full" />;
  if (error) return <p>Error: {error.message}</p>;

  const handleTabChange = (value: string) => {
    setActiveTab(value as TabId);
  };

  return (
    <div className="w-[80%] mx-auto top-0">
      <Tabs
        defaultValue={activeTab}
        className="mt-4 w-full"
        onValueChange={handleTabChange}
      >
        <div className=" sticky top-0 z-50 bg-white right-0 left-0 p-4 flex justify-between items-center gap-2 w-full border-b border-blue-100 border-solid pb-4 mb-4">
          <h1 className="text-3xl">
            <span className="flex">
              <span className=" text-blue-500">Feedback</span>Hub
            </span>
            {/* <span className="text-sm text-gray-500">
            Find and review amazing events
          </span> */}
          </h1>
          {activeTab == "feedbacks" && <FeedbackFilter events={data.events} />}
        </div>
        <TabsList>
          <TabsTrigger value="feedbacks">
            <span className="flex gap-2">
              <StarIcon className="size-6 text-blue-500" />
              Feedbacks
            </span>
          </TabsTrigger>
          <TabsTrigger value="events">
            <span className="flex gap-2">
              <CalendarIcon className="size-6 text-blue-500" />
              Events
            </span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="feedbacks">
          <FeedbackList />
        </TabsContent>
        <TabsContent value="events">
          <EventList events={data.events} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
