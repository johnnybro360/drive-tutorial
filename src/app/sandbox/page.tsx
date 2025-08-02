import { db } from "~/server/db"
import { mockFiles, MockFolders } from "~/lib/mock-data"
import { files, folders } from "~/server/db/schema"

export default function SandBoxPage(){

    return (
        <div className="flex flex-col gap-4">
            Seed Function
            <form action={async() => {
                "use server"



                const folderInsert = await db.insert(folders).values(MockFolders.map((folder, index)=>({
                    name: folder.name,
                    parent: folder.parent === "root" ? null : parseInt(folder.parent ?? "1"),
                    id: index + 1,
                })))

                console.log(folderInsert);

                const fileInsert = await db.insert(files).values(mockFiles.map((file, index)=>({
                    name: file.name,
                    parent: file.parent === "root" ? 0 : parseInt(file.parent),
                    id: index + 1,
                    url: file.url,
                    size: parseInt(file.size)
                })))


                
                console.log(fileInsert);

            }}>
                <button type="submit">Seed</button>
            </form>
        </div>
    )
}