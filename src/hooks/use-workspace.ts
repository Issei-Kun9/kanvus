"use client";

import * as React from "react";

interface Workspace {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  _count: { projects: number; members: number };
}

export function useWorkspace() {
  const [workspace, setWorkspace] = React.useState<Workspace | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch("/api/workspaces")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setWorkspace(data[0]);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return { workspace, workspaceId: workspace?.id ?? null, loading };
}
