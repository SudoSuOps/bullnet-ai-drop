/** Stores the log as one JSON entry per line. One writer at a time: the node service owns the file. */
import { appendFile, readFile } from 'node:fs/promises';
import { nextEntry, type LogEntry, type LogEvent } from './log.ts';

export async function readLog(file: string): Promise<LogEntry[]> {
  let text: string;
  try { text = await readFile(file, 'utf8'); } catch (e) { if ((e as NodeJS.ErrnoException).code === 'ENOENT') return []; throw e; }
  return text.split('\n').filter((l) => l.trim()).map((l, i) => { try { return JSON.parse(l) as LogEntry; } catch { throw new Error(`Line ${i + 1} of the log is not valid JSON.`); } });
}

/** Reads the log, adds one signed entry at the end and returns it. Never rewrites earlier lines. */
export async function appendEvent(file: string, event: LogEvent, privateKeyPem: string, now: Date = new Date()): Promise<LogEntry> {
  const entry = nextEntry(await readLog(file), event, privateKeyPem, now);
  await appendFile(file, JSON.stringify(entry) + '\n', { mode: 0o600 });
  return entry;
}
