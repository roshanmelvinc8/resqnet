import { LoginForm } from "@/components/login-form";
import { Logo } from "@/components/Logo";

export default function LoginPage() {
  return (
    <div className="flex min-h-svh w-full flex-col items-center justify-center p-6 md:p-10 bg-background text-foreground">
      <div className="mb-8">
        <Logo />
      </div>
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
