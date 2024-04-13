import Summarizer from "@components/Summarizer";
import React from "react";

type Props = {};

const Summary = (props: Props) => {
  return (
    <section className="flex-col w-full flex-center">
      <div className="container">
        <h1 className="text-center head_text">
          Summarize Text
          <br className="max-md:hidden" />
          <span className="text-center orange_gradient">Some intresting description</span>
        </h1>
        <p className="w-full max-w-full text-center desc">
          Shortly is an open-source link management tool for anyone to create, share, and track short links.
        </p>
        <Summarizer />
      </div>
    </section>
  );
};

export default Summary;
