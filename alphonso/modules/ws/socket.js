export const Connection = (access_token, refresh_token) => {
  return new Promise((resolve, reject) => {
    const socket = new WebSocket("ws://localhost:4001/socket");
    const listeners = [];

    socket.onmessage = (e) => {
      if (e.data === "pong") {
        return;
      }

      const data = JSON.parse(e.data);
      if (data.status === "successful") {
        const action = {
          close: () => {
            socket.close();
          },
          addEventListener: (op, handler) => {
            socket.addEventListener(e, handler);
            const listener = { op, handler };
            listeners.push(listener);
            return () => listeners.splice(listeners.indexOf(listener), 1);
          },
          ping: () => {
            socket.onopen = () => {
              socket.send("ping");
            };
          },
          user: data.user
        };
        resolve(action)
      }
    };

    socket.onopen = () => {
      const data = {
        op: "auth",
        access_token,
        refresh_token,
      };
      socket.send(JSON.stringify(data));
    };
  });
};

// export const Connection = ()=>{
//     const socket = new WebSocket("ws://localhost:4001/socket")
//     const listeners = []

//   socket.onmessage = (e)=>{
//      const data = JSON.parse(e.data)
//       if(data.type === "user-info"){
//          setUser(data)

//       }

//   }

//     const action = {
//     connect: (access_token, refresh_token)=>{
//         socket.onopen=()=>{
//             const data = {
//                 op: "auth",
//                 access_token,
//                 refresh_token
//             }
//             socket.send(JSON.stringify(data))
//         }
//     },
//     close: ()=>{socket.close()},
//     addEventListener: (op, handler)=>{
//          socket.addEventListener(e, handler)
//          const listener = {op, handler}
//          listeners.push(listener)
//          return ()=> listeners.splice(listeners.indexOf(listener), 1)
//      },
//      ping: ()=>{
//         socket.onopen=()=>{
//             socket.send("ping")
//         }
//      }
//     }
//     return action
// }

// export class Socket{
//     #connection = new WebSocket("http://localhost:4001/socket")
//     #listeners = []
//     constructor(){
//         this.ping
//         this.message
//     }

//     ping(){
//         this.#connection.onopen = ()=>{
//             this.#connection.send("ping")
//         }

//     }

//     connect(){

//     }

//     addListener(op, handler){
//         const listener = {op, handler}
//         this.#connection.addEventListener(op, handler)
//         this.#listeners.push(listener)
//         return this.#listeners.slice(this.#listeners.indexOf(listener), 1)
//     }

//     message(){
//         this.#connection.addEventListener("message", (e)=>{
//             console.log(e.data)
//         })
//     }

//     close(){
//         this.#connection.close()
//     }

// }
