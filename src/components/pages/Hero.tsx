import Image from "next/image"
import HeroImage from '/public/hero.png'
export const Hero = () => {
  return (
    <section className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-20 lg:items-start px-8 py-8 lg:py-20">
        <div className="flex flex-col gap-10 lg:gap-14 items-center justify-center text-center lg:text-left lg:items-start">
          <h1 className="font-extrabold text-4xl lg:text-6xl tracking-tight md:-mb-4 flex flex-col gap-3 items-center lg:items-start">Startup your SaaS in days, not weeks.</h1>
          <p className="text-lg opacity-80 leading-relaxed">The SaasFa with all you need to build SaaS, or any other web app. Make you from idea to production in 5 minutes.</p>
          <button className="btn btn-primary group btn-wide">
            <span className="w-5 h-5 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-200 ease-in-out flex items-center">⚡️</span>
            Get SaasFa
          </button>
        </div>
        <div className="relative max-md:-m-4 lg:w-full">
          <Image src={HeroImage} width={570} height={400} alt="hero" className=" max-w-xl rounded-lg shadow-2xl" />
        </div>
    </section>
  )
}
