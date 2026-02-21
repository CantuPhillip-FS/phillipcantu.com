type ResponsiveYouTubeProps = {
  videoId: string;
  title: string;
};

export default function ResponsiveYouTube({
  videoId,
  title,
}: ResponsiveYouTubeProps) {
  return (
    <div className="my-8">
      <div className="relative w-full aspect-video">
        <iframe
          className="absolute inset-0 w-full h-full rounded-lg shadow-lg"
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
      <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
        <a
          href={`https://www.youtube.com/watch?v=${videoId}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Watch the full video tutorial on YouTube
        </a>
      </p>
    </div>
  );
}
