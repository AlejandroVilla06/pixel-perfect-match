import dashboard from "@/assets/project-dashboard.jpg";
import ai from "@/assets/project-ai.jpg";
import mobile from "@/assets/project-mobile.jpg";
import data from "@/assets/project-data.jpg";
import security from "@/assets/project-security.jpg";
import creative from "@/assets/project-creative.jpg";

export const projectImages = { dashboard, ai, mobile, data, security, creative } as const;
export type ProjectImageKey = keyof typeof projectImages;
