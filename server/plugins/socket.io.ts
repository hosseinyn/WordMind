import type { NitroApp } from "nitropack";
import { Server as Engine } from "engine.io";
import { Server } from "socket.io";
import { defineEventHandler } from "h3";

export default defineNitroPlugin((nitroApp: NitroApp) => {
  const engine = new Engine();
  const io = new Server();

  io.bind(engine);

  io.on("connection", (socket) => {

      socket.on("join_room", async (room) => {
        const sockets = await io.in(room).fetchSockets();

        if (sockets.length <=1 ) {

          socket.join(room);
          socket.to(room).emit("user_joined" , socket.id);

        } else {
          console.log("LENGTH : " , sockets.length);
          socket.emit("join_failed")
        }

      });

      socket.on("user_status" , ({room , status}) => {
        io.to(room).emit("user_status" , status)
      })

      socket.on("send_word", ({room, msg}) => {
        io.to(room).emit("receive_word", msg);
      });

  })

  nitroApp.router.use("/socket.io/", defineEventHandler({
    handler(event) {
      engine.handleRequest(event.node.req, event.node.res);
      event._handled = true;
    },
    websocket: {
      open(peer) {
        // @ts-expect-error private method and property
        engine.prepare(peer._internal.nodeReq);
        // @ts-expect-error private method and property
        engine.onWebSocket(peer._internal.nodeReq, peer._internal.nodeReq.socket, peer.websocket);
      }
    }
  }));
});