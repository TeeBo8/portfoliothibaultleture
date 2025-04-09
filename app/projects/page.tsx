import Link from "next/link";
import React from "react";
import { allProjects } from "contentlayer/generated";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";
import { Article } from "./article";
// import { Redis } from "@upstash/redis";
import { Eye } from "lucide-react";

// Commenté pour éviter l'erreur Redis
// const redis = Redis.fromEnv();

export const revalidate = 60;
export default async function ProjectsPage() {
  // Solution temporaire : créer un objet views avec tous les slugs initialisés à 0
  const views: Record<string, number> = {};
  
  // S'assurer que chaque projet a une entrée dans l'objet views
  allProjects.forEach(project => {
    if (project.slug) {
      views[project.slug] = 0;
    }
  });

  // Version originale avec Redis
  /*
  const views = (
    await redis.mget<number[]>(
      ...allProjects.map((p) => ["pageviews", "projects", p.slug].join(":")),
    )
  ).reduce((acc, v, i) => {
    acc[allProjects[i].slug] = v ?? 0;
    return acc;
  }, {} as Record<string, number>);
  */

  // 1. Filtrer les projets valides
  const validProjects = allProjects.filter((p) => p.slug && p.published);

  // 2. Trier TOUS les projets valides par date (plus récent en premier)
  const sortedProjects = validProjects.sort((a, b) =>
    new Date(b.date ?? 0).getTime() - new Date(a.date ?? 0).getTime()
  );

  return (
    <div className="relative pb-16">
      <Navigation />
      <div className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
        <div className="max-w-2xl mx-auto lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
            Projects
          </h2>
          <p className="mt-4 text-zinc-400">
            Quelques projets personnels et d'exploration technique.
          </p>
        </div>
        <div className="w-full h-px bg-zinc-800" />

        <div className="grid grid-cols-1 gap-8 mx-auto lg:mx-0 md:grid-cols-2 lg:grid-cols-3">
          {sortedProjects.map((project) => (
            <Card key={project.slug}>
              <Article project={project} views={views[project.slug] ?? 0} />
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
