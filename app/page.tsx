import { EventHeader } from "@/components/event-header";
import { EventHero } from "@/components/event-hero";
import { EventSpeakers } from "@/components/event-speakers";
import { EventSchedule } from "@/components/event-schedule";
import { EventPricing } from "@/components/event-pricing";
import { EventLocation } from "@/components/event-location";
import { EventFAQ } from "@/components/event-faq";
import { EventFooter } from "@/components/event-footer";
import { EventsSlider } from "@/components/events-slider";
import {
  getHeroContent,
  getSpeakers,
  getScheduleItems,
  getFaqItems,
  getSiteSettings,
  getPricingTiers,
  getLocation,
  getAssetUrl,
  getActiveTheme,
} from "@/lib/contentful";

export const revalidate = 60; // Revalidate content every 60 seconds
export const dynamic = "force-dynamic"; // Force dynamic rendering to avoid stale cache

export default async function Home() {
  // Fetch all content from Contentful in parallel
  const [heroEntry, speakersEntries, scheduleEntries, faqEntries, siteSettingsEntry, pricingTiers, locationData, activeTheme] =
    await Promise.all([
      getHeroContent(),
      getSpeakers(),
      getScheduleItems(),
      getFaqItems(),
      getSiteSettings(),
      getPricingTiers(),
      getLocation(),
      getActiveTheme(),
    ]);

  // Transform hero content
  const heroData = heroEntry
    ? {
        title: heroEntry.fields.title as string,
        subtitle: heroEntry.fields.subtitle as string | undefined,
        location: heroEntry.fields.location as string,
        locationSubtext: heroEntry.fields.locationSubtext as string | undefined,
        eventDate: heroEntry.fields.eventDate as string,
        venue: heroEntry.fields.venue as string,
        onlineLabel: heroEntry.fields.onlineLabel as string | undefined,
        onlinePrice: heroEntry.fields.onlinePrice as string,
        earlyBirdLabel: heroEntry.fields.earlyBirdLabel as string | undefined,
        earlyBirdOriginalPrice: heroEntry.fields.earlyBirdOriginalPrice as string | undefined,
        earlyBirdPrice: heroEntry.fields.earlyBirdPrice as string,
        ctaButtonText: heroEntry.fields.ctaButtonText as string,
        ctaButtonLink: heroEntry.fields.ctaButtonLink as string | undefined,
      }
    : null;

  // Transform speakers content - supports both field structures
  const speakersData = speakersEntries.map((entry) => ({
    id: entry.sys.id, // Unique Contentful entry ID
    name: entry.fields.name as string,
    role: entry.fields.role as string,
    topic: (entry.fields.topic as string) || undefined,
    bio: (entry.fields.bio as string) || undefined,
    // Support both 'photo' (asset) and 'image' (string URL) fields
    photo: entry.fields.photo ? getAssetUrl(entry.fields.photo as any) : null,
    image: (entry.fields.image as string) || null,
  }));

  // Transform schedule content
  const scheduleData = scheduleEntries.map((entry) => ({
    time: entry.fields.time as string,
    title: entry.fields.title as string,
    speaker: (entry.fields.speaker as string) || "",
    type: entry.fields.type as "keynote" | "talk" | "break",
  }));

  // Transform FAQ content
  const faqData = faqEntries.map((entry) => ({
    question: entry.fields.question as string,
    answer: entry.fields.answer as string,
  }));

  // Transform site settings
  const siteSettings = siteSettingsEntry
    ? {
        eventName: siteSettingsEntry.fields.eventName as string,
        eventYear: siteSettingsEntry.fields.eventYear as string,
        tagline: siteSettingsEntry.fields.tagline as string | undefined,
      }
    : null;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <EventHeader siteSettings={siteSettings} />
      <main>
        <EventHero data={heroData} />
        <EventSchedule items={scheduleData} headerImageUrl={activeTheme?.scheduleHeaderImageUrl || "/images/schedule-header-green.jpg"} />
        <EventSpeakers speakers={speakersData} />
        <EventPricing pricing={pricingTiers} />
        <EventLocation location={locationData} />
        <EventFAQ items={faqData} />
        <EventsSlider />
      </main>
      <EventFooter siteSettings={siteSettings} />
    </div>
  );
}
