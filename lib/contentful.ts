import { createClient, Entry, Asset, EntryFieldTypes } from "contentful";

// Create the Contentful client
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
  image?: EntryFieldTypes.Text; // URL string in existing structure
  bio?: EntryFieldTypes.Text;
  topic?: EntryFieldTypes.Text;
  photo?: EntryFieldTypes.AssetLink;
  order?: EntryFieldTypes.Integer;
}

export type SpeakerEntry = Entry<SpeakerFields, undefined, string>;

// Schedule Item
export interface ScheduleItemFields {
  time: EntryFieldTypes.Text;
  title: EntryFieldTypes.Text;
  speaker?: EntryFieldTypes.Text;
  type: EntryFieldTypes.Text; // 'keynote' | 'talk' | 'break'
  order: EntryFieldTypes.Integer;
}

export type ScheduleItemEntry = Entry<ScheduleItemFields, undefined, string>;

// FAQ Item
export interface FaqItemFields {
  question: EntryFieldTypes.Text;
  answer: EntryFieldTypes.Text;
  order?: EntryFieldTypes.Integer;
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

// Theme
export interface ThemeFields {
  name: EntryFieldTypes.Text;
  backgroundColor: EntryFieldTypes.Text;
  primaryColor: EntryFieldTypes.Text;
  accentColor?: EntryFieldTypes.Text;
  foregroundColor?: EntryFieldTypes.Text;
  borderColor?: EntryFieldTypes.Text;
  isActive?: EntryFieldTypes.Boolean;
}

export type ThemeEntry = Entry<ThemeFields, undefined, string>;

// Simplified Theme object for use in the app
export interface Theme {
  id: string;
  name: string;
  backgroundColor: string;
  primaryColor: string;
  accentColor?: string;
  foregroundColor?: string;
  borderColor?: string;
  isActive?: boolean;
}

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

// ===================
// Theme Functions
// ===================

export async function getThemes(preview = false): Promise<Theme[]> {
  const client = getClient(preview);
  try {
    const entries = await client.getEntries<ThemeFields>({
      content_type: "theme",
    });
    return entries.items.map((entry) => ({
      id: entry.sys.id,
      name: entry.fields.name as string,
      backgroundColor: entry.fields.backgroundColor as string,
      primaryColor: entry.fields.primaryColor as string,
      accentColor: entry.fields.accentColor as string | undefined,
      foregroundColor: entry.fields.foregroundColor as string | undefined,
      borderColor: entry.fields.borderColor as string | undefined,
      isActive: entry.fields.isActive as boolean | undefined,
    }));
  } catch (error) {
    console.error("Error fetching themes:", error);
    return [];
  }
}

export async function getActiveTheme(preview = false): Promise<Theme | null> {
  const themes = await getThemes(preview);
  return themes.find((theme) => theme.isActive) || themes[0] || null;
}

export async function getThemeById(id: string, preview = false): Promise<Theme | null> {
  const client = getClient(preview);
  try {
    const entry = await client.getEntry<ThemeFields>(id);
    return {
      id: entry.sys.id,
      name: entry.fields.name as string,
      backgroundColor: entry.fields.backgroundColor as string,
      primaryColor: entry.fields.primaryColor as string,
      accentColor: entry.fields.accentColor as string | undefined,
      foregroundColor: entry.fields.foregroundColor as string | undefined,
      borderColor: entry.fields.borderColor as string | undefined,
      isActive: entry.fields.isActive as boolean | undefined,
    };
  } catch (error) {
    console.error("Error fetching theme by ID:", error);
    return null;
  }
}
