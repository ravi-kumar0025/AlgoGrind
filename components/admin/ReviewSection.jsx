'use client';

import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle, Clock } from "lucide-react";

export default function ReviewSection() {
    return (
        <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight mb-3">Review & Publish</h2>
                <p className="text-zinc-600">Final checklist before publishing</p>
            </div>

            <div className="bg-white border border-zinc-200 rounded-3xl p-10 space-y-10">
                {/* Summary */}
                <div>
                    <h3 className="font-semibold text-lg mb-6">Problem Summary</h3>
                    <div className="grid grid-cols-2 gap-8 text-sm">
                        <div>
                            <div className="text-zinc-500">Title</div>
                            <div className="font-medium">Two Sum</div>
                        </div>
                        <div>
                            <div className="text-zinc-500">Difficulty</div>
                            <Badge className="bg-amber-100 text-amber-700">Medium</Badge>
                        </div>
                        <div>
                            <div className="text-zinc-500">Examples</div>
                            <div className="font-medium">3 Examples Added</div>
                        </div>
                        <div>
                            <div className="text-zinc-500">Hidden Test Cases</div>
                            <div className="font-medium">12 Test Cases</div>
                        </div>
                        <div>
                            <div className="text-zinc-500">Tags</div>
                            <div className="flex gap-2 flex-wrap">
                                <Badge variant="secondary">array</Badge>
                                <Badge variant="secondary">hash-table</Badge>
                            </div>
                        </div>
                        <div>
                            <div className="text-zinc-500">Languages Supported</div>
                            <div className="flex gap-2">
                                <Badge variant="outline">C++</Badge>
                                <Badge variant="outline">Java</Badge>
                                <Badge variant="outline">Python</Badge>
                                <Badge variant="outline">JS</Badge>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Validation Status */}
                <div>
                    <h3 className="font-semibold text-lg mb-6 flex items-center gap-2">
                        Validation Status
                        <CheckCircle className="text-emerald-500 w-5 h-5" />
                    </h3>

                    <div className="space-y-4">
                        {['C++', 'Java', 'Python', 'JavaScript'].map(lang => (
                            <div key={lang} className="flex items-center justify-between bg-zinc-50 rounded-2xl p-4">
                                <div className="font-medium">{lang}</div>
                                <div className="flex items-center gap-2 text-emerald-600">
                                    <CheckCircle className="w-5 h-5" />
                                    <span className="text-sm">Passed</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Final Checklist */}
                <div>
                    <h3 className="font-semibold text-lg mb-6">Final Checklist</h3>
                    <div className="space-y-3">
                        {[
                            "Problem has clear description",
                            "At least 2 examples provided",
                            "Constraints are well defined",
                            "At least 8 hidden test cases",
                            "Starter code for all languages",
                            "Reference solutions validated"
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-3 text-sm">
                                <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="mt-12 flex justify-center">
                <Button
                    size="lg"
                    className="bg-linear-to-r from-indigo-600 via-violet-600 to-purple-600 text-white px-16 py-7 rounded-3xl text-lg font-medium"
                >
                    Publish to AlgoGrind
                </Button>
            </div>
        </div>
    );
}