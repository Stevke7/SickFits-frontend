import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import Form from './styles/Form';
import useForm from '../lib/useForm';
import { CURRENT_USER_QUERY } from './User';
import Error from './ErrorMessage';

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $name: String!
    $password: String!
  ) {
    createUser(data: { email: $email, name: $name, password: $password }) {
      id
      email
      name
    }
  }
`;

export default function SignUp() {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
    name: '',
  });

  const [signup, { data, loading, error }] = useMutation(SIGNUP_MUTATION, {
    variables: inputs,
  });

  async function handleSubmit(e) {
    e.preventDefault(); // Stop the form from submiting
    // Send data to GraphQL API
    const res = await signup().catch(console.error);
    console.log('signup res', res);
    resetForm();
    console.log('all data', { data, loading, error });
  }

  // Todo ADD SOME KIND OF TOASTR MESSAGE FOR SIGNED UP USER
  return (
    // eslint-disable-next-line react/jsx-no-bind
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Sgin Up for an Account</h2>
      <Error error={error} />
      <fieldset>
        {data?.createUser && (
          <p>
            Signed Up with {data.createUser.email} - Please Go Ahed and Sign In
          </p>
        )}
        <label htmlFor="email">
          Your name
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            autoComplete="name"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            placeholder="Your Email address"
            autoComplete="email"
            value={inputs.email}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="password">
          Email
          <input
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="password"
            value={inputs.password}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Sign Up!</button>
      </fieldset>
    </Form>
  );
}
