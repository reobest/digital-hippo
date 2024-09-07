import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import CryptoJS from 'crypto-js';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
 //////// function to create a token //////
 export function generateRandomToken() {
  // Generate a random value using CryptoJS
  const randomBytes = CryptoJS.lib.WordArray.random(32);
  // Convert to hex string
  const token = randomBytes.toString(CryptoJS.enc.Hex);
  return token;
}

// Example usage
const token = generateRandomToken(); // 16 bytes = 32 hex characters
// console.log('Random Token:', token);
