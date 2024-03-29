import { func, object } from 'prop-types';
import { useEffect, useState } from 'react';

// This is a custom hook for setting state of inputs, clearing form and reseting form

export default function useForm(initial = {}) {
  // create state object for inputs
  const [inputs, setInputs] = useState(initial);
  // Get object values, turn them into array and join them into string
  const initialValues = Object.values(initial).join('');

  useEffect(() => {
    // This function runs when the things we are watching change
    setInputs(initial);
  }, [initialValues]);

  // {
  //     name: 'Ljube',
  //     description: 'nice shoes',
  //     price: 1000
  // }

  function handleChange(e) {
    let { value, name, type } = e.target;
    if (type === 'number') {
      value = parseInt(value);
    }
    if (type === 'file') {
      [value] = e.target.files;
    }
    setInputs({
      // copy existing state
      ...inputs,
      [name]: value,
    });
  }

  function resetForm() {
    setInputs(initial);
  }

  function clearForm() {
    // First turn it into an array then map over it and set its values to null then turn it into object again using Object.formEntries
    const blankState = Object.fromEntries(
      Object.entries(inputs).map(([key, value]) => [key, ''])
    );
    setInputs(blankState);
  }

  return {
    inputs,
    handleChange,
    resetForm,
    clearForm,
  };
}
