"use client";
import Image from "next/image";
import React from "react";
import History from "@components/History";
import Result from "@components/Result";
import { IoLinkSharp } from "react-icons/io5";
import { IoReturnDownBackSharp } from "react-icons/io5";
import Toast, { ToastList } from "./Toaster/Toaster";

type Props = {};

const Summarizer = (props: Props) => {
  const [article, setArticle] = React.useState({
    url: "",
    summary: "",
    images: [],
    title: "",
    details: "",
  });
  const [allArticles, setAllArticles] = React.useState<any>([]);
  const [copied, setCopied] = React.useState<any>("");
  const [loading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  let toastList: ToastList[] = [];

  React.useEffect(() => {
    const articlesFromLocalStorage: any = JSON.parse(localStorage.getItem("articles")!);
    if (articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage);
    }
  }, []);

  const handleSubmit = async (e: any) => {
    setIsLoading(true);
    // Fetch summary
    e.preventDefault();
    const existingArticle = allArticles.find((item: any) => item.url === article.url);

    if (existingArticle) {
      setIsLoading(false);
      return setArticle(existingArticle);
    }
    try {
      const response = await fetch("/api/extract", {
        method: "POST",
        body: JSON.stringify({
          url: article.url,
        }),
      });
      const data = await response.json();
      if (data.status === "COMPLETE" && data.status_code === 200) {
        setIsLoading(false);
        setError(false);
        const newArticle = {
          ...article,
          summary: data.text,
          images: data.images,
          title: data.title,
        };
        const updatedAllArticles = [newArticle, ...allArticles];
        setArticle(newArticle);
        setAllArticles(updatedAllArticles);
        localStorage.setItem("articles", JSON.stringify(updatedAllArticles));
      } else {
        setIsLoading(false);
        setError(true);
        const newArticle = {
          ...article,
          details: data.details ? data.details : "",
        };
        setArticle(newArticle);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };
  const handleKeyDown = (e: any) => {
    if (e.keyCode === 13) {
      handleSubmit(e);
    }
  };

  // copy the url and toggle the icon for user feedback
  const handleCopy = (copyUrl: string) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => setCopied(false), 3000);
  };
  const deleteItem = (url: any) => {
    const updatedAllArticles = allArticles.filter((item: any) => item.url !== url);
    setAllArticles(updatedAllArticles);
    localStorage.setItem("articles", JSON.stringify(updatedAllArticles));
    toastList.push({
      title: "Success",
      description: "Removed item",
      type: "success",
    });
  };
  return (
    <>
      <section className="w-full max-w-full mt-16 ">
        <div className="flex flex-col gap-2 w-ful">
          <form className="relative flex items-center justify-center" onSubmit={handleSubmit}>
            {/* <Image src="/assets/link.svg" width={30} height={30} alt="logo" className="absolute left-0 object-contain w-5 my-2 ml-3" /> */}
            <IoLinkSharp className="absolute left-0 object-contain w-5 my-2 ml-3" />
            <input
              type="url"
              placeholder="Paste the article link"
              value={article.url}
              onChange={(e) => setArticle({ ...article, url: e.target.value })}
              onKeyDown={handleKeyDown}
              required
              className="url_input peer"
            // When you need to style an element based on the state of a sibling element, mark the sibling with the peer class, and use peer-* modifiers to style the target element
            />
            <button type="submit" disabled={loading} className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700">
              <p>
                <IoReturnDownBackSharp />
              </p>
            </button>
          </form>

          {Boolean(!loading) ? (
            <History allArticles={allArticles} setArticle={setArticle} copied={copied} handleCopy={handleCopy} deleteItem={deleteItem} />
          ) : (
            ""
          )}
        </div>
        <Result isFetching={loading} error={{ isError: error, message: article.details }} article={article} />
        <Toast toastList={toastList} position="top-center" />
      </section>
    </>
  );
};

export default Summarizer;
