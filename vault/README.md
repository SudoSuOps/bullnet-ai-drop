# Vault, steps one and two

Status: **built and tested. Not yet running in any client office.** This is the foundation only: IDs, fingerprints and the log. No access gate, no encryption, no chain.

The vault is not specific to real estate. An asset can be a property, a company, a contract, a piece of equipment or anything else that has confidential files.

## What step one does

1. **Asset ID** (`asset-id.ts`). Turns the facts that identify an asset into an opaque ID such as `0x2939…`. It is a keyed hash, so nobody without the vault key can work back to the asset or confirm a guess. The key holder can prove the link at any time.
2. **Manifest** (`manifest.ts`). Lists every document with its SHA-256 fingerprint and produces one root hash for the whole set. Any change to any document changes the root. One document can be proven to belong to the set without showing the others.
3. **Folder reader and command line** (`files.ts`, `cli.ts`). Fingerprints a real folder on the node and checks it later against a stored manifest.

## Use

```
node --experimental-strip-types vault/cli.ts keygen vault.key
node --experimental-strip-types vault/cli.ts id vault.key property address="100 Example Way" city=Sampletown state=FL
node --experimental-strip-types vault/cli.ts manifest ./deal-room > manifest.json
node --experimental-strip-types vault/cli.ts verify manifest.json ./deal-room
```

`verify` prints `MATCH`, or `CHANGED` with the files added, removed and changed.

## What step two does

**Signed log** (`log.ts`, `log-file.ts`). Every vault event becomes one entry that carries the hash of the entry before it and a signature from the node's log key. Editing, removing, inserting or reordering an entry makes verification fail at that entry.

```
node --experimental-strip-types vault/cli.ts log-keygen log-private.pem log-public.pem
node --experimental-strip-types vault/cli.ts log-append log.jsonl log-private.pem ACCESS_GRANTED 0x<asset-id> ndas party=party-0017
node --experimental-strip-types vault/cli.ts log-verify log.jsonl log-public.pem [checkpoint.json]
```

Limits, stated plainly:

- Whoever holds the private key and the file can cut entries off the end or rewrite the whole log, and it will still verify. A **checkpoint** (entry number plus head hash) given to a second party catches that. The seller's weekly report should carry one.
- The log records what the node was told. It does not prove an event happened in the real world.
- Times come from the node's clock.
- One writer at a time.
- Keep personal details out of entries. Use party IDs. The log is permanent by design.

## Rules

- The key never leaves the vault. It is never published and never put on a chain. Lose the key and the link between IDs and assets can no longer be proven.
- Documents are never uploaded by this code. It reads local files and writes hashes.
- A fingerprint proves a document has not changed. It does not prove the document is true.
- File paths appear in the manifest. Do not put confidential facts in file names if the manifest will be shared.
- This code does not encrypt anything yet. Encryption at rest is the node's job until a later step adds it.

## Where it lives

It sits in the website repository for now because that is where the tests run. It is not imported by the website and nothing here is published to bullnet.ai. It should move to its own repository when the node service is started.

## Next steps (see the NDAS proposal in the project)

3. NDAS gate. 4. Weekly seller report. 5. Broker ID. 6. Optional on-chain anchoring.
