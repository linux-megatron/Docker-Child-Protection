/* eslint-disable */
import { fromJS, Map, List } from "immutable";
import * as Actions from "./actions";

const DEFAULT_STATE = Map({ data: List([]) });

export const reducers = namespace => (
  state = DEFAULT_STATE,
  { type, payload }
) => {
  switch (type) {
    case `${namespace}/${Actions.RECORDS_STARTED}`:
      return state.set("loading", fromJS(payload)).set("errors", false);
    case `${namespace}/${Actions.RECORDS_FAILURE}`:
      return state.set("errors", true);
    case `${namespace}/${Actions.RECORDS_SUCCESS}`: {
      const { data, metadata } = payload;

      return state
        .update("data", u => {
          return fromJS(
            data.map(d => {
              const index = u.findIndex(r => r.get("id") === d.id);
              if (index >= 0) {
                return u.get(index).mergeDeep(d);
              }
              return d;
            })
          );
        })
        .set("metadata", fromJS(metadata));
    }
    case `${namespace}/${Actions.RECORDS_FINISHED}`:
      return state.set("loading", fromJS(payload));
    case `${namespace}/${Actions.RECORD}`:
      return state.set("loading", true);
    case `${namespace}/${Actions.RECORD_SUCCESS}`: {
      const { data } = payload;

      return state
        .update("data", u => {
          const index = u.findIndex(r => r.get("id") === data.id);

          if (index >= 0) {
            return u.mergeDeepIn([index], fromJS(data));
          }
          return u.push(fromJS(data));
        })
        .set("errors", false);
    }
    case `${namespace}/${Actions.RECORD_FAILURE}`:
      return state.set("errors", true);
    case `${namespace}/${Actions.RECORD_FINISHED}`:
      return state.set("loading", false);
    case `${namespace}/${Actions.HIDE_NAME_SUCCESS}`: {
      const { id, name } = payload.data;

      return state.setIn(
        ["data", state.get("data").findIndex(r => r.get("id") === id), "name"],
        name
      );
    }
    default:
      return state;
  }
};
