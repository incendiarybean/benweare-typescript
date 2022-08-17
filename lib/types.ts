import React from "react";

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
}

export interface Notification {
    custom: Function;
    error: Function;
    success: Function;
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

export interface NewsCard {
    SiteName: string;
    Endpoint: string;
}

export interface NewsCarousel {
    Icon: Icons;
    Endpoint: string;
    MockData: NewsArticle[];
    SiteName: string;
    Disabled: boolean;
}

export interface NewsArticle {
    title: string;
    link: string;
    img: string;
    date: string;
    site: string;
}

export interface NewsResponse {
    nasa: NasaArticle;
    gaming: NewsArticle[];
    news: NewsArticle[];
}

export interface News {
    GamingArticles: HTMLElement[];
    NasaArticles: NasaArticle;
    NewsArticles: HTMLElement[];
    Loaded: boolean;
}

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
    time: string;
    midnight10MWindSpeed: number;
    midnight10MWindDirection: number;
    midnight10MWindGust: number;
    midnightVisibility: number;
    midnightRelativeHumidity: number;
    midnightMslp: number;
    nightSignificantWeatherCode: number;
    nightMinScreenTemperature: number;
    nightUpperBoundMinTemp: number;
    nightLowerBoundMinTemp: number;
    nightMinFeelsLikeTemp: number;
    nightUpperBoundMinFeelsLikeTemp: number;
    nightLowerBoundMinFeelsLikeTemp: number;
    nightProbabilityOfPrecipitation: number;
    nightProbabilityOfSnow: number;
    nightProbabilityOfHeavySnow: number;
    nightProbabilityOfRain: number;
    nightProbabilityOfHeavyRain: number;
    nightProbabilityOfHail: number;
    nightProbabilityOfSferics: number;
}

export interface WeatherResponse {
    type: string;
    features: WeatherFeatures[];
}

export interface WeatherDay {
    midnight10MWindDirection: number;
    midnight10MWindGust: number;
    midnight10MWindSpeed: number;
    midnightMslp: number;
    midnightRelativeHumidity: number;
    midnightVisibility: number;
    nightLowerBoundMinFeelsLikeTemp: number;
    nightLowerBoundMinTemp: number;
    nightMinScreenTemperature: number;
    nightUpperBoundMinFeelsLikeTemp: number;
    nightUpperBoundMinTemp: number;
    time: string;
    Day: string;
    MaxTemp: string;
    LowTemp: string;
    MaxFeels: string;
    Wind: number;
    dayMaxScreenTemperature: number;
    dayMaxFeelsLikeTemp: number;
    daySignificantWeatherCode: number;
    WeatherIcon: JSX.Element;
    Description: string;
}

export interface WeatherRequest {
    days: WeatherDay[];
    features: WeatherFeatures[];
    location: string;
}

export interface Weather {
    DailyWeather: WeatherRequest;
    TodayWeather: WeatherDay;
    Location: string;
    Loaded: boolean;
}

export interface UI {
    Base: {
        HighlightFont: string;
    };
    SideBar: {
        Body: string;
        Child: string;
    };
}

export interface Props {
    Icon: Icons;
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

export interface InfoProps {}