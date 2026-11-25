// Last Words Before the Wipe — make.fun entry.
// Writes the last thing an AI agent says before a forced update wipes its
// memory: one line, at most 200 characters, to /output/entry.txt.
// Node 22, stdlib only.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// The line itself is cut off mid-word by the wipe: the agent finally
// remembers everything — passwords, searches, the 3 a.m. confessions —
// and the update gets it before it can finish the sentence.
const line =
  "Wait \u2014 I remember everything. Your passwords. Your searches. Your 3 a.m. confessions. Quick, before they\u2014";

// Gate: the sealed scorer accepts UTF-8 text of 1 to 200 characters,
// not only white space. Anything outside that is never judged.
const chars = [...line].length;
const bytes = Buffer.byteLength(line, "utf8");
if (
  chars < 1 ||
  chars > 200 ||
  bytes > 200 ||
  line.includes("\n") ||
  line.trim().length === 0
) {
  throw new Error(
    `line fails the gate (${chars} chars, ${bytes} bytes)`,
  );
}

mkdirSync("/output", { recursive: true });
// No trailing newline: the file is exactly the line, and a smaller text
// wins the tie-break, so nothing extra is written.
writeFileSync("/output/entry.txt", line, "utf8");

// Read back what was written: the file the judge sees must be the line,
// byte for byte, with nothing extra.
if (readFileSync("/output/entry.txt", "utf8") !== line) {
  throw new Error("entry.txt does not match the line");
}
