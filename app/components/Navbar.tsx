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
          className="px-4 py-2 text-2xl transition-all duration-250 text-gray-600 hover:text-slate-200 hover:outline-2 outline-yellow-200 rounded-xl"
        >
          {page.slug}
        </Link>
      ))}
    </header>
  );
};

export default Navbar;
