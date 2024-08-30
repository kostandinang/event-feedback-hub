"use client";

import App from "./components/App";
import FeedbackItem from "./components/Feedback/FeedbackItem";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-start justify-between p-8">
      <App />
    </main>
  );
}
