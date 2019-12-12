export function addRequest(data) {
  return {
    type: '@plan/ADD_REQUEST',
    payload: { data },
  };
}

export function addRequestSuccess(data) {
  return {
    type: '@plan/ADD_REQUEST_SUCCESS',
    payload: { data },
  };
}

export function updateRequest(data, id) {
  return {
    type: '@plan/UPDATE_REQUEST',
    payload: { data, id },
  };
}

export function updateRequestSuccess(data) {
  return {
    type: '@plan/UPDATE_REQUEST_SUCCESS',
    payload: { data },
  };
}

export function failure() {
  return {
    type: '@plan/FAILURE',
  };
}
