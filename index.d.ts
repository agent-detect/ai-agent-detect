// Hand-written declarations — no build step for a zero-dep package.

export interface AgentClaim {
  /** Canonical agent slug, or null when agenthood is proven but unnamed (e.g. AGENT=1). */
  name: string | null;
  vendor: string | null;
  version: string | null;
  mode: string | null;
  /** Which rung produced this claim. */
  source: 'env:AI_AGENT' | 'env:AGENT' | 'env:vendor';
  confidence: 'high' | 'medium' | 'low';
  /** The matched evidence — the env vars this claim rests on. */
  raw: Record<string, string>;
}

export interface AgentInfo extends AgentClaim {
  /** Set when an independent signal confirmed the primary claim. */
  corroborated?: boolean;
  /**
   * Every claim the environment carries, deliberately unordered — env cannot
   * order nesting layers (an outer harness's vars pass through inner ones).
   */
  claims: AgentClaim[];
}

export interface DetectOptions {
  /** Inject an env (tests, snapshots). Defaults to process.env, copied once per process. */
  env?: Record<string, string | undefined>;
}

/** Structured detection: primary claim + all claims, or null when nothing matches. */
export function detect(opts?: DetectOptions): AgentInfo | null;

/** Am I running under any agent? */
export function isAgent(opts?: DetectOptions): boolean;
/** Assert style: am I running under this specific agent? */
export function isAgent(name: string, opts?: DetectOptions): boolean;
