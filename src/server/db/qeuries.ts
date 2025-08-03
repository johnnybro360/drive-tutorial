import "server-only"

import { db } from "~/server/db"
import { files_table as filesSchema, folders_table as foldersSchema } from "~/server/db/schema"
import { eq, and, isNull } from "drizzle-orm"

export const QUERIES = {
    getAllParentsForFolder: async function (folderId: number) {
        const parents = []
        let currentId: number | null = folderId
        while (currentId !== null) {
            const folder = await db.selectDistinct().from(foldersSchema)
                .where(eq(foldersSchema.id, currentId))

            if (!folder[0]) {
                throw new Error("Parent folder not found")
            }

            parents.unshift(folder[0])
            currentId = folder[0]?.parent
        }

        return parents;
    },
    getFiles: function (folderId: number) {
        return db.select().from(filesSchema).where(eq(filesSchema.parent, folderId))
            .orderBy(filesSchema.id)
    },

    getFolders: function (folderId: number) {
        return db.select().from(foldersSchema).where(eq(foldersSchema.parent, folderId))
            .orderBy(foldersSchema.id)
    },
    getFolderById: async function (folderId: number) {
        const folder = await db.select().from(foldersSchema).where(eq(foldersSchema.id, folderId))
        return folder[0]
    },
    getRootFolderForUser: async function (userId: string) {
        const folder = await db.select().from(foldersSchema).where(and(isNull(foldersSchema.parent), eq(foldersSchema.ownerId, userId)))
        return folder[0]
    }
}

export const MUTATIONS = {
    createFile: async function (input: {
        file: {
            name: string,
            size: number,
            url: string,
            parent: number,
            fileKey: string,
        }, userId: string
    }) {
        return db.insert(filesSchema).values({ ...input.file, ownerId: input.userId })
    },
    createFolder: async function (input: {
        folder: {
            name: string,
            ownerId: string,
            parent: number | null,
        }
    }) {
        return db.insert(foldersSchema).values(input.folder)
    },
    onboardUser: async function (userId: string) {
        const rootFolder = await db.insert(foldersSchema).values({
            name: "Root",
            ownerId: userId,
            parent: null,
        }).$returningId()

        const rootFolderId = rootFolder[0]?.id

        await db.insert(foldersSchema).values([{
            name: "Trash",
            ownerId: userId,
            parent: rootFolderId,
        }, {
            name: "Shared",
            ownerId: userId,
            parent: rootFolderId,
        }, {
            name: "Starred",
            ownerId: userId,
            parent: rootFolderId,
        },
        {
            name: "Documents",
            ownerId: userId,
            parent: rootFolderId,
        }])

        return rootFolderId
    }
}
