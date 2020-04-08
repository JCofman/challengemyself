import { useEffect, useReducer } from 'preact/hooks';
import firebase from './useAuth';

const fetchDatabaseEntryReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_DATABASE_ENTRY_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case 'FETCH_DATABASE_ENTRY_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case 'FETCH_DATABASE_ENTRY_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      throw new Error(
        `Something during fetching the data went wrong ${action}`
      );
  }
};

export const useDatabaseEntry = (entry) => {
  if (!entry) return;
  const [state, dispatch] = useReducer(fetchDatabaseEntryReducer, {
    isLoading: false,
    isError: false,
    data: [],
  });

  useEffect(() => {
    dispatch({ type: 'FETCH_DATABASE_ENTRY_INIT' });

    const ref = firebase.database().ref(entry);

    ref.on(
      'value',
      (snapshot) => {
        const array = [];
        // For each data in the entry
        snapshot.forEach((el) => {
          // Push the object to the array
          // If you also need to store the unique key from firebase,
          // You can use array.push({ ...el.val(), key: el.key });
          array.push(el.val());
        });
        dispatch({ type: 'FETCH_DATABASE_ENTRY_SUCCESS', payload: array });
      },
      () => {
        dispatch({ type: 'FETCH_DATABASE_ENTRY_FAILURE' });
      }
    );
    // Clean-up function
    return () => ref.off('value');
  }, [entry]);

  return state;
};
