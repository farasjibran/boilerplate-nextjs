export default function GlobalLoading() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="animate-spin text-primary" role="status" aria-label="Memuat...">
        Loading...
      </div>
    </div>
  );
}
