'use client';

import React, { useState } from 'react';
import { Toaster, toast } from 'sonner';
import ProblemSidebar from './ProblemSidebar';
import ProblemDetailsSection from './ProblemDetailsSection';
import ExamplesSection from './ExamplesSection';
import TestCasesSection from './TestCasesSection';
import CodeTemplatesSection from './CodeTemplatesSection';
import HintsEditorialSection from './HintsEditorialSection';
import ReviewSection from './ReviewSection';

const sections = [
    { id: 'details', label: 'Problem Details', icon: '📋' },
    { id: 'examples', label: 'Examples', icon: '📝' },
    { id: 'testcases', label: 'Hidden Test Cases', icon: '🔒' },
    { id: 'code', label: 'Code Templates', icon: '💻' },
    { id: 'hints', label: 'Hints & Editorial', icon: '💡' },
    { id: 'review', label: 'Review & Publish', icon: '✅' },
];

export default function CreateProblemLayout() {
    const [activeSection, setActiveSection] = useState('details');

    const handleSaveDraft = () => toast.success("Draft saved successfully");
    const handlePublish = () => toast.success("Problem published successfully!");

    return (
        <div className="min-h-screen bg-[#F8F9FA] flex">
            <Toaster position="top-center" richColors />

            <ProblemSidebar
                sections={sections}
                activeSection={activeSection}
                setActiveSection={setActiveSection}
            />

            <div className="flex-1">
                <div className="sticky top-0 z-50 bg-white border-b border-zinc-200 px-8 py-5 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Create New Problem</h1>
                        <p className="text-sm text-zinc-500">AlgoGrind Admin • Problem Authoring</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={handleSaveDraft}
                            className="px-6 py-2.5 border border-zinc-300 rounded-2xl hover:bg-zinc-50 transition font-medium"
                        >
                            Save Draft
                        </button>
                        <button
                            onClick={handlePublish}
                            className="bg-linear-to-r from-indigo-600 to-violet-600 text-white px-8 py-2.5 rounded-2xl hover:brightness-110 transition font-medium"
                        >
                            Publish Problem
                        </button>
                    </div>
                </div>

                <div className="p-8 max-w-5xl mx-auto pb-24">
                    {activeSection === 'details' && <ProblemDetailsSection />}
                    {activeSection === 'examples' && <ExamplesSection />}
                    {activeSection === 'testcases' && <TestCasesSection />}
                    {activeSection === 'code' && <CodeTemplatesSection />}
                    {activeSection === 'hints' && <HintsEditorialSection />}
                    {activeSection === 'review' && <ReviewSection />}
                </div>
            </div>
        </div>
    );
}