# Does It Pencil? Publishing a drop

The series lives at `/does-it-pencil/`. Each drop is one entry in `content/drops.ts`. No other file changes.

## Add a drop

1. Open `content/drops.ts` and copy the newest entry to the top of the `drops` array.
2. Change `slug` (lowercase, hyphens; this becomes the URL), `number`, `date`, `title`, `practice`, `summary`.
3. Fill `setup` (two to four headline numbers), `move`, `sections`, `questions` and `verdict`.
4. Push to `main`. Cloudflare rebuilds, and the index, the drop page, the sitemap and the article data update themselves.

Also add one line for the drop under "Pages" in `public/llms.txt`.

## Rules for every drop

- Scenarios are illustrative. The page labels them so. Do not describe a real client, property or transaction.
- State what the arithmetic shows and ask what would decide it. Do not tell the reader to buy, sell or hold.
- Tax and legal points say "generally" and point to a qualified adviser.
- No market statistics without a cited source.
- `verdict.status` uses the Defendable vocabulary: `MATHEMATICALLY VERIFIED`, `EVIDENCE SUPPORTED`, `INCONCLUSIVE`, `FAILED`, `REQUIRES HUMAN REVIEW`.

## Interactive modules

`module` is optional. One kind exists: `exchange`, a like-kind exchange value and equity check (`lib/exchange.ts`, tested in `lib/exchange.test.ts`). A new kind needs a pure function with tests in `lib/`, a client component in `components/pencil/`, and a branch in `DropView.tsx`.

## Artwork

`public/assets/pencil/bull.jpg` is the series mascot, cropped from founder-supplied artwork. It is editorial art for this series only. The BullNet mark remains the B.
