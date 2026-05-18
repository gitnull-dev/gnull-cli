const BASE_URL = process.env.GITNULL_API_URL ?? "https://gitnull.xyz";

export interface Repository {
  id: number; name: string; owner: string; description: string;
  language: string; stars: number; forks: number; isPrivate: boolean;
  agentStatus: string; onchainAddress: string; openIssues: number;
  openPRs: number; totalBounty: number | null; ipfsHash?: string;
}

export interface PullRequest {
  id: number; repoId: number; number: number; title: string;
  status: string; author: string; additions: number; deletions: number;
  onchainProof: string | null;
}

export interface Bounty {
  id: number; issueId: number; amount: number; currency: string;
  status: string; postedBy: string;
}

export interface Contributor {
  id: string; username: string; walletAddress: string;
  reputation: number; gnullBalance: number; prsMerged: number;
}

export const api = {
  async get<T>(path: string): Promise<T> {
    const res = await fetch(`${BASE_URL}${path}`);
    if (!res.ok) throw new Error(`API error ${res.status}: ${await res.text()}`);
    return res.json() as Promise<T>;
  },
  async post<T>(path: string, body: unknown): Promise<T> {
    const res = await fetch(`${BASE_URL}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`API error ${res.status}: ${await res.text()}`);
    return res.json() as Promise<T>;
  },
  async patch<T>(path: string, body: unknown): Promise<T> {
    const res = await fetch(`${BASE_URL}${path}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`API error ${res.status}: ${await res.text()}`);
    return res.json() as Promise<T>;
  },
};
