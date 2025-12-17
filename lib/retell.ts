import Retell from "retell-sdk";

export const retellClient = new Retell({
  apiKey: process.env.NEXT_PUBLIC_RETELL_API_KEY!,
});
