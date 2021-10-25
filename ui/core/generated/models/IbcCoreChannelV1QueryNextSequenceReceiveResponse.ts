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
  HeightAtWhichTheProofWasRetrieved,
  HeightAtWhichTheProofWasRetrievedFromJSON,
  HeightAtWhichTheProofWasRetrievedFromJSONTyped,
  HeightAtWhichTheProofWasRetrievedToJSON,
} from "./";

/**
 *
 * @export
 * @interface IbcCoreChannelV1QueryNextSequenceReceiveResponse
 */
export interface IbcCoreChannelV1QueryNextSequenceReceiveResponse {
  /**
   *
   * @type {string}
   * @memberof IbcCoreChannelV1QueryNextSequenceReceiveResponse
   */
  nextSequenceReceive?: string;
  /**
   *
   * @type {string}
   * @memberof IbcCoreChannelV1QueryNextSequenceReceiveResponse
   */
  proof?: string;
  /**
   *
   * @type {HeightAtWhichTheProofWasRetrieved}
   * @memberof IbcCoreChannelV1QueryNextSequenceReceiveResponse
   */
  proofHeight?: HeightAtWhichTheProofWasRetrieved;
}

export function IbcCoreChannelV1QueryNextSequenceReceiveResponseFromJSON(
  json: any,
): IbcCoreChannelV1QueryNextSequenceReceiveResponse {
  return IbcCoreChannelV1QueryNextSequenceReceiveResponseFromJSONTyped(
    json,
    false,
  );
}

export function IbcCoreChannelV1QueryNextSequenceReceiveResponseFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): IbcCoreChannelV1QueryNextSequenceReceiveResponse {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    nextSequenceReceive: !exists(json, "next_sequence_receive")
      ? undefined
      : json["next_sequence_receive"],
    proof: !exists(json, "proof") ? undefined : json["proof"],
    proofHeight: !exists(json, "proof_height")
      ? undefined
      : HeightAtWhichTheProofWasRetrievedFromJSON(json["proof_height"]),
  };
}

export function IbcCoreChannelV1QueryNextSequenceReceiveResponseToJSON(
  value?: IbcCoreChannelV1QueryNextSequenceReceiveResponse | null,
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    next_sequence_receive: value.nextSequenceReceive,
    proof: value.proof,
    proof_height: HeightAtWhichTheProofWasRetrievedToJSON(value.proofHeight),
  };
}