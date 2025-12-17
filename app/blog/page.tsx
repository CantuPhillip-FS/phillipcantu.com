import Link from "next/link";

type Post = {
  path: string;
  title: string;
  subtitle: string;
};

const Blog = () => {
  const blogPosts: Post[] = [
    {
      path: "building-an-api-in-react",
      title: "Building an API in React.js",
      subtitle:
        "Creating and deploying a RESTful API full CRUD-based app in React.js from scratch, without the use of AI tab-completions, is a significant milestone for any web development student, and it's still a big task for senior devs.",
    },
    {
      path: "2025-React-Native-Install-Guide",
      title: "2025 React Native Install Guide",
      subtitle:
        "A Full and Complete Updated Guide on installing and creating a React Native mobile app on macOS Tahoe. Including how to use Nativewind or Tailwind CSS.",
    },
  ];

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-center text-3xl font-bold text-blue-400 mb-8">
        The Posts
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 max-w-5xl">
        {blogPosts.map((post) => (
          <Link key={post.title} href={`/blog/${post.path}`}>
            <article
              // key={post.title}
              className="
            bg-orange-400 hover:bg-orange-300 active:bg-orange-200 transition duration-300 
            shadow-lg shadow-orange-300/30 hover:shadow-orange-300/60
            py-8 px-4 rounded-xl 
            flex flex-col gap-4
            overflow-hidden
            max-h-60"
            >
              <h2 className="font-bold text-xl text-gray-950 text-center underline underline-offset-4">
                {post.title}
              </h2>
              <h3>
                <span className="text-gray-800 text-3xl font-bold">&#34;</span>
                {post.subtitle}
              </h3>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Blog;
