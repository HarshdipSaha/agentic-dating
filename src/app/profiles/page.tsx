"use client";

import { useState } from "react";
import { CANDIDATES } from "@/data/candidates";
import { PersonCard } from "@/components/PersonCard";
import { Search, Filter, ShieldCheck, Users } from "lucide-react";

export default function ProfilesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState<string>("all");

  const industries = ["all", "Artificial Intelligence", "Media", "Fintech", "Publishing", "Consulting"];

  const filteredCandidates = CANDIDATES.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.traits.passions.some((p) => p.label.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesIndustry =
      selectedIndustry === "all" ||
      c.industry.toLowerCase().includes(selectedIndustry.toLowerCase());

    return matchesSearch && matchesIndustry;
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Page Header */}
      <div className="pb-6 border-b border-[#e7e2d7]">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#f4efe6] text-[10px] uppercase font-mono tracking-wider text-[#1c1917] border border-[#e7e2d7] mb-3">
          <Users className="w-3 h-3 text-[#991b1b]" />
          <span>Cohort Roster</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1c1917]">
          Verified Candidate Cohort
        </h1>
        <p className="text-xs sm:text-sm text-[#57534e] mt-2 max-w-2xl leading-relaxed">
          Every candidate has an official LinkedIn URL and public Instagram URL verified against
          public records. Each profile powers a Personal MCP digital double capable of autonomous dating.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-lg bg-[#ffffff] border border-[#e7e2d7]">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#78716c] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search candidates by name, trait, keyword..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded border border-[#e7e2d7] bg-[#faf8f5] text-[#1c1917] focus:outline-none focus:border-[#1c1917]"
          />
        </div>

        {/* Industry Filter */}
        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-[#78716c]" />
          <select
            value={selectedIndustry}
            onChange={(e) => setSelectedIndustry(e.target.value)}
            className="px-3 py-2 text-xs rounded border border-[#e7e2d7] bg-[#faf8f5] text-[#1c1917] focus:outline-none focus:border-[#1c1917]"
          >
            <option value="all">All Industries</option>
            <option value="Artificial Intelligence">AI & Research</option>
            <option value="Fintech">Fintech & Finance</option>
            <option value="Media">Media & Podcasting</option>
            <option value="Education">Education & Coaching</option>
          </select>
        </div>
      </div>

      {/* Summary Count Bar */}
      <div className="flex items-center justify-between text-xs font-mono text-[#78716c]">
        <div>
          Showing <span className="font-semibold text-[#1c1917]">{filteredCandidates.length}</span> of {CANDIDATES.length} admitted profiles
        </div>
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-[#15803d]" />
          <span>All profiles bound to two public sources</span>
        </div>
      </div>

      {/* Candidates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCandidates.map((c) => (
          <PersonCard key={c.id} person={c} />
        ))}
      </div>

      {filteredCandidates.length === 0 && (
        <div className="p-12 text-center rounded-lg bg-[#ffffff] border border-[#e7e2d7]">
          <p className="text-sm text-[#78716c]">
            No candidates matched your search criteria. Try a different search keyword.
          </p>
        </div>
      )}
    </div>
  );
}
