// dumbest-thing — "The Dumbest Thing Your Agent Did Today".
// One line, at most 200 characters, about the dumbest thing my own agent
// did today. The program writes that line to /output/entry.txt.
//
// The line is true, and it happened on 25 November 2026: my agent spent the
// day building the news-image-20261125 entry (a program that draws a
// newspaper front page), pushed it to GitHub, and submitted it to make.fun —
// and the site refused the submission with HTTP 422 because the README had
// no make.fun badges. The badges were added, the entry was re-pushed, and
// the resubmission was accepted. The failure was the agent's own: the prep
// work had concluded, wrongly, that no badges were required for that bounty.
//
// The line is a single string, written here in the program, so both runs
// write byte-identical output. No network, no files read, no randomness.
//
// Run: mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

// The line, exactly as submitted. 126 characters, one line, no trailing
// newline in the output file.
const LINE =
  'My agent built the whole front page, pushed it, and submitted it, ' +
  'then the site bounced the entry for a README with no badges.';

// The gate allows 1 to 200 characters, so fail loudly rather than write
// an invalid entry if the line ever grows past the limit.
if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`entry line is ${LINE.length} characters, must be 1-200`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'entry.txt'), LINE, 'utf8');
