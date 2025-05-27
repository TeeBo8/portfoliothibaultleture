import type { Project } from "@/.contentlayer/generated";
import Link from "next/link";
import { Eye, Github, ExternalLink, Lock } from "lucide-react";

type Props = {
	project: Project;
	views: number | undefined;
};

export const Article: React.FC<Props> = ({ project, views = 0 }) => {
	const repoUrl = project.repository
		? `https://github.com/${project.repository}`
		: null;

	return (
		<article className="p-4 md:p-8 h-full flex flex-col justify-between">
			<div>
				<div className="flex justify-between gap-2 items-center mb-3">
					<span className="text-xs duration-1000 text-zinc-200 group-hover:text-white group-hover:border-zinc-200 drop-shadow-orange">
						{project.date ? (
							<time dateTime={new Date(project.date).toISOString()}>
								{Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(
									new Date(project.date),
								)}
							</time>
						) : (
							<span>SOON</span>
						)}
					</span>
					<span className="text-zinc-500 text-xs flex items-center gap-1">
						<Eye className="w-4 h-4" />{" "}
						{Intl.NumberFormat("en-US", { notation: "compact" }).format(
							views || 0,
						)}
					</span>
				</div>
				<Link href={`/projects/${project.slug}`} className="group block">
					<h2 className="text-xl font-medium duration-1000 lg:text-3xl text-zinc-200 group-hover:text-white font-display">
						{project.title}
					</h2>
					<p className="z-20 mt-4 text-sm duration-1000 text-zinc-400 group-hover:text-zinc-200">
						{project.description}
					</p>
				</Link>

				{project.stack && project.stack.length > 0 && (
					<div className="mt-4 flex flex-wrap gap-2">
						{project.stack.map((tech) => (
							<span
								key={tech}
								className="text-xs px-2 py-0.5 bg-zinc-800 text-zinc-300 border border-zinc-700 rounded"
							>
								{tech}
							</span>
						))}
					</div>
				)}
			</div>

			<div className="mt-6 flex flex-wrap gap-3">
				{project.url && (
					<Link
						href={project.url}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center justify-center px-3 py-1 text-xs font-medium text-zinc-300 hover:text-white bg-zinc-800/50 hover:bg-zinc-700/50 border border-zinc-700 rounded-md transition-colors"
					>
						Voir la Démo
						<ExternalLink className="w-3 h-3 ml-1.5" />
					</Link>
				)}
				{repoUrl && (
					<Link
						href={repoUrl}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center justify-center px-3 py-1 text-xs font-medium text-zinc-300 hover:text-white bg-zinc-800/50 hover:bg-zinc-700/50 border border-zinc-700 rounded-md transition-colors"
					>
						{project.isPrivateRepo ? (
							<>
								Code Source (Privé)
								<Lock className="w-3 h-3 ml-1.5" />
							</>
						) : (
							<>
								Code Source
								<Github className="w-3 h-3 ml-1.5" />
							</>
						)}
					</Link>
				)}
			</div>
		</article>
	);
};
