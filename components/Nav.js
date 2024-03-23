import Link from 'next/link';
import NavStyles from './styles/NavStyles';
import { useUser } from './User';
import Signout from './Signout';

export default function Nav() {
  const user = useUser();
  console.log('USER', user);

  return (
    <NavStyles>
      <Link href="/products">Products</Link>
      {user && (
        <>
          <Link href="/sell">Sell</Link>
          <Link href="/orders">Orders</Link>
          <Link href="/account">Account</Link>
          <Signout />
        </>
      )}
      {!user && (
        <>
          <Link href="/signin">Sign In</Link>
        </>
      )}
    </NavStyles>
  );
}
