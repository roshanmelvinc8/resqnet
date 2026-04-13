import { DeployButton } from "@/components/deploy-button";
import { EnvVarWarning } from "@/components/env-var-warning";
import { AuthButton } from "@/components/auth-button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { hasEnvVars } from "@/lib/utils";
import Link from "next/link";
import { Suspense } from "react";
import { Logo } from "@/components/Logo";

export default function Home() {
  const currentYear = 2026;
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16 sticky top-0 bg-background/80 backdrop-blur-md z-50">
          <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
            <div className="flex gap-5 items-center font-semibold">
              <Link href={"/"} className="text-brand-red font-bold">ResQNet</Link>
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

        <div className="flex-1 flex flex-col gap-12 max-w-5xl p-5 items-center text-center">
          <Logo />
          <div className="space-y-4 max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-brand-red">
              ResQNet Emergency System
            </h1>
            <p className="text-xl text-muted-foreground">
              A modern, reliable emergency alert system with Shake-to-SOS, Geolocation, and instant contact notification.
            </p>
            <div className="flex gap-4 justify-center pt-4">
              <Link
                href="/login"
                className="px-8 py-3 bg-brand-red text-white font-bold rounded-md hover:bg-brand-red/90 transition-colors"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="px-8 py-3 bg-background border border-brand-aqua text-brand-aqua font-bold rounded-md hover:bg-brand-aqua/10 transition-colors"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>

        <footer className="w-full flex flex-col items-center justify-center border-t mx-auto text-center text-xs gap-4 py-16">
          <p className="text-muted-foreground">
             &copy; {currentYear} ResQNet. Built for safety.
          </p>
          <ThemeSwitcher />
        </footer>
      </div>
    </main>
  );
}
