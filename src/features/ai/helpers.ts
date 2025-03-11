import "server-only";
import axios, { AxiosError } from "axios";

type getRepositoryReadmeParams = {
  repo_name: string;
  owner: string;
  token: string;
};
export async function getRepositoryReadme({
  token,
  owner,
  repo_name,
}: getRepositoryReadmeParams) {
  try {
    const res = await axios.get(
      `https://api.github.com/repos/${owner}/${repo_name}/readme`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (e) {
    if (e instanceof AxiosError) {
      if (e.response?.status === 404) {
        return "";
      }
    }
    throw e;
  }
}

type getUserRepositoryListParams = {
  token: string;
};
export async function getUserRepositoryList({
  token,
}: getUserRepositoryListParams) {
  const url = `https://api.github.com/user/repos`;
  const res = await axios.get(url, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data
}
