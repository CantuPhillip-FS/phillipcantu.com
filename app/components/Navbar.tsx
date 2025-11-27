import Link from "next/link";

type NavLinks = {
  path: string;
  slug: string;
};

const navlinks: NavLinks[] = [
  { path: "/", slug: "Home" },
  { path: "/blog", slug: "Blog" },
];

const Navbar = () => {
  return (
    <header className="p-4 flex gap-2 justify-center font-bold">
      {navlinks.map((page) => (
        <Link
          key={page.slug}
          href={page.path}
          className="transition-all hover:text-red-400"
        >
          {page.slug}
        </Link>
      ))}
    </header>
  );
};

export default Navbar;
