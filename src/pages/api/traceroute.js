import Traceroute from "nodejs-traceroute";

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
          fetch(`http://ip-api.com/json/${hop.ip}`)
            .then((geo) => geo.json())
            .then((geoJson) => {
              if (geoJson.status === "success") {
                var points = {
                  lat: geoJson.lat,
                  lng: geoJson.lon,
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
            })
            .catch((err) => {
              console.error("Error fetching geo data for hop:", err);
            });
        }
      })
      .on("close", (close) => {
        fetch(`http://ip-api.com/json/${response.destination}`)
          .then((geo) => geo.json())
          .then((geoJson) => {
            if (geoJson.status === "success") {
              var points = {
                lat: geoJson.lat,
                lng: geoJson.lon,
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
          })
          .catch((err) => {
            console.error("Error fetching geo data for destination:", err);
          })
          .finally(() => {
            return res.status(200).json({ data: response });
          });
      });

    tracer.trace(req.query.input);
  } catch (ex) {
    console.error(ex);
  }
}
