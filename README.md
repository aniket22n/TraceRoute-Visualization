# TraceRoute Visualization



https://github.com/aniket22n/TraceRoute-Visualization/assets/69907734/6849b1b3-0641-4c8e-8b1c-cf75d804aa82



### What is TraceRoute ?

> Traceroute is a network tool or command that maps the path data takes through a network. It's used for troubleshooting and analyzing network connections. Ex: Open terminal & run "traceroute google.com"

> It uses **TLL field in IP header & ICMP protocol** to determine the path data follows through a network.

### What is TraceRoute Visualization ?

> Visual representation of the path data (IP addresses) obtained using the 'traceroute' command.

...

## Tech Stack

- JavaScript
- Next.js
- Material-UI
- Nodejs-traceroute
- React google maps API
- GeoIP-Lite

...

## How My Solution Gets the Job Done

### 1. **Traceroute Path Data**:

> To run traceroute command we need to create child process and run command through that child process.

I'm using ['nodejs-traceroute'](https://www.npmjs.com/package/nodejs-traceroute) which is easy to use and work same as ['node:child_process'](https://nodejs.org/api/child_process.html).

### 2. **GeoIP Lookup**:

With the obtained IP addresses along the traceroute path, my solution performs GeoIP lookups ([geoip-lite](https://www.npmjs.com/package/geoip-lite)) to determine the longitude and latitude of each IP address. This step helps in geolocating each hop on the route.

### 3. **Visualization with Google Maps API**:

To visualize the path data, I integrated Google Maps API and used components **Marker, infoWindow & Polyline**.

...

## How to Set Up Locally

1. Clone the repo
2. Go back to commit number 8, which is using geoIP-lite.(37c1139ce5b9b0ea26f71c007fe031d97e177e73)
3. npm install
4. For good looking MAP, get API from google maps API and set up .env GOOGLE_MAPS_API_KEY var

...

## Deployment

I have deployed project on vercel [project link](https://trace-route-visualization.vercel.app/).

> Problem: Vercel and Netlify don't support running traceroute due to limitations on child process execution.

> Solution: A custom traceroute solution is needed (sloppy traceroute ), but it requires in-depth networking knowledge to execute without creating child processes.
