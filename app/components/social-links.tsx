"use client";
import { Github, Twitter } from "lucide-react";
import Link from "next/link";

export function SocialLinks() {
	return (
		<div className="flex justify-end gap-8 mt-8">
			<Link target="_blank" href="https://x.com/THIBAUL76280609">
				<Twitter className="w-6 h-6 duration-200 hover:font-medium text-zinc-600 hover:text-zinc-900" />
			</Link>
			<Link target="_blank" href="https://github.com/TeeBo8">
				<Github className="w-6 h-6 duration-200 hover:font-medium text-zinc-600 hover:text-zinc-900" />
			</Link>
		</div>
	);
}

