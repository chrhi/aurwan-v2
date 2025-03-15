import { z } from "zod";

export const createStoreSchema = z.object({
  name: z.string().min(1, "Store name is required"),
  color: z.string().min(1, "Color code is required"),
  lang: z.string().min(1, "Language is required"),
  admins: z.array(z.string()).optional().default([]),
  subdomain: z.string(),
});

export type CreateStoreInput = z.infer<typeof createStoreSchema>;
