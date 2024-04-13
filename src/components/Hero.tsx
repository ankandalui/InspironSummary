import React from "react";

type Props = {};

const Hero = (props: Props) => {
  return (
    <section className="flex-col w-full flex-center">
      <div className="container">
        <h1 className="text-center head_text ">
          Summarize Articles With
          <br className="" />
          <span className="text-center orange_gradient">Inspiron</span>
        </h1>
        <p className="text-center desc">
          Make your reading simpler using Inspiron, an open-source article summarizer that converts long articles into easily understandable summaries
        </p>
      </div>
    </section>
  );
};

export default Hero;
