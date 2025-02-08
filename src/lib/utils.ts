import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getDefaultValues = (schema: z.ZodObject<any>) => {
  return Object.fromEntries(
    Object.entries(schema.shape).map(([key, value]) => [
      key,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (value as any)._def.defaultValue
        ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (value as any)._def.defaultValue()
        : undefined,
    ])
  );
};
