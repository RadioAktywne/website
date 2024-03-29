/**
 * Generated by orval v6.19.1 🍺
 * Do not edit manually.
 * api
 * surveys api
 * OpenAPI spec version: 0.1.0
 */
import type { FormPagerEntries } from "./formPagerEntries";

/**
 * The pager for the forms.
 */
export interface ListResponsePager {
  entries: FormPagerEntries;
  /** Number of forms per page. */
  limit: number;
  /** Offset of the first form in the page. */
  start: number;
  /** Total number of forms. */
  total: number;
}
