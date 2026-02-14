import { Redis } from "@upstash/redis";
import { NextRequest, NextResponse } from "next/server";

const redis = Redis.fromEnv();
export const config = {
	runtime: "edge",
};

export default async function incr(req: NextRequest): Promise<NextResponse> {
	try {
		// Validation de la méthode HTTP
		if (req.method !== "POST") {
			return new NextResponse("use POST", { status: 405 });
		}

		// Validation du Content-Type
		if (req.headers.get("Content-Type") !== "application/json") {
			return new NextResponse("must be json", { status: 400 });
		}

		// Parse et validation du body
		let body;
		try {
			body = await req.json();
		} catch (error) {
			console.error("[API /incr] Failed to parse JSON body:", error);
			return new NextResponse("Invalid JSON", { status: 400 });
		}

		// Validation du slug
		let slug: string | undefined = undefined;
		if ("slug" in body) {
			slug = body.slug;
		}
		if (!slug || typeof slug !== "string" || slug.trim() === "") {
			console.error("[API /incr] Invalid or missing slug:", slug);
			return new NextResponse("Slug not found or invalid", { status: 400 });
		}

		// Récupération et hashage de l'IP pour la déduplication
		const ip =
			req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
			req.headers.get("x-real-ip") ??
			undefined;
		if (ip) {
			try {
				// Hash the IP in order to not store it directly in your db.
				const buf = await crypto.subtle.digest(
					"SHA-256",
					new TextEncoder().encode(ip),
				);
				const hash = Array.from(new Uint8Array(buf))
					.map((b) => b.toString(16).padStart(2, "0"))
					.join("");

				// Deduplicate the ip for each slug (24h window)
				const dedupeKey = ["deduplicate", hash, slug].join(":");
				const isNew = await redis.set(dedupeKey, true, {
					nx: true,
					ex: 24 * 60 * 60,
				});

				if (!isNew) {
					// Vue déjà comptabilisée pour cette IP dans les dernières 24h
					return new NextResponse(null, { status: 202 });
				}
			} catch (error) {
				// Continue sans déduplication en cas d'erreur
				if (process.env.NODE_ENV === "development") {
					console.error("[API /incr] Error during IP deduplication:", error);
				}
			}
		}

		// Incrémentation du compteur
		try {
			const key = ["pageviews", "projects", slug].join(":");
			const newCount = await redis.incr(key);

			return new NextResponse(JSON.stringify({ views: newCount }), {
				status: 200,
				headers: {
					"Content-Type": "application/json",
				},
			});
		} catch (error) {
			console.error(`[API /incr] Failed to increment Redis counter for "${slug}":`, error);
			return new NextResponse("Failed to increment counter", { status: 500 });
		}
	} catch (error) {
		console.error("[API /incr] Unexpected error:", error);
		return new NextResponse("Internal Server Error", { status: 500 });
	}
}
