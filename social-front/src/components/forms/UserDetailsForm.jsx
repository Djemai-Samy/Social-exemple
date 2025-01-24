import { useContext, useState } from "react"
import { UserContext } from "../providers/UserContext"
import Button from "../ui/Button";
import { ImageUp } from 'lucide-react';
export default function UserDetailsForm() {
    const { uploadAvatar } = useContext(UserContext)

    const [dragActive, setDragActive] = useState(false)

    const [file, setFile] = useState();
    const [preview, setPreview] = useState("");

    const handleFile = (file) => {
        setFile(file);
        const localUrl = URL.createObjectURL(file);
        setPreview(localUrl)
    }

    const handleDrag = (e) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true)
        } else if (e.type === 'dragleave') {
            setDragActive(false)
        }
    }

    const handleDrop = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0])
        }
    }

    async function submit(e) {
        e.preventDefault();
        await uploadAvatar(file);
    }

    console.log(file);

    return (
        <form onSubmit={submit} className="flex flex-col justify-center items-center">
            <div onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`h-96 w-full bg-foreground/5 p-4 rounded ${dragActive ? "border border-primary" : ""}`}
            >
                <p className="text-3xl text-center text-foreground/50">Glisser une image</p>
                {preview ?
                    (<img src={preview} alt="" />) :
                    <ImageUp className={`w-64 h-64 m-auto ${dragActive ? "text-primary" : "text-foreground/50"}`} />}
            </div>
            {/* <input type="file" name="avatar" onChange={handleFile} /> */}
            <Button>Upload avatar</Button>
        </form>
    )
}

// Implementer un Drag and Drop pour l'upload de l'avatar