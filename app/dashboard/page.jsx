import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentUserOnboardingState } from "@/lib/onboarding";

export default async function DashboardPage() {
    const { session, profile } = await getCurrentUserOnboardingState();

    if (!session?.user) {
        redirect("/auth/login");
    }

    if (!profile?.onboardingCompleted) {
        redirect("/auth/onboard");
    }

    return (
        <main className="min-h-screen bg-[linear-gradient(180deg,#f8fafc_0%,#ffffff_40%,#eef2ff_100%)] px-6 py-10 text-zinc-900">
            <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
                <div className="rounded-3xl border border-zinc-200 bg-white/80 p-8 shadow-sm backdrop-blur">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-600">
                        AlgoGrind Dashboard
                    </p>
                    <h1 className="mt-3 text-4xl font-black tracking-tight">
                        Welcome back, {profile.username}
                    </h1>
                    <p className="mt-3 max-w-2xl text-lg text-zinc-600">
                        Your onboarding is complete, so you can start grinding
                        through the dashboard experience from here.
                    </p>

                    <div className="mt-8 flex flex-wrap gap-3">
                        <Link
                            href="/auth/onboard"
                            className="inline-flex items-center justify-center rounded-2xl border border-zinc-200 bg-white px-5 py-3 text-base font-semibold text-zinc-700 transition-colors hover:bg-zinc-50"
                        >
                            Edit onboarding
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
