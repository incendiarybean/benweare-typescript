import React from "react";
import { BodyProps } from "@lib/types";
import { NewsCarousel, Footer, Card } from "../..";

function Component({ Icon, mobileMenu }: BodyProps) {
    return (
        <div className="select-none bg-gray-200 items-center flex flex-col w-full overflow-auto md:h-screen">
            <NewsCarousel
                Icon={Icon}
                Endpoint={"/api/news?outlet=pc"}
                SiteName="PCGamer"
                Disabled={mobileMenu}
            />
            <hr className="border-b border-slate-300 w-2/3 self-center lg:border-none" />
            <Card SiteName="NASA" Endpoint={"/api/news?outlet=nasa"} />
            <hr className="border-b border-slate-300 w-2/3 self-center lg:border-none" />
            <NewsCarousel
                Icon={Icon}
                Endpoint={"/api/news?outlet=bbc"}
                SiteName="BBC"
                Disabled={mobileMenu}
            />
            <hr className="border-b border-slate-300 w-2/3 self-center lg:border-none" />
            <Footer Icon={Icon} />
        </div>
    );
}

export default Component;
