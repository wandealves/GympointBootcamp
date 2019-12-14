export function updateRequest(data) {
  return {
    type: '@help_order/UPDATE_REQUEST',
    payload: { data },
  };
}

export function updateRequestSuccess(data) {
  return {
    type: '@help_order/UPDATE_REQUEST_SUCCESS',
    payload: { data },
  };
}

export function failure() {
  return {
    type: '@help_order/FAILURE',
  };
}
