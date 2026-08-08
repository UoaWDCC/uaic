"use server";

import type { CollectionSlug } from "payload";
import { getPayload } from "payload";
import config from "@payload-config";

type BulletinCommitteeMember = {
  name: string;
  role: string;
};

type BulletinCommitteeDoc = {
  name?: string | null;
  role?: string | null;
};

export const getBulletinCommittee = async (): Promise<{
  members: BulletinCommitteeMember[];
}> => {
  const payload = await getPayload({ config });

  const result = await payload.find({
    collection: "bulletin-committee" as CollectionSlug,
    depth: 0,
    pagination: false,
    sort: "createdAt",
  });

  const docs = result.docs as BulletinCommitteeDoc[];

  const members = docs.map((doc) => ({
    name: doc.name || "",
    role: doc.role || "",
  }));

  return { members };
};
