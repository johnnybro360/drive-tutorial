import DriveContents from "../../drive-contents"
import { getAllParentsForFolder, getFiles, getFolders } from "~/server/db/qeuries"

export default async function GoogleDriveClone(props: {
    params: Promise<{
        folderId: string
    }>
}) {
    const params = await props.params
    const parsedFolderId = parseInt(params.folderId)

    if (isNaN(parsedFolderId)) {
        return <div>Invalid folder ID</div>
    }

    const files = await getFiles(parsedFolderId)
    const folders = await getFolders(parsedFolderId)
    const parents = await getAllParentsForFolder(parsedFolderId)

    return (
        <DriveContents files={files} folders={folders} parents={parents} />
    )
}

