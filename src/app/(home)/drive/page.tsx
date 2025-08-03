import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { QUERIES } from "~/server/db/qeuries";
import { MUTATIONS } from "~/server/db/qeuries";

export default async function DrivePage() {

    const session = await auth()

    if (!session.userId) {
        return redirect("/sign-in")
    }
    
    
    const rootFolder = await QUERIES.getRootFolderForUser(session.userId)

    
    if (!rootFolder) {
        return (
            <form action={async () => {
                "use server"
                const session = await auth()
                if (!session.userId) {
                    return redirect("/sign-in")
                }

                const rootFolderId = await MUTATIONS.onboardUser(session.userId)
                redirect(`/f/${rootFolderId}`)
            }}>
                <button type="submit">Create new Drive</button>
            </form>
        )
    }

    return redirect(`/f/${rootFolder.id}`)
}