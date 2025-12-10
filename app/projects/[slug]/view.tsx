"use client";

import { useEffect } from "react";

export const ReportView: React.FC<{ slug: string }> = ({ slug }) => {
	useEffect(() => {
		let isMounted = true;

		const incrementView = async (retries = 3) => {
			// Ne pas exécuter si le composant est démonté
			if (!isMounted) return;

			try {
				const response = await fetch("/api/incr", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ slug }),
				});

				if (!response.ok && retries > 0) {
					// Retry avec un délai exponentiel
					const delay = (4 - retries) * 1000; // 1s, 2s, 3s
					setTimeout(() => incrementView(retries - 1), delay);
				} else if (!response.ok) {
					// Erreur finale après tous les retries
					console.error(
						`[View Counter] Failed to increment view for "${slug}" after all retries. Status: ${response.status}`,
					);
				}
			} catch (error) {
				if (retries > 0 && isMounted) {
					// Retry en cas d'erreur réseau
					const delay = (4 - retries) * 1000;
					setTimeout(() => incrementView(retries - 1), delay);
				} else {
					// Erreur finale après tous les retries
					console.error(
						`[View Counter] Failed to increment view for "${slug}" after all retries.`,
						error,
					);
				}
			}
		};

		// Démarrer l'incrémentation avec un petit délai pour éviter les race conditions
		const timeoutId = setTimeout(() => incrementView(), 100);

		// Cleanup
		return () => {
			isMounted = false;
			clearTimeout(timeoutId);
		};
	}, [slug]);

	return null;
};
