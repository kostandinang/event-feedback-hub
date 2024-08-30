import { createServer } from "http";
import { WebSocketServer } from "ws";
import express from "express";
import bodyParser from "body-parser";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import { useServer } from "graphql-ws/lib/use/ws";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import core from "efh-core";

const PORT = process.env.WS_PORT || 4000;
const HOST_URL = process.env.HOSTNAME
  ? `${process.env.HOSTNAME}:${PORT}`
  : `localhost:${PORT}`;

const start = async () => {
  //Init http server
  const app = express();
  const httpServer = createServer(app);

  //Compile graphql schema
  const graphqlSchema = await core.graphql.schema();

  //Init ws server
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/graphql",
    handleProtocols: (protocols) => {
      // Limit only to graphql-ws protocl
      if (Array.from(protocols).includes("graphql-ws")) {
        return "graphql-ws";
      }
      return false;
    },
  });

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const disposableServer = useServer(
    {
      schema: graphqlSchema,
    },
    wsServer
  );

  // Init apollo
  const apolloServer = new ApolloServer({
    schema: graphqlSchema,
    plugins: [
      //Shutdown http server gracefully
      ApolloServerPluginDrainHttpServer({ httpServer }),
      //Shutdown ws server gracefully
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await disposableServer.dispose();
            },
          };
        },
      },
    ],
  });
  await apolloServer.start();

  //Register routes
  app.use(
    "/graphql",
    cors<cors.CorsRequest>(),
    bodyParser.json(),
    expressMiddleware(apolloServer)
  );

  // Listen server
  httpServer.listen(PORT, () => {
    console.log(`🚀 Query endpoint ready at http://${HOST_URL}/graphql`);
    console.log(`🚀 Subscription endpoint ready at ws://${HOST_URL}/graphql`);
  });
};

start();
