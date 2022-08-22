import React from "react";

/* TYPES FOR CLIENT */
export interface Icons {
    Home: React.FunctionComponent;
    Info: React.FunctionComponent;
    RightArrow: React.FunctionComponent;
    RightCornerArrow: React.FunctionComponent;
    LeftArrow: React.FunctionComponent;
    DownArrow: React.FunctionComponent;
    UpArrow: React.FunctionComponent;
    Burger: React.FunctionComponent;
    Packages: React.FunctionComponent;
    OpenBox: React.FunctionComponent;
    Box: React.FunctionComponent;
    Sun: React.FunctionComponent;
    LoaderSmall: React.FunctionComponent;
    Newspaper: React.FunctionComponent;
}

export interface NewsArticle {
    title: string;
    link: string;
    img: string;
    date: string;
    site: string;
}

export interface NasaArticle {
    copyright: string;
    date: string;
    explanation: string;
    hdurl: string;
    media_type: string;
    service_version: string;
    title: string;
    url: string;
}

export interface NewsResponse {
    nasa: NasaArticle;
    pc: NewsArticle[];
    bbc: NewsArticle[];
}

export interface NewsCarousel {
    Icon: Icons;
    Endpoint: string;
    SiteName: string;
    Disabled: boolean;
}

export interface NewsCard {
    SiteName: string;
    Endpoint: string;
}

export interface NavbarProps {
    Icon: Icons;
    mobileMenu: boolean;
    setMobileMenu: React.Dispatch<boolean>;
}

export interface IconProps {
    Icon: Icons;
}

export interface BodyProps {
    Icon: Icons;
    mobileMenu: boolean;
}

/* TYPES FOR SERVER */
export interface WeatherFeatures {
    type: string;
    geometry: { type: string; coordinates: number[] };
    properties: {
        location: { name: string };
        requestPointDistance: number;
        modelRunDate: string;
        timeSeries: WeatherTimeSeries[];
    };
}

export interface WeatherTimeSeries {
    [key: string]: number | string;
}

export interface WeatherParam {
    [key: string]: {
        type: string;
        description: string;
        unit: {
            label: string;
            symbol: {
                value: string;
                type: string;
            };
        };
    };
}

export interface WeatherResponse {
    location: string;
    days: WeatherTimeSeries[];
    day: WeatherTimeSeries;
    type?: string;
    features?: WeatherFeatures[];
    parameters?: WeatherParam[];
}

export interface WeatherAxiosResponse {
    status: string;
    httpMessage: string;
    data: WeatherResponse;
}

export interface WeatherStorage {
    timestamp: string | null;
    data: {
        day: WeatherTimeSeries | null;
        days: WeatherTimeSeries[] | null;
        location: string | null;
    };
}

export interface WeatherConfig {
    method: string;
    url: string;
    qs: {
        [key: string]: string;
    };
    headers: {
        [key: string]: string;
    };
}

export interface NewsArticle {
    [key: string]: string;
}

export interface NasaArticle {
    [key: string]: string;
}

export interface NewsStorage {
    timestamp: string | null;
    data: {
        bbc: NewsArticle[] | null;
        pc: NewsArticle[] | null;
        nasa: NasaArticle | null;
    };
}
