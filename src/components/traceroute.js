// import Traceroute from "nodejs-traceroute";

// export const useTraceroute = () => {

//   const array[];

//   const getRoutes = (ip) => {
//     try {
//     const tracer = new Traceroute();
//       tracer
//         .on("pid", (pid) => {
//           console.log(`pid: ${pid}`);
//         })
//         .on("destination", (destination) => {
//           console.log(`destination: ${destination}`);
//         })
//         .on("hop", (hop) => {
//           console.log(`hop: ${JSON.stringify(hop)}`);
//         })
//         .on("close", (code) => {
//           console.log(`close: code ${code}`);
//         });

//       tracer.trace(ip);
//     } catch (ex) {
//       console.log(ex);
//     }
//   };
//   getRoutes(ip);
// };
