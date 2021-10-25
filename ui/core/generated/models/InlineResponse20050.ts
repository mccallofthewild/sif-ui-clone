/* tslint:disable */
/* eslint-disable */
/**
 * Sifchain - gRPC Gateway docs
 * A REST interface for state queries, legacy transactions
 *
 * The version of the OpenAPI document: 1.0.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from "../runtime";
import {
  InlineResponse20050Params,
  InlineResponse20050ParamsFromJSON,
  InlineResponse20050ParamsFromJSONTyped,
  InlineResponse20050ParamsToJSON,
} from "./";

/**
 * QueryParamsResponse is the response type for the Query/Params RPC method.
 * @export
 * @interface InlineResponse20050
 */
export interface InlineResponse20050 {
  /**
   *
   * @type {InlineResponse20050Params}
   * @memberof InlineResponse20050
   */
  params?: InlineResponse20050Params;
}

export function InlineResponse20050FromJSON(json: any): InlineResponse20050 {
  return InlineResponse20050FromJSONTyped(json, false);
}

export function InlineResponse20050FromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): InlineResponse20050 {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    params: !exists(json, "params")
      ? undefined
      : InlineResponse20050ParamsFromJSON(json["params"]),
  };
}

export function InlineResponse20050ToJSON(
  value?: InlineResponse20050 | null,
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    params: InlineResponse20050ParamsToJSON(value.params),
  };
}