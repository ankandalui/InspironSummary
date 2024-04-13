import React from "react";
import Image from "next/image";
import Loader from "./Loader";
type Props = {
  isFetching: any;
  error: any;
  article: any;
};

const Result = ({ isFetching, error, article }: Props) => {
  console.log(error,article)
  return (
    <>
      <div className="flex items-center justify-center max-w-full my-10">
        {isFetching ? ( 
         <Loader/>
        ) : error.isError ? (
          <p className="font-bold text-center text-black font-inter">
            Well, that was not supposed to happen...
            <br />
            <span className="font-normal text-red-700 font-satoshi">{article?.details}</span>
          </p>
        ) : (
          article?.summary && (
            <div className="flex flex-col gap-3">
              <h2 className="text-xl font-bold text-gray-600 font-satoshi">
                Article <span className="blue_gradient">Summary</span>
              </h2>
              <div className="p-3 overflow-auto summary_box max-h-64">
                <h2 className="text-sm font-medium text-gray-700 font-inter">{article?.title}</h2>
              </div>
              <div className="p-3 overflow-auto summary_box max-h-64">
                <p className="text-sm font-medium text-gray-700 font-inter">{article?.summary}</p>
              </div>
            </div>
          )
        )}
      </div>
    </>
  );
};

export default Result;
