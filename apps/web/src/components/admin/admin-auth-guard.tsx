
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { ApiRequestError, apiRequest } from "@/lib/api";

interface MeResponse {
  success: boolean;
  data: {
    admin: {
      id: string;
      email: string;
    };
  };
}

interface AdminAuthGuardProps {
  children: React.ReactNode;
}

export default function AdminAuthGuard({
  children,
}: AdminAuthGuardProps) {
  const router = useRouter();

  const [status, setStatus] = useState<
    "loading" | "authenticated" | "error"
  >("loading");

  const [error, setError] = useState("");
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    let active = true;

    const verifySession = async () => {
      setStatus("loading");
      setError("");

      try {
        await apiRequest<MeResponse>("/auth/me", {
          method: "GET",
        });

        if (active) {
          setStatus("authenticated");
        }
      } catch (err) {
        if (!active) return;

        if (err instanceof ApiRequestError && err.status === 401) {
          router.replace("/admin/login");
          return;
        }

        setError(
          err instanceof Error
            ? err.message
            : "Unable to verify your admin session.",
        );

        setStatus("error");
      }
    };

    void verifySession();

    return () => {
      active = false;
    };
  }, [router, retryCount]);

  if (status === "loading") {
    return (
      <div className="grid min-h-screen place-items-center bg-background px-5">
        <div className="text-center">
          <div className="mx-auto h-9 w-9 animate-spin rounded-full border-2 border-border border-t-primary" />

          <p className="mt-4 text-sm text-muted">
            Verifying admin session...
          </p>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="grid min-h-screen place-items-center bg-background px-5">
        <div className="w-full max-w-md rounded-2xl border border-border bg-surface p-8 text-center">
          <h1 className="text-xl font-bold">
            Unable to verify session
          </h1>

          <p className="mt-3 text-sm leading-6 text-muted">
            {error}
          </p>

          <button
            type="button"
            onClick={() => setRetryCount((count) => count + 1)}
            className="mt-6 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
