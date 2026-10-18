type EventCutoffFields = {
  startDate: string;
  editCutoff?: string | null;
  cancelCutoff?: string | null;
};

/**
 * The moment after which a signup can no longer be edited.
 *
 * `editCutoff` is optional in the CMS, so an empty value falls back to the
 * event's start date.
 */
export function resolveEditCutoff(event: EventCutoffFields): Date {
  return new Date(event.editCutoff || event.startDate);
}

/**
 * The moment after which a signup can no longer be cancelled.
 *
 * Falls back through `cancelCutoff` -> `editCutoff` -> `startDate`.
 */
export function resolveCancelCutoff(event: EventCutoffFields): Date {
  return event.cancelCutoff ? new Date(event.cancelCutoff) : resolveEditCutoff(event);
}

export function isPastCutoff(cutoff: Date, now: Date = new Date()): boolean {
  return now.getTime() > cutoff.getTime();
}
