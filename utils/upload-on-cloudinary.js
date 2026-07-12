import cloudinary from "@/lib/cloudinary";

const uploadOnCloudinary = async (
    file,
    folder = "algogrind"
) => {
    try {
        if (!file) {
            return null;
        }

        let uploadSource = file;

        if (typeof file !== "string") {
            const isFileLike = typeof file.arrayBuffer === "function";

            if (!isFileLike) {
                throw new TypeError(
                    "Expected a file, buffer, or path string for Cloudinary upload"
                );
            }

            const buffer = Buffer.from(
                await file.arrayBuffer()
            );
            const mimeType =
                file.type || "application/octet-stream";
            uploadSource = `data:${mimeType};base64,${buffer.toString("base64")}`;
        }

        const result = await cloudinary.uploader.upload(
            uploadSource,
            {
                folder,
                resource_type: "auto",
            }
        );

        return result;
    } catch (error) {
        console.error(
            "Cloudinary Upload Error:",
            error
        );

        throw error;
    }
};

export default uploadOnCloudinary;
