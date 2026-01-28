import { z } from "zod";

export const structuredOutputSchema = z.object({
  response: z.string().describe("The response to show the user."),
  followUps: z
    .array(z.string())
    .describe("Optional follow-up questions the user could ask next.")
    .optional(),
});

export type StructuredOutput = z.infer<typeof structuredOutputSchema>;

export const structuredOutputJsonSchema = {
  ...z.toJSONSchema(structuredOutputSchema, {
    name: "StructuredOutput",
    description: "Structured response schema for the CopilotKit agent.",
  }),
  title: "StructuredOutput",
  description: "Structured response schema for the CopilotKit agent.",
};
