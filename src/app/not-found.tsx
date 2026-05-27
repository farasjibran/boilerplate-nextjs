import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-6xl font-bold text-muted-foreground">404</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Halaman tidak ditemukan.
      </p>
      <Link
        href="/"
        className="mt-6 text-primary hover:underline"
      >
        Kembali ke Beranda
      </Link>
    </div>
  );
}
