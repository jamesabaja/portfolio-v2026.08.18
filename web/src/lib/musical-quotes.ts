import { cache } from "react";

/**
 * Lines from musicals, one of which stands in for the 404 page’s subtitle.
 *
 * Hard-coded alongside the other static page copy (see `stack.ts`): this is
 * voice, not editorial content, so it doesn’t belong in Sanity.
 */
export type MusicalQuote = {
  /** The line itself, without surrounding quotation marks. */
  line: string;
  /** The musical it comes from. */
  source: string;
};

export const MUSICAL_QUOTES: Array<MusicalQuote> = [
  { line: "Where in the world have you been hiding?", source: "The Phantom of the Opera" },
  { line: "She doesn’t even go here!", source: "Mean Girls The Musical" },
  { line: "There’s a place for us, somewhere a place for us.", source: "West Side Story" },
  { line: "If it’s not right, you have to put it right.", source: "Matilda the Musical" },
  { line: "It sucks to be me.", source: "Avenue Q" },
  { line: "I’m limited.", source: "Wicked" },
  { line: "We’ve got tribulation, my good sir.", source: "Schmigadoon!" },
  { line: "Please look after this bear.", source: "Paddington the Musical" },
  { line: "Don’t feed the plants!", source: "Little Shop of Horrors" },
  { line: "That’s all.", source: "The Devil Wears Prada The Musical" },
  { line: "Tomorrow is a latter day.", source: "The Book of Mormon" },
  { line: "Now is the time to seize the day.", source: "Newsies" },
  { line: "You can’t stop the beat.", source: "Hairspray" },
  { line: "Here I go again.", source: "Mamma Mia!" },
  { line: "Leave your troubles outside.", source: "Cabaret" },
];

/**
 * One quote per request. Wrapped in `cache` so every render pass of a single
 * request (React renders the tree more than once) lands on the same line —
 * otherwise the streamed payload disagrees with the HTML and the quote visibly
 * swaps on hydration.
 */
export const randomMusicalQuote = cache(
  (): MusicalQuote => MUSICAL_QUOTES[Math.floor(Math.random() * MUSICAL_QUOTES.length)],
);
