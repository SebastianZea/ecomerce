import { defineCollection, z } from "astro:content";

const productCollection = defineCollection({
    type: 'content',
    schema: z.object({
        name: z.string(),
        price: z.coerce.string(),
        oldPrice: z.coerce.string(),
        image: z.string(),
        category: z.string(),
        stimedTime: z.string(),
        discount: z.boolean(),
        percentDiscount: z.coerce.number(),
        description: z.string(),
        features: z.array(z.string()),
        sizes: z.array(z.string()),
        colors: z.array(
            z.object({
              name: z.string(),
              url: z.string(),
              colorPrice: z.coerce.string(),
            })
          ).optional(),
    }),
});

export const collections = { product: productCollection };