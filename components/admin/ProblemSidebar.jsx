'use client';

import React from 'react';

export default function ProblemSidebar({ sections, activeSection, setActiveSection }) {
    return (
        <div className="w-72 border-r border-zinc-200 bg-white h-screen sticky top-0 overflow-y-auto">
            <div className="p-6">
                <div className="font-bold text-xl mb-8 flex items-center gap-2">
                    <div className="w-8 h-8 bg-linear-to-br from-indigo-600 to-violet-600 rounded-xl" />
                    ALGOGRIND
                </div>

                <div className="mb-8">
                    <div className="text-xs uppercase tracking-widest text-zinc-500 mb-2">PROGRESS</div>
                    <div className="h-2 bg-zinc-100 rounded-full overflow-hidden">
                        <div className="h-full w-[75%] bg-linear-to-r from-indigo-500 to-violet-500 rounded-full" />
                    </div>
                    <div className="text-xs text-zinc-500 mt-1">75% Complete</div>
                </div>

                <nav className="space-y-1">
                    {sections.map((section) => (
                        <button
                            key={section.id}
                            onClick={() => setActiveSection(section.id)}
                            className={`w-full text-left px-4 py-3 rounded-2xl flex items-center gap-3 transition-all ${activeSection === section.id
                                ? 'bg-violet-100 text-violet-700 font-medium'
                                : 'hover:bg-zinc-100 text-zinc-700'}`}
                        >
                            <span>{section.icon}</span>
                            <span>{section.label}</span>
                        </button>
                    ))}
                </nav>
            </div>
        </div>
    );
}