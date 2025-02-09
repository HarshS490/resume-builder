import { GEMINI_API_KEY, REDIS_TOKEN, REDIS_URL } from "@/config";
import { Redis } from "@upstash/redis";
import axios from "axios";
import { geminiPromptResponseType, promptTemplateType } from "./types";
// import { z } from "zod";

export const getGithubTokenFromDB = async (user_id: string) => {
  const redis = new Redis({
    url: REDIS_URL,
    token: REDIS_TOKEN,
  });
  const access_token = (await redis.get(user_id)) as string;
  if (access_token) {
    return access_token;
  } else {
    throw new Error("TOKEN_NOT_PRESENT");
  }
};

export const getRepositories = async (
  access_token: string,
  github_user_id: string
) => {
  const url = `https://api.github.com/users/${github_user_id}/repos`;
  const res = await axios.get(url, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  });
  if (res.status !== 200) {
    throw new Error("Unable to get Repositories");
  }
  return res.data;
};

type PromptFnProps = {
  prompt_data: promptTemplateType[]
  prompt_text: string;
};
export const PropmptFn = async ({
  prompt_data,
  prompt_text,
}: PromptFnProps) => {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-8b:generateContent?key=${GEMINI_API_KEY}`;
  const body = {
    contents: [
      {
        parts: [
          ...prompt_data,
          {
            text: prompt_text,
          },
        ],
      },
    ],
  };
  const res = await axios.post(url, body, {
    headers: { Accept: "application/json" },
  });
  if (res.status !== 200) {
    console.error("Failed to generate response from Gemini");
    throw new Error("Failed to generate response from Gemini");
  }

  return res.data as geminiPromptResponseType;
};
