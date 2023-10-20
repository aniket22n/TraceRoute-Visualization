import Traceroute from "nodejs-traceroute";
import geoip from "geoip-lite";

export default function handler(req, res) {
  const response = {
    destination: "",
    hops: [],
    locations: [],
  };
  console.log(req.query.input);

  try {
    const tracer = new Traceroute();

    tracer
      .on("destination", (destination) => {
        console.log(destination);
        response.destination = destination;
      })
      .on("hop", (hop) => {
        response.hops.push(hop);

        // Get lon and lat for the hop's IP
        if (hop.ip !== "*") {
          var geo = geoip.lookup(hop.ip);

          if (geo && geo.ll) {
            var points = {
              lat: geo.ll[0],
              lng: geo.ll[1],
            };

            // Check if the points (lat, lng) already exist in locations
            const locationExists = response.locations.some(
              (location) =>
                location.points.lat === points.lat &&
                location.points.lng === points.lng
            );

            // If the location doesn't exist, add it to the locations array
            if (!locationExists) {
              response.locations.push({
                hop: [hop.hop],
                points: points,
              });
            } else {
              // If the location already exists, find it and add the hop to its hop array
              const existingLocation = response.locations.find(
                (location) =>
                  location.points.lat === points.lat &&
                  location.points.lng === points.lng
              );
              existingLocation.hop.push(hop.hop);
            }
          }
        }
      })
      .on("close", (close) => {
        var geo = geoip.lookup(response.destination);

        if (geo && geo.ll) {
          var points = {
            lat: geo.ll[0],
            lng: geo.ll[1],
          };

          // Check if the points (lat, lng) already exist in locations
          const locationExists = response.locations.some(
            (location) =>
              location.points.lat === points.lat &&
              location.points.lng === points.lng
          );

          // If the location doesn't exist, add it to the locations array
          if (!locationExists) {
            response.locations.push({
              hop: [32],
              points: points,
            });
          } else {
            // If the location already exists, find it and add the hop to its hop array
            const existingLocation = response.locations.find(
              (location) =>
                location.points.lat === points.lat &&
                location.points.lng === points.lng
            );
            existingLocation.hop.push(32);
          }
        }

        return res.status(200).json({ data: response });
      });

    tracer.trace(req.query.input);
  } catch (ex) {
    console.error(ex);
  }
}
