import { useEffect, useState } from "react";

export default function useFilePreview(file: FileList | null) {
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    useEffect(() => {
        if (file && file[0]) {
            const newUrl = URL.createObjectURL(file[0]);

            if (newUrl !== imageUrl) {
                setImageUrl(newUrl);
            }

            return () => URL.revokeObjectURL(newUrl)
        }
    }, [file]);

    return { imageUrl, setImageUrl };
}
