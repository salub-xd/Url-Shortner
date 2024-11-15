import { prisma } from "@/lib/prisma"
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";

export async function POST(req: Request) {

    try {
        const { siteUrl, url } = await req.json();
        console.log(siteUrl, url);

        const existing = await prisma.url.findUnique({
            where: {
                url
            }
        });

        if (existing) {
            console.log("Url name is already taken!");
            return NextResponse.json({ error: "Url name is already taken!" }, { status: 400 });
        }

        const createUrl = await prisma.url.create({
            data: {
                siteUrl,
                url: url ? url : nanoid(8)
            }
        });

        console.log(createUrl);
        return NextResponse.json(createUrl);

    } catch (error: any) {
        console.log(error);
        return NextResponse.json(error, { status: 400 });
    }

}

