import type { Context, Config } from '@netlify/edge-functions';


import { appConfig } from '../../config.edge.ts';
import { semanticSearch } from "../../lib/edge/aparavi.ts";

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

        const data = await request.json();

        const query = data.messages[0]?.content?.toLowerCase()?.trim().split(' ').join('+');

        const search  = await semanticSearch(query ?? '');

        return new Response(JSON.stringify(search), {
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
