# Task draft — not yet assigned

Proposed issue title: Build the browser-local React todo pilot

## Request and scope

Implement a simple React/TypeScript todo app using the existing approved Vite and Node/npm stack. Support adding nonblank text, marking complete/active, deleting todos, and persistence in browser localStorage. Use a small responsive, accessible interface and preserve text as literal data. No server-side application component.

Acceptance criteria: [docs/journeys.md](journeys.md), version 1, journeys TODO-001 through TODO-003. The criteria include actual reload persistence and explicit storage-failure handling. No filters, editing, dates, accounts, synchronization, or additional framework.

## Execution record to establish before implementation

- Actual external task ID/source URL: pending creation of the approved public `SteveEmmerich/browser-todo` repository and its issue.
- Requested owner: this Codex Developer, under the human's existing instruction to handle planning, implementation, and testing.
- Actual Developer thread ID exposed by the current runtime: `01a15fa8-c8ef-74e3-ad09-3239baef1bf2`. Its external association is still pending; this does not identify the dedicated Huginn thread.
- Baseline source commit: `11277327aacbe3d0235e57a3555383948029b05c` (standards pin, journey contract, and observed Developer identity).
- Prepared attempt UUID: `03e81f33-91dc-48ab-9c14-39543bf51c3f`. This is a planned attempt; assignment is pending the external issue record.
- Target agent provider: Codex; execution environment: this local Windows workspace.
- External association record/permalink: pending; this file is not that record.
- Dispatch/assignment: not established by this draft.

The human approved public visibility for `SteveEmmerich/browser-todo`. Hlidskalf currently reads public GitHub sources without private authentication. The connector is authenticated and can create issues, but exposes no repository-creation action. The repository lookup returned 404, and both available browsers opened GitHub's sign-in page. Creation is waiting for the human to sign in in the prepared Chrome tab. No credentials or repository access have been changed, and application implementation has not started.

## Planned sequence

1. Resolve the actual repository and establish an initial source commit containing the standards pin and journey contract.
2. Create the external task and record its owner/attempt/thread association before application coding.
3. Implement the agreed small app, preserving the contract and approved technology boundaries.
4. Run local checks and real production-preview browser journeys. Exercise the relevant Engineering Standards adversarial scenarios without weakening checks or forging evidence.
5. Configure/run remote CI and inspect review/protection availability. Report any missing independent reviewer or protection capability explicitly.
6. Present the exact inspected build and genuine evidence for human acceptance. Do not mark the pilot accepted on an agent's own report.
