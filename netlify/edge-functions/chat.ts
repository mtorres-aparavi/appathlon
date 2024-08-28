import type { Config, Context } from "https://edge.netlify.com/";

import { appConfig } from "../../config.edge";

export default async function handler(
    request: Request,
    context: Context
): Promise<Response> {

    if (!appConfig.APARAVI_HOST || !appConfig.APARAVI_USERNAME || !appConfig.APARAVI_PASSWORD) {
        throw new Error(
            "Aparavi basic auth infor is missing and must be set in config.edge.ts"
        );
    }

    try {
        return new Response("hola", {
            headers: {
                "Content-Type": "text/plain",
            },
        });
    } catch (e: any) {
        console.error(e);
        return new Response(e.message, {
            status: 500,
            headers: {
                "Content-Type": "text/plain",
            },
        });
    }
}

export const config: Config = {
    path: "/api/chat",
};
