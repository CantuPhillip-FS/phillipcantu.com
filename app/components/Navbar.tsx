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
    <>
      <header className="p-4 flex flex-col items-center">
        <nav className="flex gap-2 justify-center font-bold">
          {navlinks.map((page) => (
            <Link
              key={page.slug}
              href={page.path}
              className="px-4 py-2 text-2xl transition-all duration-300 text-slate-500 hover:text-slate-200 hover:outline-2 active:text-slate-200 active:outline-2 outline-blue-400 rounded-xl"
            >
              {page.slug}
            </Link>
          ))}
        </nav>
      </header>
      <hr className="border border-slate-500 w-full max-w-lg mb-4 mx-auto" />
    </>
  );
};

export default Navbar;
