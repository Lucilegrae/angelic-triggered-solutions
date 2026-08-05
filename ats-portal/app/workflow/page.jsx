import { atsWorkflowRouter } from "../workflows/router";
import { redirect } from "next/navigation";

export default async function WorkflowEntry() {
  const result = await atsWorkflowRouter();
  redirect(result.redirect);
}
