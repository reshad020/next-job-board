import { jobTypes } from "@/lib/job-types";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import Select from "./ui/select";
import prisma from "@/lib/prisma";
import { Button } from "./ui/button";
import { redirect } from "next/navigation";
import { JobFilterValues, jobFilterSchema } from "@/lib/validation";
import FormSubmitButton from "./FormSubmitButton";
interface DefaultValueProps {
  defaultValues: JobFilterValues;
}
async function filterJob(formData: FormData) {
  "use server";
  const values = Object.fromEntries(formData.entries());
  const { q, location, jobType, remote } = jobFilterSchema.parse(values);
  const searchParams = new URLSearchParams({
    ...(q && { q: q.trim() }),
    ...(jobType && { jobType }),
    ...(location && { location }),
    ...(remote && { remote: "true" }),
  });
  redirect(`/?${searchParams.toString()}`);
}

export default async function JobSideBarFilter({
  defaultValues,
}: DefaultValueProps) {
  const locations = await prisma.job.findMany({
    where: { approved: true },
    select: { location: true },
    distinct: "location",
  });
  return (
    <aside className="sticky top-0 h-fit border-foreground bg-background p-2 md:w-[260px]">
      <form
        action={filterJob}
        className="space-y-4"
        key={JSON.stringify(defaultValues)}
      >
        <div className="flex flex-col gap-2">
          <Label htmlFor="q">Search</Label>
          <Input
            id="q"
            name="q"
            placeholder="title,company etc"
            defaultValue={defaultValues.q}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="jobType">Job Type</Label>
          <Select
            id="jobType"
            name="jobType"
            defaultValue={defaultValues.jobType}
          >
            <option value="">All Job Types</option>
            {jobTypes.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </Select>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="location">Location</Label>
          <Select
            id="location"
            name="location"
            defaultValue={defaultValues.location}
          >
            <option value="">All locations</option>
            {locations.map(
              (item) =>
                item.location && (
                  <option key={item.location}>{item.location}</option>
                ),
            )}
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <input
            id="remote"
            name="remote"
            className="scale-125 accent-black"
            type="checkbox"
            defaultChecked={defaultValues.remote}
          />
          <Label htmlFor="remote">Remote Jobs</Label>
        </div>
        {/* <Button className="w-full" type="submit">
          Filter Jobs
        </Button> */}
        <FormSubmitButton />
      </form>
    </aside>
  );
}
