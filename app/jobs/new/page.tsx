import { Metadata } from "next";
import NewJobForm from "./NewJobForm";

export const metadata: Metadata = {
  title: "Post a new job",
  description: "Hire from the developers in the world",
};
export default function Page() {
  return <NewJobForm />;
}
