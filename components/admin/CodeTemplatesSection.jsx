'use client';

import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { Label } from 'recharts';

const languages = ['cpp', 'java', 'python', 'javascript'];

export default function CodeTemplatesSection() {
    const [activeLang, setActiveLang] = useState('cpp');
    const [copied, setCopied] = useState(false);

    const handleCopy = (code) => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-2">Code Templates</h2>
            <p className="text-zinc-600 mb-8">Starter code and reference solutions</p>

            <Tabs defaultValue="cpp" className="w-full">
                <TabsList className="grid w-full grid-cols-4 rounded-2xl bg-zinc-100 p-1">
                    {languages.map(lang => (
                        <TabsTrigger
                            key={lang}
                            value={lang}
                            className="rounded-xl data-[state=active]:bg-white"
                        >
                            {lang.toUpperCase()}
                        </TabsTrigger>
                    ))}
                </TabsList>

                {languages.map(lang => (
                    <TabsContent key={lang} value={lang} className="mt-6">
                        <div className="space-y-8">
                            <div>
                                <div className="flex justify-between mb-3">
                                    <Label>Starter Code</Label>
                                    <Button variant="ghost" size="sm" onClick={() => handleCopy("// Starter code here")}>
                                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                    </Button>
                                </div>
                                <Textarea
                                    className="font-mono h-80 rounded-3xl"
                                    placeholder={`// Write ${lang.toUpperCase()} starter code here...`}
                                />
                            </div>

                            <div>
                                <div className="flex justify-between mb-3">
                                    <Label>Reference Solution</Label>
                                    <Button variant="ghost" size="sm">Validate</Button>
                                </div>
                                <Textarea
                                    className="font-mono h-80 rounded-3xl"
                                    placeholder={`// Optimal ${lang.toUpperCase()} solution...`}
                                />
                            </div>
                        </div>
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    );
}