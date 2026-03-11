import { createClient, Entry, Asset, EntryFieldTypes } from "contentful";
import { unstable_cache } from "next/cache";

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

// Theme
export interface ThemeFields {
  name: EntryFieldTypes.Text;
  backgroundColor: EntryFieldTypes.Text;
  primaryColor: EntryFieldTypes.Text;
  accentColor?: EntryFieldTypes.Text;
  foregroundColor?: EntryFieldTypes.Text;
  borderColor?: EntryFieldTypes.Text;
  isActive?: EntryFieldTypes.Boolean;
  scheduleHeaderImage?: EntryFieldTypes.AssetLink;
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
  scheduleHeaderImageUrl?: string;
}

// Pricing Tier
export interface PricingFields {
  name: EntryFieldTypes.Text;
  price: EntryFieldTypes.Text;
  description?: EntryFieldTypes.Text;
  features?: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
  isHighlighted?: EntryFieldTypes.Boolean;
  ctaText?: EntryFieldTypes.Text;
  order?: EntryFieldTypes.Integer;
}

export type PricingEntry = Entry<PricingFields, undefined, string>;

export interface PricingTier {
  id: string;
  name: string;
  price: string;
  description?: string;
  features: string[];
  isHighlighted?: boolean;
  ctaText?: string;
  order?: number;
}

// Location
export interface LocationFields {
  venueName: EntryFieldTypes.Text;
  address: EntryFieldTypes.Text;
  city: EntryFieldTypes.Text;
  mapEmbedUrl?: EntryFieldTypes.Text;
  directionsCar?: EntryFieldTypes.Text;
  directionsTrain?: EntryFieldTypes.Text;
  directionsPlane?: EntryFieldTypes.Text;
}

export type LocationEntry = Entry<LocationFields, undefined, string>;

export interface Location {
  id: string;
  venueName: string;
  address: string;
  city: string;
  mapEmbedUrl?: string;
  directionsCar?: string;
  directionsTrain?: string;
  directionsPlane?: string;
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
      include: 2, // Include linked assets (like photos)
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

export async function getDesignSystem(preview = false): Promise<DesignSystemEntry | null> {
  const client = getClient(preview);
  try {
    const entries = await client.getEntries<DesignSystemFields>({
      content_type: "designSystem",
      limit: 1,
    });
    return entries.items[0] || null;
  } catch (error) {
    console.error("Error fetching design system:", error);
    return null;
  }
}

// Helper to convert design system entry to CSS variables
export function designSystemToCssVars(designSystem: DesignSystemEntry | null): Record<string, string> {
  if (!designSystem) return {};
  
  const fields = designSystem.fields;
  const vars: Record<string, string> = {};
  
  if (fields.primaryColor) vars['--primary'] = fields.primaryColor as string;
  if (fields.backgroundColor) vars['--background'] = fields.backgroundColor as string;
  if (fields.foregroundColor) vars['--foreground'] = fields.foregroundColor as string;
  if (fields.accentColor) vars['--accent'] = fields.accentColor as string;
  if (fields.mutedColor) vars['--muted'] = fields.mutedColor as string;
  if (fields.mutedForegroundColor) vars['--muted-foreground'] = fields.mutedForegroundColor as string;
  if (fields.borderColor) vars['--border'] = fields.borderColor as string;
  if (fields.cardColor) vars['--card'] = fields.cardColor as string;
  if (fields.destructiveColor) vars['--destructive'] = fields.destructiveColor as string;
  if (fields.borderRadius) vars['--radius'] = fields.borderRadius as string;
  
  return vars;
}

// Helper to get image URL from Contentful Asset
export function getAssetUrl(asset: Asset | undefined): string | null {
  if (!asset?.fields?.file?.url) return null;
  const url = asset.fields.file.url;
  return url.startsWith("//") ? `https:${url}` : url;
}

// ===================
// Pricing Functions
// ===================

export async function getPricingTiers(preview = false): Promise<PricingTier[]> {
  const contentfulClient = getClient(preview);
  try {
    const entries = await contentfulClient.getEntries<PricingFields>({
      content_type: "pricing",
      order: ["fields.order"] as const,
    });
    return entries.items.map((entry) => ({
      id: entry.sys.id,
      name: entry.fields.name as string,
      price: entry.fields.price as string,
      description: entry.fields.description as string | undefined,
      features: (entry.fields.features as string[]) || [],
      isHighlighted: entry.fields.isHighlighted as boolean | undefined,
      ctaText: entry.fields.ctaText as string | undefined,
      order: entry.fields.order as number | undefined,
    }));
  } catch (error) {
    console.error("Error fetching pricing tiers:", error);
    return [];
  }
}

// ===================
// Location Functions
// ===================

export async function getLocation(preview = false): Promise<Location | null> {
  const contentfulClient = getClient(preview);
  try {
    const entries = await contentfulClient.getEntries<LocationFields>({
      content_type: "location",
      limit: 1,
    });
    if (entries.items.length === 0) return null;
    const entry = entries.items[0];
    return {
      id: entry.sys.id,
      venueName: entry.fields.venueName as string,
      address: entry.fields.address as string,
      city: entry.fields.city as string,
      mapEmbedUrl: entry.fields.mapEmbedUrl as string | undefined,
      directionsCar: entry.fields.directionsCar as string | undefined,
      directionsTrain: entry.fields.directionsTrain as string | undefined,
      directionsPlane: entry.fields.directionsPlane as string | undefined,
    };
  } catch (error) {
    console.error("Error fetching location:", error);
    return null;
  }
}

// ===================
// Theme Functions
// ===================

async function fetchThemes(preview = false): Promise<Theme[]> {
  const contentfulClient = getClient(preview);
  try {
    const entries = await contentfulClient.getEntries<ThemeFields>({
      content_type: "theme",
      include: 2,
    });
    return entries.items.map((entry) => {
      const imageAsset = entry.fields.scheduleHeaderImage as Asset | undefined;
      return {
        id: entry.sys.id,
        name: entry.fields.name as string,
        backgroundColor: entry.fields.backgroundColor as string,
        primaryColor: entry.fields.primaryColor as string,
        accentColor: entry.fields.accentColor as string | undefined,
        foregroundColor: entry.fields.foregroundColor as string | undefined,
        borderColor: entry.fields.borderColor as string | undefined,
        isActive: entry.fields.isActive as boolean | undefined,
        scheduleHeaderImageUrl: getAssetUrl(imageAsset) || undefined,
      };
    });
  } catch (error) {
    console.error("Error fetching themes:", error);
    return [];
  }
}

// Cached version of getThemes with revalidation tag
export const getThemes = unstable_cache(
  async (preview = false) => fetchThemes(preview),
  ["contentful-themes"],
  { tags: ["contentful-themes"], revalidate: 60 }
);

async function fetchActiveTheme(preview = false): Promise<Theme | null> {
  const themes = await fetchThemes(preview);
  return themes.find((theme) => theme.isActive) || themes[0] || null;
}

// Cached version of getActiveTheme with revalidation tag
export const getActiveTheme = unstable_cache(
  async (preview = false) => fetchActiveTheme(preview),
  ["contentful-active-theme"],
  { tags: ["contentful-themes", "contentful-active-theme"], revalidate: 60 }
);

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
