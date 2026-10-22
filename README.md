# Browser Todo

Small React pilot for the Engineering Standards and Hlidskalf workflow. The human requested a simple React todo app with browser localStorage and no server side.

Task and recorded handoff: [issue #1](https://github.com/SteveEmmerich/browser-todo/issues/1). The app supports adding, completing and deleting todos, preserving them in this browser's localStorage. Protected CI trust, independent review, and human acceptance remain separate.

Stack: React, TypeScript, Vite, and Node/npm, using the technologies already approved for this initiative. Todos stay in localStorage for the current browser origin; there is no cross-device synchronization or server component. Unreadable data is not automatically replaced. If saving fails, the list remains usable in memory and the app reports that it is not saved. Explicit recovery can replace the saved list with the currently displayed list.

## Run locally

Use Node 24 and npm. Run `npm ci`, `npm test`, and `npm run build`. Run `npm run dev` for development, or `npm run preview` to inspect the built bundle at `http://127.0.0.1:1421/`. The local server serves static frontend files only. Use the same origin to retain your list.

For the manual storage-denial browser check, run `node tests/browser-fixture.mjs` after building and open `http://127.0.0.1:1422/`. This is an explicitly labelled verification harness, not an application backend: an iframe's opaque origin denies the unchanged production bundle access to real browser storage. Corrupt-data and write-quota cases in the Node tests use injected storage fixtures.

See [journey criteria](docs/journeys.md) and [task draft](docs/task-draft.md). Engineering Standards 0.1.0 is pinned independently in standards.lock.json; its installed skills are under .agents/skills.

Observed checks, bundle identity, genuine captures, and remaining review/acceptance gates are recorded in [verification](docs/verification.md). The implementation is in [draft PR #2](https://github.com/SteveEmmerich/browser-todo/pull/2), not merged into main.
