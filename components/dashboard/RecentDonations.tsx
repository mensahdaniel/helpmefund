"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { formatDistance } from "date-fns";
import { getDonations } from "@/lib/firebase/donations";

interface RecentDonationsProps {
  projectIds: string[];
}

interface Donation {
  id: string;
  amount: number;
  createdAt: Date;
  projectId: string;
  donorName: string;
  donorImage?: string;
}

export function RecentDonations({ projectIds }: RecentDonationsProps) {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDonations() {
      try {
        const recentDonations = await getDonations(projectIds);
        setDonations(recentDonations);
      } catch (error) {
        console.error("Error fetching donations:", error);
      } finally {
        setLoading(false);
      }
    }

    if (projectIds.length > 0) {
      fetchDonations();
    } else {
      setLoading(false);
    }
  }, [projectIds]);

  if (loading) {
    return <DonationsSkeleton />;
  }

  if (donations.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-white p-6 text-center">
        <p className="text-text-light">No donations yet</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border bg-white">
      <div className="divide-y divide-border">
        {donations.map((donation) => (
          <div key={donation.id} className="flex items-center gap-4 p-4">
            <div className="relative h-10 w-10 overflow-hidden rounded-full">
              {donation.donorImage
                ? (
                  <Image
                    src={donation.donorImage}
                    alt={donation.donorName}
                    fill
                    className="object-cover"
                  />
                )
                : (
                  <div className="flex h-full w-full items-center justify-center bg-primary/10 text-primary">
                    {donation.donorName[0]}
                  </div>
                )}
            </div>
            <div className="flex-1">
              <p className="font-medium text-text-dark">
                {donation.donorName}
              </p>
              <p className="text-sm text-text-light">
                Donated ${donation.amount.toLocaleString()}
              </p>
            </div>
            <p className="text-sm text-text-light">
              {formatDistance(donation.createdAt, new Date(), {
                addSuffix: true,
              })}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function DonationsSkeleton() {
  return (
    <div className="rounded-lg border border-border bg-white">
      <div className="divide-y divide-border">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center gap-4 p-4">
            <div className="h-10 w-10 animate-pulse rounded-full bg-gray-200" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
              <div className="h-3 w-32 animate-pulse rounded bg-gray-200" />
            </div>
            <div className="h-3 w-16 animate-pulse rounded bg-gray-200" />
          </div>
        ))}
      </div>
    </div>
  );
}
