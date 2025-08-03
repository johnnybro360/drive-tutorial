import { db } from "~/server/db"
import { mockFiles, MockFolders } from "~/lib/mock-data"
import { files_table, folders_table } from "~/server/db/schema"
import { auth } from "@clerk/nextjs/server"

export default function SandBoxPage(){

    return (
        <div className="flex flex-col gap-4">
            Seed Function
            <form action={async() => {
                "use server"

                const user = await auth();
                
                if (!user.userId) {
                    throw new Error("User not found");
                }


                const folderInsert = await db.insert(folders_table).values(MockFolders.map((folder, index)=>({
                    name: folder.name,
                    parent: folder.parent === "root" ? 1 : folder.id === 'root' ? null : parseInt(folder.parent ?? "1"),
                    id: folder.id === 'root' ? 1 : parseInt(folder.id) + 1,
                    ownerId: user.userId
                })))

                console.log(folderInsert);

                const fileInsert = await db.insert(files_table).values(mockFiles.map((file, index)=>({
                    name: file.name,
                    parent: file.parent === "root" ? 1 : parseInt(file.parent) + 1,
                    id: parseInt(file.id),
                    url: file.url,
                    size: parseInt(file.size),
                    ownerId: user.userId
                })))

                console.log(fileInsert);

            }}>
                <button type="submit">Seed</button>
            </form>
        </div>
    )
}