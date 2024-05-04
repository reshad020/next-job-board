import prisma from "@/lib/prisma";
import JobListItem from "./JobListItem";
import { Prisma } from "@prisma/client";
import { JobFilterValues } from "@/lib/validation";
import { Suspense } from "react";
interface JobResultProps {
  filterValues: JobFilterValues;
}
export default async function JobResults({ filterValues }: JobResultProps) {
  const { q, jobType, location, remote } = filterValues;
  const searchString = q
    ?.split(" ")
    .filter((word) => word.length > 0)
    .join(" & ");

  const searchFilter: Prisma.JobWhereInput = searchString
    ? {
        OR: [
          { title: { search: searchString } },
          { companyName: { search: searchString } },
          { jobType: { search: searchString } },
          { locationType: { search: searchString } },
          { location: { search: searchString } },
        ],
      }
    : {};

  const where: Prisma.JobWhereInput = {
    AND: [
      searchFilter,
      jobType ? { jobType } : {},
      location ? { location } : {},
      remote ? { locationType: "Remote" } : {},
      { approved: true },
    ],
  };
  const jobs = await prisma.job.findMany({
    where: where,
    orderBy: { createdAt: "desc" },
  });
  return (
    <div className="grow space-y-4">
      {jobs.map((job) => (
        <JobListItem key={job.id} job={job} />
      ))}
      {jobs.length === 0 && (
        <p className="text-center text-red-500">
          No Jobs found. Try adjusting your search filters
        </p>
      )}
    </div>
  );
}
