// This is the environment variables exported and exposed to VSCode Intellisense for easier development
import "server-only" // This is meant to be accessible only on the server and not on the client side

// Add your environment variable from here
export const GITHUB_CLID = process.env.GITHUB_CLIENT_ID!
export const GITHUB_CLID_SECRET = process.env.GITHUB_CLIENT_SECRET!
export const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL!
export const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN!
export const GEMINI_API_KEY = process.env.GEMINI_API_KEY!
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL!
export const NODE_ENV = process.env.NODE_ENV