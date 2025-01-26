import { useState } from "react";
import { formatDistance } from "date-fns";
import Link from "next/link";
import Image from "next/image";
import { Investment } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { InvestmentsListSkeleton } from "./InvestmentsListSkeleton";

interface InvestmentsListProps {
  investments: Investment[];
  loading: boolean;
}

export function InvestmentsList(
  { investments, loading }: InvestmentsListProps,
) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("date");

  if (loading) {
    return <InvestmentsListSkeleton />;
  }

  const sortedInvestments = [...investments].sort((a, b) => {
    if (sortBy === "date") {
      return b.createdAt.getTime() - a.createdAt.getTime();
    }
    if (sortBy === "amount") {
      return b.amount - a.amount;
    }
    return 0;
  });

  const filteredInvestments = sortedInvestments.filter((investment) =>
    // Add null check for projectTitle
    investment.projectTitle
      ? investment.projectTitle.toLowerCase().includes(
        searchQuery.toLowerCase(),
      )
      : true
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search investments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date">Most Recent</SelectItem>
            <SelectItem value="amount">Amount</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        {filteredInvestments.map((investment) => (
          <div
            key={investment.id}
            className="rounded-lg border bg-white p-4 transition-all hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                {investment.projectImage && (
                  <div className="relative h-16 w-16 overflow-hidden rounded-lg">
                    <Image
                      src={investment.projectImage}
                      alt={investment.projectTitle || "Project"}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div>
                  <h3 className="font-medium">
                    {investment.projectTitle || "Unnamed Project"}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    ${investment.amount.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatDistance(investment.createdAt, new Date(), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
              </div>
              <Link href={`/projects/${investment.projectId}`}>
                <Button variant="outline" size="sm">
                  View Project
                </Button>
              </Link>
            </div>
          </div>
        ))}

        {filteredInvestments.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No investments found</p>
          </div>
        )}
      </div>
    </div>
  );
}
