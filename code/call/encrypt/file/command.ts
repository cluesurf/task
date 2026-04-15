// Intentionally empty. Argv builders live inline in `./node.ts` —
// encrypt/decrypt don't go through the COMMAND registry because
// `age` / `openssl` / `gpg` aren't registered there yet. Safe to
// delete this file.

export {}
