import { ImageUp } from "lucide-react";
import { useRef, useState } from "react"
import Button from "./Button";

export default function DragDropUpload({ onSelectFile }) {
    const [dragActive, setDragActive] = useState(false)
    const inputRef = useRef(null);
    const [preview, setPreview] = useState("");

    const handleFile = (file) => {
        onSelectFile(file)
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
    return (
        <div onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`w-full flex flex-col items-center bg-foreground/5 p-4 gap-4 ${dragActive ? "border border-primary" : ""}`}
        >
            <p className="text-3xl text-center text-foreground/50">Glisser une image</p>
            {preview ?
                (<img src={preview} alt="" />) :
                <ImageUp className={`w-64 h-64 m-auto text-red-600 ${dragActive ? "text-primary" : "text-foreground/50"}`} />}
            <input
                ref={inputRef}
                type="file"
                name="avatar"
                className="hidden"
                onChange={(e) => handleFile(e.target.files[0])}
            />
            <Button onClick={() => inputRef.current.click()}>Séléctionner un fichier localement</Button>
        </div>
    )
}
