'use client';

import { useEffect, useRef, useState } from "react";
import { useMap } from "../hooks/useMap";
import { Route } from "../utils/model";
import { socket } from "../utils/socket-io";

export function AdminPage() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const map = useMap(mapContainerRef);

  useEffect(() => {
    socket.connect();
    socket.on('admin-new-points', async (data: { route_id: string; lat: number; lng: number }) => {
      console.log(data);
      if (!map?.hasRoute(data.route_id)) {
        const response = await fetch(`http://localhost:3000/routes/${data.route_id}`);
        const route: Route = await response.json();
        map?.removeRoute(data.route_id);
        await map?.addRouteWithIcons({
          routeId: data.route_id,
          startMarkerOptions: {
            position: route.directions.request.origin.location,
          },
          endMarkerOptions: {
            position: route.directions.request.destination.location,
          },
          carMarkerOptions: {
            position: route.directions.request.origin.location,
          },
        });
      }
      map?.moveCar(data.route_id, { lat: data.lat, lng: data.lng });
    });
    return () => {
      socket.disconnect();
    }
  }, [map]);

  return (
    <div id="map" style={{ height: '100%', width: '100%' }} ref={mapContainerRef}>
    </div>
  );
}

export default AdminPage;