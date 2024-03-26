import { Suspense } from 'react'
import Header from "~/app/Header";
// import { useEffect } from 'react'
// import Hero from "~/app/_components/Hero";
// import Problem from "~/app/_components/Problem";
// import FeaturesAccordion from "~/app/_components/FeaturesAccordion";
// import Pricing from "~/app/_components/Pricing";
// import FAQ from "~/app/_components/FAQ";
// import CTA from "~/app/_components/CTA";
// import Footer from "~/app/_components/Footer";


export default function Home() {
  return (
    <>
      <Suspense>
        <Header />
      </Suspense>
    </>
  )
}
