import _ from 'lodash';

export const getValueFromKey = (
  object: Record<string, unknown>,
  key: string,
) => {
  let r = object[key];

  if (_.isUndefined(r)) {
    Object.entries(object)
      .filter(arr => _.isObject(arr[1]) && !_.isArray(arr[1]) && !_.isNil(arr[1]))
      .forEach((arr) => {
        const m = getValueFromKey(arr[1] as Record<string, unknown>, key);
        r = m ?? r;
      });
  }

  return r;
};

export const extractDataFromArray = (
  arr: Array<Record<string, unknown>>,
  key: string,
) => arr.map(e => getValueFromKey(e, key));
