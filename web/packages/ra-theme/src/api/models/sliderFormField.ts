/**
 * Generated by orval v6.19.1 🍺
 * Do not edit manually.
 * api
 * surveys api
 * OpenAPI spec version: 0.1.0
 */
import type { SliderFormFieldDefault } from "./sliderFormFieldDefault";
import type { SliderFormFieldDescription } from "./sliderFormFieldDescription";

export interface SliderFormField {
  /** Default value of the field. */
  default?: SliderFormFieldDefault;
  /** Description of the field. */
  description?: SliderFormFieldDescription;
  /** ID of the field. */
  id: string;
  /** Maximum value of the field. */
  max: number;
  /** Minimum value of the field. */
  min: number;
  /** Whether the field is required. */
  required: boolean;
  /** Step of the field. */
  step: number;
  /** Title of the field. */
  title: string;
  /** Type of the field. */
  type?: string;
}
