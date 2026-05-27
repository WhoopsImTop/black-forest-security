export interface SeoMeta {
  title: string;
  description: string;
}

export interface ContentSection {
  id: string;
  title?: string;
  paragraphs: string[];
}

export interface FeatureItem {
  title: string;
  description: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ServiceSummary {
  slug: string;
  title: string;
  description: string;
  to: string;
  image: string;
}

export interface ServicePageContent {
  seo: SeoMeta;
  title: string;
  lead?: string;
  sections: ContentSection[];
  features?: FeatureItem[];
  faq?: FaqItem[];
}

export interface TeamMember {
  name: string;
  role: string;
}

export interface LegalBlock {
  type: "h2" | "h3" | "h4" | "p" | "ul";
  text?: string;
  items?: string[];
}

export interface LegalPageContent {
  seo: SeoMeta;
  title: string;
  blocks: LegalBlock[];
}
