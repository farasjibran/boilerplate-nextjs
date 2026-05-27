export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-muted/30">
      <header className="border-b bg-background px-6 py-4">
        <h2 className="text-lg font-semibold">Dashboard</h2>
      </header>
      <main className="p-6">{children}</main>
    </div>
  );
}
