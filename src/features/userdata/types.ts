export type geminiPromptResponseType = {
  candidates: {
    content: {
      parts: {
        text: string;
      }[];
      role: string;
    };
    finishReason: string;
    safetyRatings: {
      category: string;
      probability: string;
    }[];
    avgLogprobs: number;
  }[];
  usageMetadata: {
    promptTokenCount: number;
    candidatesTokenCount: number;
    totalTokenCount: number;
    promptTokensDetails: {
      modality: string;
      token_count: number;
    }[];
    candidatesTokensDetails: {
      modality: string;
      token_count: number;
    }[];
  };
  modelVersion: string;
};


export type promptCategories = "projects" 
export type promptTemplateType = {
  text : string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} & Record<any,any>
