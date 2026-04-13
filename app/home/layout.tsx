import { AuthButton } from "@/components/auth-button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { hasEnvVars } from "@/lib/utils";
import { EnvVarWarning } from "@/components/env-var-warning";
import { Shield } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentYear = 2026; // Fixed year for SSR stability or use a client component for this

  return (
    <main className="min-h-screen flex flex-col items-center bg-background">
      <div className="flex-1 w-full flex flex-col items-center">
        <nav className="w-full flex justify-center border-b border-b-brand-red/10 h-16 sticky top-0 bg-background/80 backdrop-blur-md z-50">
          <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
            <div className="flex gap-5 items-center font-semibold text-brand-red">
              <Link href={"/home"} className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                ResQNet
              </Link>
            </div>
            {!hasEnvVars ? (
              <EnvVarWarning />
            ) : (
              <Suspense>
                <AuthButton />
              </Suspense>
            )}
          </div>
        </nav>
        <div className="flex-1 w-full max-w-5xl">
          {children}
        </div>

        <footer className="w-full flex flex-col items-center justify-center border-t border-t-brand-red/10 mx-auto text-center text-xs gap-4 py-8 mt-12">
          <p className="text-muted-foreground">
            &copy; {currentYear} ResQNet Emergency Alert System. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <ThemeSwitcher />
          </div>
        </footer>
      </div>
    </main>
  );
}
