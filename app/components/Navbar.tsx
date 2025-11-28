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
          className="text-2xl transition-all duration-350 hover:text-slate-400 hover:underline underline-offset-4"
        >
          {page.slug}
        </Link>
      ))}
    </header>
  );
};

export default Navbar;
