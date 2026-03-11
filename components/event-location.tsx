"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Train, Car, PersonStanding } from "lucide-react";

interface LocationData {
  venue: string;
  address: string;
  city: string;
  directions?: {
    publicTransport?: string;
    byCar?: string;
    byFoot?: string;
  };
}

const defaultLocation: LocationData = {
  venue: "Deloitte Frankfurt Office",
  address: "Europa-Allee 91",
  city: "60486 Frankfurt am Main, Germany",
  directions: {
    publicTransport:
      "From Frankfurt Hauptbahnhof, take tram line 17 toward Rebstockbad. Exit at Europaviertel West. Walk 3 minutes to Europa-Allee 91.",
    byCar:
      "Follow A648 toward Frankfurt Messe. Take the exit Frankfurt-Rebstock. Underground parking is available in the Deloitte building (entrance via Emser Bruecke).",
    byFoot:
      "Approx. 10-12 minutes walking distance from Messe Frankfurt's main entrance.",
  },
};

interface EventLocationProps {
  location?: LocationData;
}

export function EventLocation({ location }: EventLocationProps) {
  const locationData = location || defaultLocation;

  return (
    <section id="location" className="bg-secondary px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-4 text-3xl font-light tracking-tight md:text-4xl">
          Location & Directions
        </h2>
        <p className="mb-16 text-muted-foreground">
          Join us at the Deloitte Frankfurt Office
        </p>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Venue Info */}
          <Card className="border-border bg-background">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Venue
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-lg font-medium">{locationData.venue}</p>
              <p className="text-muted-foreground">{locationData.address}</p>
              <p className="text-muted-foreground">{locationData.city}</p>
              <div className="mt-6 aspect-video w-full overflow-hidden rounded-lg bg-muted">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2557.8927682775256!2d8.630611076891024!3d50.11181087152296!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47bd0ea72eb9c3b5%3A0x5d8f1bb0f3d3c3c0!2sEuropa-Allee%2091%2C%2060486%20Frankfurt%20am%20Main!5e0!3m2!1sen!2sde!4v1699999999999!5m2!1sen!2sde"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Event Location Map"
                />
              </div>
            </CardContent>
          </Card>

          {/* Directions */}
          <div className="space-y-4">
            {locationData.directions?.publicTransport && (
              <Card className="border-border bg-background">
                <CardContent className="flex gap-4 p-6">
                  <Train className="h-6 w-6 shrink-0 text-primary" />
                  <div>
                    <h3 className="mb-2 font-medium">By Public Transport</h3>
                    <p className="text-sm text-muted-foreground">
                      {locationData.directions.publicTransport}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {locationData.directions?.byCar && (
              <Card className="border-border bg-background">
                <CardContent className="flex gap-4 p-6">
                  <Car className="h-6 w-6 shrink-0 text-primary" />
                  <div>
                    <h3 className="mb-2 font-medium">By Car</h3>
                    <p className="text-sm text-muted-foreground">
                      {locationData.directions.byCar}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {locationData.directions?.byFoot && (
              <Card className="border-border bg-background">
                <CardContent className="flex gap-4 p-6">
                  <PersonStanding className="h-6 w-6 shrink-0 text-primary" />
                  <div>
                    <h3 className="mb-2 font-medium">By Foot from Messe</h3>
                    <p className="text-sm text-muted-foreground">
                      {locationData.directions.byFoot}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
