import {randomUUID} from "node:crypto";
import {mkdirSync} from "node:fs";
import {basename, join} from "node:path";
import {unlink} from "node:fs/promises";
import {fileURLToPath} from "node:url";
import multer from "multer";

export class InvalidImageError extends Error {}

const imagesDirectory = join(fileURLToPath(new URL("../../public/images", import.meta.url)));

mkdirSync(imagesDirectory, {recursive: true});

export async function removeImage(filename: string | null): Promise<void> {
    if (!filename)  return; 
    try {
        await unlink(join(imagesDirectory, basename(filename)));
    } catch (error) {
        if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
            console.error("Error occurred while removing image:", error);
        } //page 21
    }
}

const imagesExtensions = new Map([
  ["image/png", ".png"],
  ["image/jpeg", ".jpg"],
  ["image/jpg", ".jpg"],
  ["image/webp", ".webp"],
  ["image/gif", ".gif"],
  ["image/avif", ".avif"],
]);

export const upload = multer({
    storage: multer.diskStorage({
        destination: (_req, _file, callback) => {
            callback(null, imagesDirectory);
        },
        filename: (_req, file, callback) => {
            callback(null, `${randomUUID()}${imagesExtensions.get(file.mimetype)}`);
        },
    }),
    fileFilter: (_req, file, callback) => {
        if (!imagesExtensions.has(file.mimetype)) {
            callback(new InvalidImageError("Only image files formats jpg, jpeg, png, webp, gif and avif are allowed"));
            return;
        }
        callback(null, true);
    },
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});