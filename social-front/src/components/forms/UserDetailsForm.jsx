import { useContext, useState } from "react"
import { UserContext } from "../providers/UserContext"
import Button from "../ui/Button";
import DragDropUpload from "../ui/DragDropUpload";
export default function UserDetailsForm() {
    const { uploadAvatar } = useContext(UserContext)
    const [file, setFile] = useState();
    const onSelectFile = (file) => {
        setFile(file);
    }

    async function submit(e) {
        e.preventDefault();
        await uploadAvatar(file);
    }

    return (
        <form onSubmit={submit} className="flex flex-col justify-center items-center p-2 w-full">
            <DragDropUpload onSelectFile={onSelectFile} />
            <Button>Upload avatar</Button>
        </form>
    )
}
