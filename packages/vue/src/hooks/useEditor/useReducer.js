import { ref } from "vue";

export default function (reducer, initialState) {
  const status = ref(initialState);

  const dispatch = (action) => {
    status.value = reducer(status.value, action);
  };

  return [status, dispatch];
}
