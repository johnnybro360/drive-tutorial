"use server"

import { db } from "./db"
import { files_table, folders_table } from "./db/schema"
import { eq, and } from "drizzle-orm"
import { auth } from "@clerk/nextjs/server"
import { UTApi } from "uploadthing/server"
import { cookies } from "next/headers"

const utApi = new UTApi()

export async function deleteFile(fileId: number) {
    const session = await auth()


    if (!session.userId) {
        return { error: "Unauthorized" }
    }
    const [file] = await db.select().from(files_table).where(and(eq(files_table.id, fileId), eq(files_table.ownerId, session.userId)))
    
    if (!file) {
        return { error: "File not found" }
    }
 
    const utiapiResult = await utApi.deleteFiles([file.fileKey])

    console.log(utiapiResult);
    
    const dbDeleteResult = await db.delete(files_table).where(eq(files_table.id, fileId))
    
    console.log(dbDeleteResult);

    const c = await cookies();
    
    c.set("force-refresh", JSON.stringify(Math.random()))

    return { success: true }
}   

export async function deleteFolder(folderId: number) {
    const session = await auth()

    if (!session.userId) {
        return { error: "Unauthorized" }
    }

    const files = await db.select().from(files_table).where(eq(files_table.parent, folderId))

    if (files.length > 0) {
        return { error: "Folder is not empty" }
    }

    
    const [folder] = await db.select().from(folders_table).where(and(eq(folders_table.id, folderId), eq(folders_table.ownerId, session.userId)))

    if (!folder) {
        return { error: "Folder not found" }
    }

    const dbDeleteResult = await db.delete(folders_table).where(eq(folders_table.id, folderId))

    console.log(dbDeleteResult);

    const c = await cookies();
    
    c.set("force-refresh", JSON.stringify(Math.random()))
    
    return { success: true }
}
