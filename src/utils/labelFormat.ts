/** Parsed footer number: split only when the trimmed string is exactly \d+\.\d+ (e.g. "57.2"). */
export type AbvDisplay =
  | { mode: 'split'; integer: string; fractionWithDot: string }
  | { mode: 'whole'; value: string };

const SPLITTABLE_DECIMAL_RE = /^\d+\.\d+$/;

export function parseAbvParts(s: string): AbvDisplay {
  const trimmed = s.trim();
  if (!SPLITTABLE_DECIMAL_RE.test(trimmed)) {
    return { mode: 'whole', value: trimmed };
  }
  const dot = trimmed.indexOf('.');
  return {
    mode: 'split',
    integer: trimmed.slice(0, dot),
    fractionWithDot: trimmed.slice(dot),
  };
}

export type NameWithParen = { main: string; parenLine: string | null };

/**
 * "Blue Label (Xordinaire)" → main "Blue Label", parenLine "(Xordinaire)" on the next line.
 */
export function splitNameWithParenthetical(name: string): NameWithParen {
  const m = name.match(/^(.*)\s+\(([^)]+)\)\s*$/);
  if (!m) {
    return { main: name, parenLine: null };
  }
  return { main: m[1], parenLine: `(${m[2]})` };
}
