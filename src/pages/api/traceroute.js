import Traceroute from "nodejs-traceroute";

export default function handler(req, res) {
  // Input validation
  const response = {
    destination: "",
    hops: [],
  };
  console.log(req.query.input);

  try {
    const tracer = new Traceroute();

    tracer
      .on("destination", (destination) => {
        response.destination = destination;
      })
      .on("hop", (hop) => {
        response.hops.push(hop);
      })
      .on("close", (close) => {
        return res.status(200).json({ data: response });
      });

    tracer.trace(req.query.input);
  } catch (ex) {
    console.error(ex);
  }
}
