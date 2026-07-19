'use client';

import React from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Trash2, Plus } from "lucide-react";

export default function TestCasesSection() {
    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-2xl font-semibold">Hidden Test Cases</h2>
                    <p className="text-zinc-600">These will be used for judging submissions</p>
                </div>
                <Button className="rounded-2xl flex items-center gap-2">
                    <Plus className="w-4 h-4" /> Add Test Case
                </Button>
            </div>

            <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white border border-zinc-200 rounded-3xl p-6 flex gap-6">
                        <div className="flex-1">
                            <Label>Input</Label>
                            <Textarea
                                className="mt-2 font-mono rounded-2xl h-24"
                                placeholder="nums = [3,2,4], target = 6"
                            />
                        </div>
                        <div className="flex-1">
                            <Label>Output</Label>
                            <Textarea
                                className="mt-2 font-mono rounded-2xl h-24"
                                placeholder="[1,2]"
                            />
                        </div>
                        <button className="self-start mt-8 text-zinc-400 hover:text-red-500">
                            <Trash2 className="w-5 h-5" />
                        </button>
                    </div>
                ))}
            </div>

            <div className="mt-6 text-sm text-zinc-500">
                12 Hidden Test Cases Added
            </div>
        </div>
    );
}