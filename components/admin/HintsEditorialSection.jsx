'use client';

import React from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";

export default function HintsEditorialSection() {
    return (
        <div className="space-y-12">
            {/* Hints */}
            <div>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold">Hints</h2>
                    <Button variant="outline" className="rounded-2xl">
                        <Plus className="w-4 h-4 mr-2" /> Add Hint
                    </Button>
                </div>
                {[1, 2].map(i => (
                    <div key={i} className="flex gap-4 mb-4">
                        <div className="flex-1">
                            <Label>Hint {i}</Label>
                            <Textarea className="mt-2 rounded-2xl" placeholder="Consider using a hash map..." />
                        </div>
                        <button className="self-end mb-3 text-zinc-400 hover:text-red-500">
                            <Trash2 className="w-5 h-5" />
                        </button>
                    </div>
                ))}
            </div>

            {/* Editorial */}
            <div>
                <h2 className="text-2xl font-semibold mb-6">Editorial</h2>
                <Textarea
                    className="h-96 rounded-3xl font-mono"
                    placeholder="### Approach&#10;&#10;Explain the optimal solution here..."
                />
            </div>
        </div>
    );
}