/**
 * Generated by orval v6.19.1 🍺
 * Do not edit manually.
 * api
 * surveys api
 * OpenAPI spec version: 0.1.0
 */
import type { YesNoFormFieldDefault } from "./yesNoFormFieldDefault";
import type { YesNoFormFieldDescription } from "./yesNoFormFieldDescription";

export interface YesNoFormField {
  /** Default value of the field. */
  default?: YesNoFormFieldDefault;
  /** Description of the field. */
  description?: YesNoFormFieldDescription;
  /** ID of the field. */
  id: string;
  /** Whether the field is required. */
  required: boolean;
  /** Title of the field. */
  title: string;
  /** Type of the field. */
  type?: string;
}
