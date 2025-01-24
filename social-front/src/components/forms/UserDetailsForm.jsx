import { useContext, useState } from "react"
import { UserContext } from "../providers/UserContext"
import Button from "../ui/Button";

export default function UserDetailsForm() {
    const { uploadAvatar } = useContext(UserContext)

    const [file, setFile] = useState();

    const handleFile = (e) => {
        setFile(e.target.files[0]);
    }
    async function submit(e) {
        e.preventDefault();
        await uploadAvatar(file);
    }
    return (
        <form onSubmit={submit}>
            <input type="file" name="avatar" onChange={handleFile} />
            <Button>Upload avatar</Button>
        </form>
    )
}
