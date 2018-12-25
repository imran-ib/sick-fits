import Link from "next/link";

const Nav = () => (
  <div>
    <Link href="/">
      <a>Home</a>
    </Link>

    <Link href="/sell">
      <a>Shop</a>
    </Link>
  </div>
);

export default Nav;
