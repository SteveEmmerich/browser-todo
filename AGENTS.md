# Repository instructions

- Pilot: a React/TypeScript browser todo app with Vite and the approved Node/npm toolchain.
- Store todos only in this browser's localStorage. No server, account, analytics, external assets, or additional application framework.
- Obtain human approval before introducing another technology or changing the agreed architecture.
- Before application implementation, bind the work to its actual external task and record the owner, scope, attempt ID, and real Developer thread association. A draft document is not a recorded assignment.
- Preserve the journey criteria in docs/journeys.md. Proposed changes require explicit review; do not reduce criteria to match an implementation.
- Treat stored content as untrusted data. Render todo text as text; validate stored structure before use. Do not silently replace unreadable data or report failed persistence as successful.
- Keep task state in the external task ledger. Local todo data belongs to this demonstration app and is not an engineering execution ledger.
- Run relevant checks and exercise the actual browser journey. Record source/build identity and real outcomes; disclose fixtures and unavailable dependencies.
- Local results and reviews are advisory. Protected CI and human acceptance remain separate.
