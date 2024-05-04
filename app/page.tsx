import JobResults from "@/components/JobResults";
import JobSideBarFilter from "@/components/JobSidebarFilter";
import H1 from "@/components/ui/h1";
import { JobFilterValues } from "@/lib/validation";
interface PageProps {
  searchParams: {
    q?: string;
    location?: string;
    jobType?: string;
    remote?: string;
  };
}
export default async function Home({
  searchParams: { q, location, jobType, remote },
}: PageProps) {
  const filterValues: JobFilterValues = {
    q,
    location,
    jobType,
    remote: remote === "true",
  };
  return (
    <main className="mx-auto my-10 max-w-5xl">
      <div className="my-5">
        <H1 className="text-center ">Developer Jobs</H1>
      </div>
      <section className="flex flex-col gap-2 md:flex-row">
        <JobSideBarFilter defaultValues={filterValues} />
        <JobResults filterValues={filterValues} />
      </section>
    </main>
  );
}
