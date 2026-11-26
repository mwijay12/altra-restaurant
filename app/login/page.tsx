"use client";

import { useRouter } from "next/navigation";
import { AuthComponent } from "@/components/ui/sign-up";
import { markSignedIn } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();

  const handleEmailSuccess = (email: string) => {
    markSignedIn(email);
    // let the confetti play, then head to the admin workspace
    window.setTimeout(() => router.push("/admin"), 1600);
  };

  const handleGoogleLogin = () => {
    markSignedIn("chef@altra.tz");
    router.push("/admin");
  };

  return (
    <AuthComponent
      brandName="Altra"
      onAuthSuccess={handleEmailSuccess}
      onGoogleLogin={handleGoogleLogin}
    />
  );
}
