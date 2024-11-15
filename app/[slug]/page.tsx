'use server';

import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Slug({ params }: { params: { slug: string } }) {

  const url = await prisma.url.findUnique({
    where: {
      url: params.slug,
    },
  });

  if (!url || !url.siteUrl) {
    return (
      <div className="flex justify-center items-center flex-col mx-5 text-red-600 text-sm md:text-lg h-screen">
        <h1>Error</h1>
        <p>The requested URL could not be found. Please check and try again.</p>
        <Link href={'/'} className="mt-4">
          <Button>Home</Button>
        </Link>
      </div>
    );
  }

  // Redirect to the found URL
  return redirect(url.siteUrl);

}
