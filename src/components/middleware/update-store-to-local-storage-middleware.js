const UpdateStoreToLocalStorageMiddleware = (store) => (next) => (action) => {
  window.localStorage.setItem('store',JSON.stringify(store.getState()))
  return next(action);    // 执行下一步
}

export default UpdateStoreToLocalStorageMiddleware