// Shared by the Payload `bulletin` collection (select options) and the bulletin
// page filter pills, so what editors can pick always matches what readers can
// filter by.
export const BULLETIN_CATEGORIES = ["Topic", "Market", "Asset Class", "Level"] as const;

export type BulletinCategory = (typeof BULLETIN_CATEGORIES)[number];
