import Link from "next/link";
import { Button } from "./ui/button";
import { createClient } from "@/lib/supabase/server";
import { LogoutButton } from "./logout-button";

export async function AuthButton() {
  const supabase = await createClient();

  // You can also use getUser() which will be slower.
  const { data } = await supabase.auth.getClaims();

  const user = data?.claims;

  return user ? (
    <div className="flex items-center gap-4">
      Hey, {user.email?.split("@")[0]}!
      <LogoutButton />
    </div>
  ) : (
    <div className="flex gap-2">
      <Button asChild size="sm" variant={"outline"} className="border-brand-aqua text-brand-aqua hover:bg-brand-aqua/10">
        <Link href="/login">Sign in</Link>
      </Button>
      <Button asChild size="sm" variant={"default"} className="bg-brand-red text-white hover:bg-brand-red/90">
        <Link href="/signup">Sign up</Link>
      </Button>
    </div>
  );
}
