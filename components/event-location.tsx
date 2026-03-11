import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Train, Car, Plane } from "lucide-react";
import { Location } from "@/lib/contentful";

const defaultLocation: Location = {
  id: "default",
  venueName: "Deloitte Düsseldorf Office",
  address: "Schwannstraße 6",
  city: "40476 Düsseldorf, Germany",
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2498.5876543210987!2d6.7876543210987!3d51.2345678901234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b8ca1234567890%3A0x1234567890abcdef!2sSchwannstra%C3%9Fe%206%2C%2040476%20D%C3%BCsseldorf!5e0!3m2!1sen!2sde!4v1699999999999!5m2!1sen!2sde",
  directionsTrain: "From Düsseldorf Hauptbahnhof, take U-Bahn U78 or U79 toward Messe/Nord. Exit at Victoriaplatz/Klever Straße. Walk 5 minutes to Schwannstraße 6.",
  directionsCar: "Follow A44 toward Düsseldorf-Stockum. Take the exit Düsseldorf-Golzheim. Underground parking is available nearby at Parkhaus Derendorf.",
  directionsPlane: "Düsseldorf Airport (DUS) is approximately 15 minutes by taxi or 20 minutes via S-Bahn (S11 to Hauptbahnhof, then U78/U79).",
};

interface EventLocationProps {
  location?: Location | null;
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
          Join us at {locationData.venueName}
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
              <p className="text-lg font-medium">{locationData.venueName}</p>
              <p className="text-muted-foreground">{locationData.address}</p>
              <p className="text-muted-foreground">{locationData.city}</p>
              {locationData.mapEmbedUrl && (
                <div className="mt-6 aspect-video w-full overflow-hidden rounded-lg bg-muted">
                  <iframe
                    src={locationData.mapEmbedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Event Location Map"
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Directions */}
          <div className="space-y-4">
            {locationData.directionsTrain && (
              <Card className="border-border bg-background">
                <CardContent className="flex gap-4 p-6">
                  <Train className="h-6 w-6 shrink-0 text-primary" />
                  <div>
                    <h3 className="mb-2 font-medium">By Public Transport</h3>
                    <p className="text-sm text-muted-foreground">
                      {locationData.directionsTrain}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {locationData.directionsCar && (
              <Card className="border-border bg-background">
                <CardContent className="flex gap-4 p-6">
                  <Car className="h-6 w-6 shrink-0 text-primary" />
                  <div>
                    <h3 className="mb-2 font-medium">By Car</h3>
                    <p className="text-sm text-muted-foreground">
                      {locationData.directionsCar}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {locationData.directionsPlane && (
              <Card className="border-border bg-background">
                <CardContent className="flex gap-4 p-6">
                  <Plane className="h-6 w-6 shrink-0 text-primary" />
                  <div>
                    <h3 className="mb-2 font-medium">By Plane</h3>
                    <p className="text-sm text-muted-foreground">
                      {locationData.directionsPlane}
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
