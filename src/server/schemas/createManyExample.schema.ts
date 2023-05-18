import { z } from 'zod';
import { ExampleCreateManyInputObjectSchema } from './objects/ExampleCreateManyInput.schema';

export const ExampleCreateManySchema = z.object({
  data: z.union([
    ExampleCreateManyInputObjectSchema,
    z.array(ExampleCreateManyInputObjectSchema),
  ]),
});
