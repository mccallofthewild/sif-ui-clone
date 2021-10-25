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
/**
 *
 * @export
 * @interface DistributionIncentivesByThirdPartyRewardsAreDistributedToLockupsThatAreAreReturnedByAtLeastOneOfTheseQueries
 */
export interface DistributionIncentivesByThirdPartyRewardsAreDistributedToLockupsThatAreAreReturnedByAtLeastOneOfTheseQueries {
  /**
   *
   * @type {string}
   * @memberof DistributionIncentivesByThirdPartyRewardsAreDistributedToLockupsThatAreAreReturnedByAtLeastOneOfTheseQueries
   */
  lockQueryType?: DistributionIncentivesByThirdPartyRewardsAreDistributedToLockupsThatAreAreReturnedByAtLeastOneOfTheseQueriesLockQueryTypeEnum;
  /**
   *
   * @type {string}
   * @memberof DistributionIncentivesByThirdPartyRewardsAreDistributedToLockupsThatAreAreReturnedByAtLeastOneOfTheseQueries
   */
  denom?: string;
  /**
   *
   * @type {string}
   * @memberof DistributionIncentivesByThirdPartyRewardsAreDistributedToLockupsThatAreAreReturnedByAtLeastOneOfTheseQueries
   */
  duration?: string;
  /**
   *
   * @type {Date}
   * @memberof DistributionIncentivesByThirdPartyRewardsAreDistributedToLockupsThatAreAreReturnedByAtLeastOneOfTheseQueries
   */
  timestamp?: Date;
}

/**
 * @export
 * @enum {string}
 */
export enum DistributionIncentivesByThirdPartyRewardsAreDistributedToLockupsThatAreAreReturnedByAtLeastOneOfTheseQueriesLockQueryTypeEnum {
  ByDuration = "ByDuration",
  ByTime = "ByTime",
}

export function DistributionIncentivesByThirdPartyRewardsAreDistributedToLockupsThatAreAreReturnedByAtLeastOneOfTheseQueriesFromJSON(
  json: any,
): DistributionIncentivesByThirdPartyRewardsAreDistributedToLockupsThatAreAreReturnedByAtLeastOneOfTheseQueries {
  return DistributionIncentivesByThirdPartyRewardsAreDistributedToLockupsThatAreAreReturnedByAtLeastOneOfTheseQueriesFromJSONTyped(
    json,
    false,
  );
}

export function DistributionIncentivesByThirdPartyRewardsAreDistributedToLockupsThatAreAreReturnedByAtLeastOneOfTheseQueriesFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): DistributionIncentivesByThirdPartyRewardsAreDistributedToLockupsThatAreAreReturnedByAtLeastOneOfTheseQueries {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    lockQueryType: !exists(json, "lock_query_type")
      ? undefined
      : json["lock_query_type"],
    denom: !exists(json, "denom") ? undefined : json["denom"],
    duration: !exists(json, "duration") ? undefined : json["duration"],
    timestamp: !exists(json, "timestamp")
      ? undefined
      : new Date(json["timestamp"]),
  };
}

export function DistributionIncentivesByThirdPartyRewardsAreDistributedToLockupsThatAreAreReturnedByAtLeastOneOfTheseQueriesToJSON(
  value?: DistributionIncentivesByThirdPartyRewardsAreDistributedToLockupsThatAreAreReturnedByAtLeastOneOfTheseQueries | null,
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    lock_query_type: value.lockQueryType,
    denom: value.denom,
    duration: value.duration,
    timestamp:
      value.timestamp === undefined ? undefined : value.timestamp.toISOString(),
  };
}