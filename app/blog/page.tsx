import Link from "next/link";

type Post = {
  path: string;
  title: string;
  subtitle: string;
};

const Blog = () => {
  const blogPosts: Post[] = [
    {
      path: "my-first-blog-post",
      title: "Hi. - first blog post",
      subtitle: "a simple intro",
    },
    {
      path: "#",
      title: "Test Title A",
      subtitle:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut urna eros, eleifend vel turpis a, feugiat condimentum nisl. Vivamus ac molestie ante. Etiam mollis ex id nisl vulputate, sed lacinia augue cursus. Curabitur dignissim risus non magna viverra pellentesque. Mauris placerat ornare erat molestie porttitor. Nulla molestie nunc a tristique accumsan. Fusce vitae libero scelerisque, tincidunt neque maximus, faucibus dolor. Mauris et arcu tincidunt neque imperdiet placerat. Vivamus non molestie eros, ut laoreet erat. Ut consectetur at velit vitae congue. Cras mattis nulla ac porta tincidunt. Mauris nibh massa, faucibus eu nulla vitae, lacinia bibendum velit.",
    },
    {
      path: "#",
      title: "Test Title B",
      subtitle:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ullamcorper blandit quam at fermentum. Etiam lobortis nec elit sed consectetur. Nullam et mi commodo, ultrices nibh quis, sagittis turpis. Aliquam rhoncus nibh laoreet congue cursus. Sed sed dui feugiat, cursus nisl vitae, molestie quam. Mauris nec lorem sit amet diam tristique interdum vel at nulla. Nam porttitor lectus eros, quis interdum purus dictum vel. Aenean ipsum dui, bibendum sit amet ante bibendum, volutpat volutpat purus. Etiam dapibus mi id varius hendrerit. Mauris sed orci nisl. Phasellus iaculis massa ut neque fringilla imperdiet. Curabitur quis quam in enim laoreet porttitor eu sit amet magna. Vivamus quis tortor tincidunt, tincidunt turpis ac, sodales sem. Donec maximus ligula pharetra, efficitur dui at, maximus ligula. Aenean feugiat ex enim, feugiat porttitor sapien euismod sit amet. Morbi elementum, diam a lacinia aliquet, magna odio venenatis nibh, vitae fermentum arcu ante dictum nunc. Sed consequat leo libero. Cras non ante eu nisi iaculis tincidunt. Nunc maximus nisl ac mi condimentum, et imperdiet ipsum iaculis. Suspendisse potenti. Curabitur non purus libero. Nulla lacinia, nibh vel imperdiet iaculis, libero ante congue velit, nec lobortis purus nunc ac eros. Proin vitae suscipit tellus, id euismod purus. Nulla sollicitudin sed nisl vitae imperdiet.",
    },
  ];

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-center text-3xl font-bold text-blue-400 mb-8">
        The Posts
      </h1>
      <div className="grid grid-cols-3 gap-8 max-w-5xl">
        {blogPosts.map((post) => (
          <article
            key={post.title}
            className="
            bg-orange-400/50 hover:bg-orange-400 transition duration-300 
            shadow-lg shadow-orange-300/30 hover:shadow-orange-300/60
            py-8 px-4 rounded-xl 
            flex flex-col gap-4
            overflow-hidden
            max-h-60"
          >
            <h2 className="font-bold text-xl text-gray-950">
              <Link href={`blog/${post.path}`}>&#8594;{post.title}</Link>
            </h2>
            <h3>
              <Link href={`blog/${post.path}`}>{post.subtitle}</Link>
            </h3>
            <p className="tx-sm text-gray-300 text-center">
              <em>p.s. this is the only linked/viewable blog post</em>
            </p>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Blog;
