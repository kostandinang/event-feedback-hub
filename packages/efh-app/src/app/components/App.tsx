import { client } from "@/lib/apollo-client";
import { ApolloProvider } from "@apollo/client";
import Hub from "./Hub";

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Hub />
    </ApolloProvider>
  );
}
