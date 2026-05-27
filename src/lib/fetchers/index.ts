import "server-only";
import { AppError } from "@/lib/errors";

interface FetchOptions extends RequestInit {
  params?: Record<string, string | number | boolean>;
  revalidate?: number | false;
  tags?: string[];
}

interface ApiResponse<T> {
  data: T;
  message?: string;
  status: "success" | "error";
}

async function normalizeError(res: Response): Promise<never> {
  let detail = "Terjadi kesalahan pada server.";
  try {
    const body = await res.json();
    detail = body.message || body.error || detail;
  } catch {
    /* ignore */
  }
  throw new AppError(detail, res.status, `HTTP_${res.status}`);
}

export async function apiFetch<T>(
  url: string,
  { params, revalidate, tags, ...init }: FetchOptions = {},
): Promise<T> {
  const requestUrl = new URL(url, process.env.NEXT_PUBLIC_APP_URL);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      requestUrl.searchParams.set(key, String(value));
    });
  }

  const res = await fetch(requestUrl.toString(), {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
    next: { revalidate, tags },
  });

  if (!res.ok) {
    await normalizeError(res);
  }

  const json: ApiResponse<T> = await res.json();
  return json.data;
}
