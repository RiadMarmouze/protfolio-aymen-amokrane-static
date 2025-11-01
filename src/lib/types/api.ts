type ApiOk = { id: string; status: "ok" };
type ApiErr = { error: string } | { error: string; issues?: unknown };
