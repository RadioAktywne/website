/**
 * Generated by orval v6.19.1 🍺
 * Do not edit manually.
 * api
 * surveys api
 * OpenAPI spec version: 0.1.0
 */
import type { DateFormFieldDefault } from "./dateFormFieldDefault";
import type { DateFormFieldDescription } from "./dateFormFieldDescription";

export interface DateFormField {
  /** Default value of the field. */
  default?: DateFormFieldDefault;
  /** Description of the field. */
  description?: DateFormFieldDescription;
  /** ID of the field. */
  id: string;
  /** Whether the field is required. */
  required: boolean;
  /** Title of the field. */
  title: string;
  /** Type of the field. */
  type?: string;
}