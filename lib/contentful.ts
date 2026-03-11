import { createClient, Entry, Asset, EntryFieldTypes } from "contentful";

// Contentful CMS Integration
// Queries do not use order field as it's not defined in the content types
const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

// Preview client for draft content
const previewClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_PREVIEW_TOKEN || process.env.CONTENTFUL_ACCESS_TOKEN!,
  host: "preview.contentful.com",
});

export const getClient = (preview = false) => (preview ? previewClient : client);

// ===================
// Content Type Definitions
// ===================

// Hero Section
export interface HeroFields {
  title: EntryFieldTypes.Text;
  subtitle?: EntryFieldTypes.Text;
  location: EntryFieldTypes.Text;
  locationSubtext?: EntryFieldTypes.Text;
  eventDate: EntryFieldTypes.Text;
  venue: EntryFieldTypes.Text;
  onlineLabel?: EntryFieldTypes.Text;
  onlinePrice: EntryFieldTypes.Text;
  earlyBirdLabel?: EntryFieldTypes.Text;
  earlyBirdOriginalPrice?: EntryFieldTypes.Text;
  earlyBirdPrice: EntryFieldTypes.Text;
  ctaButtonText: EntryFieldTypes.Text;
  ctaButtonLink?: EntryFieldTypes.Text;
}

export type HeroEntry = Entry<HeroFields, undefined, string>;

// Speaker - matches existing Contentful structure
export interface SpeakerFields {
  name: EntryFieldTypes.Text;
  role: EntryFieldTypes.Text;
  image?: EntryFieldTypes.Text;
  bio?: EntryFieldTypes.Text;
  topic?: EntryFieldTypes.Text;
  photo?: EntryFieldTypes.AssetLink;
}

export type SpeakerEntry = Entry<SpeakerFields, undefined, string>;

// Schedule Item
export interface ScheduleItemFields {
  time: EntryFieldTypes.Text;
  title: EntryFieldTypes.Text;
  speaker?: EntryFieldTypes.Text;
  type: EntryFieldTypes.Text;
}

export type ScheduleItemEntry = Entry<ScheduleItemFields, undefined, string>;

// FAQ Item
export interface FaqItemFields {
  question: EntryFieldTypes.Text;
  answer: EntryFieldTypes.Text;
}

export type FaqItemEntry = Entry<FaqItemFields, undefined, string>;

// Site Settings (header/footer)
export interface SiteSettingsFields {
  eventName: EntryFieldTypes.Text;
  eventYear: EntryFieldTypes.Text;
  tagline?: EntryFieldTypes.Text;
  navigationLinks?: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
  footerLinks?: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
  socialLinks?: EntryFieldTypes.Object;
}

export type SiteSettingsEntry = Entry<SiteSettingsFields, undefined, string>;

// ===================
// Data Fetching Functions
// ===================

export async function getHeroContent(preview = false): Promise<HeroEntry | null> {
  const client = getClient(preview);
  try {
    const entries = await client.getEntries<HeroFields>({
      content_type: "hero",
      limit: 1,
    });
    return entries.items[0] || null;
  } catch (error) {
    console.error("Error fetching hero content:", error);
    return null;
  }
}

export async function getSpeakers(preview = false): Promise<SpeakerEntry[]> {
  const client = getClient(preview);
  try {
    const entries = await client.getEntries<SpeakerFields>({
      content_type: "speaker",
    });
    return entries.items;
  } catch (error) {
    console.error("Error fetching speakers:", error);
    return [];
  }
}

export async function getScheduleItems(preview = false): Promise<ScheduleItemEntry[]> {
  const client = getClient(preview);
  try {
    const entries = await client.getEntries<ScheduleItemFields>({
      content_type: "scheduleItem",
    });
    return entries.items;
  } catch (error) {
    console.error("Error fetching schedule:", error);
    return [];
  }
}

export async function getFaqItems(preview = false): Promise<FaqItemEntry[]> {
  const client = getClient(preview);
  try {
    const entries = await client.getEntries<FaqItemFields>({
      content_type: "faqItem",
    });
    return entries.items;
  } catch (error) {
    console.error("Error fetching FAQ items:", error);
    return [];
  }
}

export async function getSiteSettings(preview = false): Promise<SiteSettingsEntry | null> {
  const client = getClient(preview);
  try {
    const entries = await client.getEntries<SiteSettingsFields>({
      content_type: "siteSettings",
      limit: 1,
    });
    return entries.items[0] || null;
  } catch (error) {
    console.error("Error fetching site settings:", error);
    return null;
  }
}

// Helper to get image URL from Contentful Asset
export function getAssetUrl(asset: Asset | undefined): string | null {
  if (!asset?.fields?.file?.url) return null;
  const url = asset.fields.file.url;
  return url.startsWith("//") ? `https:${url}` : url;
}
