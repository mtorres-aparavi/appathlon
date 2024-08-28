import type { AppConfig } from './lib/edge/types';

export const appConfig: AppConfig = {
    APARAVI_HOST: Netlify.env.get("APARAVI_HOST") ?? "",
    APARAVI_USERNAME: Netlify.env.get("APARAVI_USERNAME") ?? "",
    APARAVI_PASSWORD: Netlify.env.get("APARAVI_PASSWORD") ?? ""
};
