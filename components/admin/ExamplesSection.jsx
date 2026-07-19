// components/admin/ExamplesSection.jsx
'use client';

import React from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, Plus } from "lucide-react";

export default function ExamplesSection() {
    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-2xl font-semibold">Examples</h2>
                    <p className="text-zinc-600">Provide clear input/output examples</p>
                </div>
                <Button className="rounded-2xl">
                    <Plus className="mr-2 w-4 h-4" /> Add Example
                </Button>
            </div>

            <div className="space-y-8">
                {[1, 2].map(i => (
                    <div key={i} className="border border-zinc-200 rounded-3xl p-8 bg-white">
                        <div className="flex justify-between mb-6">
                            <h4 className="font-medium">Example {i}</h4>
                            <Trash2 className="w-5 h-5 text-zinc-400 cursor-pointer hover:text-red-500" />
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <p className="text-sm text-zinc-500 mb-2">Input</p>
                                <Textarea className="font-mono rounded-2xl h-28" placeholder="nums = [2,7,11,15], target = 9" />
                            </div>
                            <div>
                                <p className="text-sm text-zinc-500 mb-2">Output</p>
                                <Textarea className="font-mono rounded-2xl h-28" placeholder="[0, 1]" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}