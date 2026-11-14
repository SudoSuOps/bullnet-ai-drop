/** Reads a folder on the node and fingerprints every file in it. The only part of step one that touches disk. */
import { createHash } from 'node:crypto';
import { createReadStream } from 'node:fs';
import { lstat, readdir } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';
import { buildManifest, type Entry, type Manifest } from './manifest.ts';

function hashFile(file: string): Promise<{ sha256: string; bytes: number }> {
  return new Promise((resolve, reject) => {
    const h = createHash('sha256');
    let bytes = 0;
    createReadStream(file)
      .on('data', (c) => { h.update(c); bytes += c.length; })
      .on('error', reject)
      .on('end', () => resolve({ sha256: h.digest('hex'), bytes }));
  });
}

/** Fingerprints every regular file under `dir`. Symbolic links are refused so nothing outside the folder is pulled in. */
export async function manifestForFolder(dir: string): Promise<Manifest> {
  const entries: Entry[] = [];
  async function walk(d: string): Promise<void> {
    for (const name of (await readdir(d)).sort()) {
      const full = join(d, name);
      const st = await lstat(full);
      if (st.isSymbolicLink()) throw new Error(`Refusing to follow a link: ${relative(dir, full)}`);
      if (st.isDirectory()) await walk(full);
      else if (st.isFile()) entries.push({ path: relative(dir, full).split(sep).join('/'), ...(await hashFile(full)) });
    }
  }
  await walk(dir);
  return buildManifest(entries);
}
