import Image from "next/image";

const Hero = () => {
  return (
    <section className="max-w-5xl mx-auto flex flex-col-reverse md:grid md:grid-cols-3 gap-8 items-center">
      <div className="md:col-span-2 space-y-4">
        <div className="flex flex-col items-center md:grid gap-1">
          <h2 className="font-bold text-2xl text-orange-400">Phillip Cantu</h2>
          <p className="text-sm text-slate-400">
            Full Stack Developer | Full Sail University
          </p>
          <p className="space-x-2 text-sm text-blue-400 md:indent-2">
            <span className="transition duration-300 hover:text-slate-100 active:text-slate-100">
              &#8594;
              <a
                href="https://linkedin.com/in/phillipcantu"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </span>
            <span className="transition duration-300 hover:text-slate-100 active:text-slate-100">
              &#8594;
              <a
                href="https://github.com/hereisphil"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </span>
          </p>
        </div>
        <p>
          Hi. I&#39;m a full-stack web developer, a graduate of 4Geeks
          Academy&#39;s Fullstack + AI bootcamp, and I&#39;m currently attending
          Full Sail University with an expected graduation in February 2027.
          I&#39;m from Arizona and I&#39;m a U.S. Army veteran.
        </p>
      </div>
      <div className="max-w-60 border-8 border-slate-200 rounded-full md:opacity-60 transition duration-300 hover:opacity-100 grid">
        <Image
          src="/profile/phillip-cantu-01.jpeg"
          width={2160}
          height={2160}
          preload={true}
          alt="Phillip Vincent Cantu fullstack web developer and full sail university student profile photo"
          className="rounded-full"
        />
      </div>
    </section>
  );
};

export default Hero;
