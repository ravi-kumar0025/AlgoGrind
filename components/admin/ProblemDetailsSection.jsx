'use client';

import React from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function ProblemDetailsSection() {
    return (
        <div className="space-y-10">
            <div>
                <h2 className="text-2xl font-semibold mb-2">Problem Details</h2>
                <p className="text-zinc-600">Core information about the problem</p>
            </div>

            <div className="space-y-8">
                <div>
                    <Label className="text-sm font-medium">Problem Title</Label>
                    <Input className="mt-2 rounded-2xl py-6 text-lg" placeholder="Two Sum" />
                </div>

                <div>
                    <Label className="text-sm font-medium">Difficulty</Label>
                    <div className="flex gap-3 mt-3">
                        {['easy', 'medium', 'hard'].map(d => (
                            <Button key={d} variant="outline" className="capitalize rounded-2xl px-8">{d}</Button>
                        ))}
                    </div>
                </div>

                <div>
                    <Label className="text-sm font-medium">Description</Label>
                    <Textarea className="mt-2 rounded-3xl h-48" placeholder="Write a detailed problem description..." />
                </div>

                <div>
                    <Label className="text-sm font-medium">Constraints</Label>
                    <Textarea className="mt-2 rounded-3xl h-32 font-mono" placeholder="1 ≤ n ≤ 10^5" />
                </div>
            </div>
        </div>
    );
}