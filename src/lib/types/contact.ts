// ----------------------
type OfferKind = "collab" | "job";

type OfferPayloadBase = {
  kind: OfferKind;
  name: string;
  email: string;
  projectName: string;
  industry: string;
  budget: string;
  timeline: string;
  country: string;
  projectType: string;
  brief: string;
};

type CollabPayload = OfferPayloadBase & {
  kind: "collab";
  priorityKey?: "cafe" | "esports" | "fintech" | "event" | "logistics";
};

type JobPayload = OfferPayloadBase & {
  kind: "job";
  priorityKey?: never;
};

type OfferPayload = CollabPayload | JobPayload;
