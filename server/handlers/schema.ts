const getServers = () => {
    if (process.env.NODE_ENV === "production") {
        return [
            {
                url: "https://www.benweare.co.uk/",
                description: "Production Build",
            },
        ];
    }
    return [
        {
            url: "https://benweare-dev.herokuapp.com/",
            description: "Heroku-Dev",
        },
        {
            url: "http://localhost:8080/",
            description: "Local build",
        },
    ];
};

const OpenApiSchema = {
    openapi: "3.0.0",
    info: {
        title: "benweare.co.uk's base API",
        version: "0.1.0",
    },
    servers: getServers(),
    tags: [
        {
            name: "News",
            description:
                "This API allows you to get a JSON response of the news I collect.",
        },
        {
            name: "Weather",
            description:
                "This API allows you to get a JSON response of the weather data I collect.",
        },
    ],
    components: {
        securitySchemes: {
            APIKeyAuth: {
                type: "apiKey",
                in: "header",
                name: "X-API-KEY",
            },
        },
        schemas: {
            error: {
                required: ["message"],
                properties: {
                    message: { type: "string" },
                },
            },
            forbidden: {
                required: ["message"],
                properties: {
                    message: { type: "string" },
                },
            },
            newsOption: {
                type: "string",
                enum: ["bbc", "pc", "nasa"],
            },
            news: {
                type: "object",
                oneOf: [
                    {
                        properties: {
                            title: { type: "string" },
                            link: { type: "string" },
                            img: { type: "string" },
                            date: { type: "string" },
                            site: { type: "string" },
                        },
                    },
                    {
                        properties: {
                            copyright: { type: "string" },
                            date: { type: "string" },
                            explanation: { type: "string" },
                            hdurl: { type: "string" },
                            media_type: { type: "string" },
                            service_version: { type: "string" },
                            title: { type: "string" },
                            url: { type: "string" },
                        },
                    },
                ],
            },
            weatherResponse: {
                type: "object",
                properties: {
                    time: { type: "string" },
                    midnight10MWindSpeed: {
                        type: "number",
                    },
                    midnight10MWindDirection: {
                        type: "number",
                    },
                    midnight10MWindGust: { type: "number" },
                    midnightVisibility: { type: "number" },
                    midnightRelativeHumidity: {
                        type: "number",
                    },
                    midnightMslp: { type: "number" },
                    nightSignificantWeatherCode: {
                        type: "number",
                    },
                    nightMinScreenTemperature: {
                        type: "number",
                    },
                    nightUpperBoundMinTemp: {
                        type: "number",
                    },
                    nightLowerBoundMinTemp: {
                        type: "number",
                    },
                    nightMinFeelsLikeTemp: {
                        type: "number",
                    },
                    nightUpperBoundMinFeelsLikeTemp: {
                        type: "number",
                    },
                    nightLowerBoundMinFeelsLikeTemp: {
                        type: "number",
                    },
                    nightProbabilityOfPrecipitation: {
                        type: "number",
                    },
                    nightProbabilityOfSnow: {
                        type: "number",
                    },
                    nightProbabilityOfHeavySnow: {
                        type: "number",
                    },
                    nightProbabilityOfRain: {
                        type: "number",
                    },
                    nightProbabilityOfHeavyRain: {
                        type: "number",
                    },
                    nightProbabilityOfHail: {
                        type: "number",
                    },
                    nightProbabilityOfSferics: {
                        type: "number",
                    },
                },
            },
            weatherOption: {
                type: "string",
                enum: ["today", "week"],
            },
            weather: {
                type: "object",
                oneOf: [
                    {
                        properties: {
                            location: { type: "string" },
                            day: {
                                type: "object",
                                properties: {
                                    schema: {
                                        $ref: "#/components/schemas/weatherResponse",
                                    },
                                },
                            },
                        },
                    },
                    {
                        properties: {
                            location: { type: "string" },
                            days: {
                                type: "array",
                                properties: {
                                    schema: {
                                        $ref: "#/components/schemas/weatherResponse",
                                    },
                                },
                            },
                        },
                    },
                ],
            },
        },
    },
    security: [{ APIKeyAuth: [] }],
    paths: {
        "/api/news": {
            get: {
                parameters: [
                    {
                        schema: {
                            $ref: "#/components/schemas/newsOption",
                        },
                        in: "query",
                        name: "outlet",
                        required: true,
                    },
                ],
                tags: ["News"],
                summary: "Returns all stored news",
                responses: {
                    "200": {
                        description: "Success",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/news",
                                },
                            },
                        },
                    },
                    default: {
                        description: "Error",
                        content: {
                            "application/json": {
                                schema: {
                                    required: ["message"],
                                    properties: {
                                        message: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        "/api/weather": {
            get: {
                parameters: [
                    {
                        schema: {
                            $ref: "#/components/schemas/weatherOption",
                        },
                        in: "query",
                        name: "timeframe",
                        required: true,
                    },
                ],
                tags: ["Weather"],
                summary: "Returns all stored weather",
                responses: {
                    "200": {
                        description: "Success",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/weather",
                                },
                            },
                        },
                    },
                    default: {
                        description: "Error",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/error",
                                },
                            },
                        },
                    },
                },
            },
        },
    },
};

export default OpenApiSchema;
