/**
 * Cryptographically secure random number generator
 * Falls back to Math.random() if crypto API is not available
 */
export function getRandomInt(max: number): number {
  if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
    const randomArray = new Uint32Array(1);
    window.crypto.getRandomValues(randomArray);
    return randomArray[0] % max;
  }
  // Fallback to Math.random() if crypto API is not available
  return Math.floor(Math.random() * max);
}

/**
 * Cryptographically secure shuffle using Fisher-Yates algorithm
 */
export function secureShuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = getRandomInt(i + 1);
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Get a random element from an array using cryptographically secure random
 */
export function getRandomElement<T>(array: T[]): T | null {
  if (array.length === 0) return null;
  const randomIndex = getRandomInt(array.length);
  return array[randomIndex];
}

