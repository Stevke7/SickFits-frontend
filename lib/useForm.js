import { func, object } from 'prop-types';
import { useState } from 'react';

// This is a custom hook for setting state of inputs, clearing form and reseting form

export default function useForm(initial = {}) {
  // create state object for inputs
  const [inputs, setInputs] = useState(initial);

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
