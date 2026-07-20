import { customAlphabet } from "nanoid";

const alphabet = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";

export const generateInviteCode = (): string => {
  const generate = customAlphabet(alphabet, 8);

  return generate();
};


export const handleCopy = async (inviteCode: string) => {
  try {
    await navigator.clipboard.writeText(inviteCode);
  } catch (error) {
    console.error("Failed to copy:", error);
  }
};