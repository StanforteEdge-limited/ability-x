export type HeroAction = {
  href: string;
  label: string;
  variant: "primary" | "outline" | "ghost";
};

export type StatItem = {
  value: string;
  label: string;
};

export type GalleryPlaceholder = {
  id: string;
  label: string;
  alt: string;
  src: string;
};

export type PillarItem = {
  number: string;
  title: string;
  description: string;
};

export type LeadCaptureCard = {
  id: "partner" | "waitlist" | "exhibit";
  title: string;
  description: string;
  href: string;
  buttonLabel: string;
  featured?: boolean;
};

export type SpeakerItem = {
  id: string;
  name: string;
  role: string;
  image: {
    src: string;
    alt: string;
  };
};

export type RecapVideoItem = {
  id: string;
  label: string;
  description: string;
  youtubeId?: string;
};

export type SessionItem = {
  id: string;
  title: string;
  description: string;
  youtubeId: string;
  thumbnailLabel: string;
};

export type SessionTrack = {
  id: string;
  title: string;
  sessionCountLabel: string;
  sessions: SessionItem[];
};

export type AboutStatItem = {
  value: string;
  label: string;
};

export type PartnerBenefit = {
  number: string;
  text: string;
};

export type GalleryImage = {
  src: string;
  alt: string;
  caption?: string;
};
