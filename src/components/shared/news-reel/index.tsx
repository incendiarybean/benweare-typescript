import { NewsArticle, NewsCarousel } from "@lib/types";
import React, { createRef, useEffect, useState } from "react";
import { sleep } from "src/TS/utils";
import { Loader, Error } from "../..";
import { SwipeHandler } from "src/hooks/swipeHandler";

function Component({ Icon, Endpoint, SiteName, Disabled }: NewsCarousel) {
    const [articles, setArticles] = useState<NewsArticle[]>([]);
    const [articleChanged, setArticleChanged] = useState<boolean>(false);
    const [loaded, setLoaded] = useState<boolean | string>(false);
    const [articlePage, setArticlePage] = useState<number>(0);

    const handleRotation = (index: number) => {
        setArticleChanged(true);
        if (index === articles.length) {
            return setArticlePage(0);
        }
        if (index < 0) {
            return setArticlePage(articles.length - 1);
        }
        setArticlePage(index);
    };

    const swipeAction = (direction: any) => {
        if (direction) {
            return handleRotation(articlePage + 1);
        }
        return handleRotation(articlePage - 1);
    };

    const generateClassName = (index: number) => {
        const display = index === articlePage ? "flex " : "hidden ";
        const allowClick = Disabled ? "pointer-events-none " : "";
        const animateFirstRenderOnly =
            index === 0 && !articleChanged
                ? "animate__animated animate__fadeIn animate__faster "
                : "";

        return `${display}${allowClick}${animateFirstRenderOnly}`;
    };

    useEffect(() => {
        const getNews = async () => {
            fetch(Endpoint)
                .then((data) => data.json())
                .then((data) => {
                    setArticles(data);
                    setLoaded(true);
                })
                .catch((e) => {
                    setLoaded("Failed");
                    sleep(5000).then(getNews);
                });
        };

        getNews();
    }, [Endpoint, SiteName]);

    const navigationElement = createRef<HTMLDivElement>();
    SwipeHandler(navigationElement, swipeAction);

    return (
        <div
            ref={navigationElement}
            id={`${SiteName}-news`}
            className="px-2 md:px-6 my-3 w-full"
        >
            <div className="text-left flex flex-col w-full items-center justify-center md:p-4 md:border border-gray-300 rounded-xl">
                {loaded === true && articles && (
                    <div className="w-full">
                        {articles.map((data, index) => (
                            <a
                                key={`${data.site}-${index}`}
                                href={data.link}
                                rel="noreferrer"
                                target="_blank"
                                className={`${generateClassName(
                                    index
                                )}w-full rounded-xl flex-col xl:flex-row bg-white shadow-md transition-all duration-100 md:hover:scale-95 hover:bg-slate-100`}
                            >
                                <div className="p-2 flex-grow">
                                    <div
                                        className="rounded-t-xl w-full md:w-full xl:w-96 h-52 shadow-sm rounded-lg bg-cover"
                                        style={{
                                            backgroundImage: `url(${data.img})`,
                                        }}
                                    />
                                </div>

                                <div className="w-full xl:w-1/2 p-3 flex flex-col justify-between h-36 max-h-36 xl:h-auto xl:max-h-max">
                                    <h1 className="text-left text-sm xl:text-lg text-slate-700 font-bold leading-normal h-36 overflow-hidden">
                                        {data.title}
                                    </h1>
                                    <div className="flex flex-row">
                                        <button
                                            onClick={() =>
                                                window.open(data.link, "_blank")
                                            }
                                            className="block md:hidden transition-all duration-100 text-center mt-2 p-2 rounded-md text-white w-1/2 bg-gradient-to-r from-blue-700 to-blue-500 hover:shadow-md hover:from-blue-800 hover:to-blue-600"
                                        >
                                            Read Article
                                        </button>
                                        <div className="flex flex-col w-1/2 md:w-full">
                                            <h2 className="text-center text-xs mt-2 mb-2 text-blue-600 font-bold uppercase">
                                                {SiteName} Article
                                            </h2>
                                            <span className="self-center text-xs text-blue-700 -mt-2">
                                                {data.date}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        ))}
                        <div className="lg:px-4 w-full mt-2">
                            <div className="flex justify-center">
                                <div className="bg-white rounded-xl shadow-md flex w-full lg:w-1/2 p-2 justify-between h-12 lg:h-fit items-center">
                                    <button
                                        className="text-slate-500 border-slate-500 hover:text-blue-500 border hover:border-blue-500 w-6 h-6 rounded-xl duration-150 hover:scale-105 active:scale-95"
                                        onClick={() =>
                                            handleRotation(articlePage - 1)
                                        }
                                    >
                                        <Icon.LeftArrow />
                                    </button>
                                    {loaded &&
                                        articles.map((data, index) => (
                                            <button
                                                key={`${data.site}-${index}-navigator`}
                                                onClick={() =>
                                                    handleRotation(index)
                                                }
                                                className={`transition-all w-3 self-center duration-150 hover:scale-150 active:scale-125 ease-in-out rounded-md xl:p-1 ${
                                                    index === articlePage
                                                        ? "bg-blue-500 h-3"
                                                        : "bg-slate-300 h-2"
                                                } shadow`}
                                            />
                                        ))}
                                    <button
                                        className="text-slate-500 border-slate-500 hover:text-blue-500 border hover:border-blue-500 w-6 h-6 rounded-xl duration-150 hover:scale-105 active:scale-95"
                                        onClick={() =>
                                            handleRotation(articlePage + 1)
                                        }
                                    >
                                        <Icon.RightArrow />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {loaded === "Failed" && <Error />}
                {loaded === false && <Loader />}
            </div>
        </div>
    );
}

export default Component;
