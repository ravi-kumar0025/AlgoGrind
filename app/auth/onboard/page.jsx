
import { redirect } from "next/navigation";
import OnboardingForm from "@/components/onboardingForm";
import { getCurrentUserOnboardingState } from "@/lib/onboarding";

export default async function OnboardingPage() {
    const { session, profile } = await getCurrentUserOnboardingState();

    if (!session?.user) {
        redirect("/auth/login");
    }

    if (profile?.onboardingCompleted) {
        redirect("/dashboard");
    }

    return (
        <OnboardingForm/>
    );
}
