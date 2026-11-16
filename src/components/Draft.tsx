// Yellow tag on copy Owen hasn't signed off yet (UI_RULES 21.4). Remove once he has.
export function Draft({ what = "this list" }: { what?: string }) {
  return <span className="draft">Draft: for Owen to confirm {what}</span>;
}
