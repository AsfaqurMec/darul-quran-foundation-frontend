## Blog Update PUT Contract

- **Method**: PUT
- **Path**: `/api/v1/blog/:id`
- **Auth**: Bearer token
- **Accepts**: `application/json` (no new files) OR `multipart/form-data` (when sending new files)

### JSON Mode (no new files)

- Headers: `Content-Type: application/json`
- Body:

```json
{
  "title": "string?",
  "excerpt": "string?",
  "date": "YYYY-MM-DD?",
  "readTime": "string?",
  "fullContent": "string?",
  "category": "string?",
  "images": ["https://existing-url-1", "https://existing-url-2"]
}
```

Notes:
- Omit `thumbnail` if unchanged (keep existing on server).
- `images` is the full keep-only list when there are no new uploads.

### Multipart Mode (new files included)

- Headers: `Content-Type: multipart/form-data`
- Fields:
  - Scalars: `title`, `excerpt`, `date`, `readTime`, `fullContent`, `category` (optional strings)
  - `existingImages`: stringified JSON array of URLs to keep (e.g., `["https://...","https://..."]`)
- Files:
  - `thumbnail`: single File (only when replacing thumbnail)
  - `images`: multiple Files (new images to append)

Server behavior:
- Keep existing thumbnail if `thumbnail` file is not provided.
- Final `images` array should be `[...existingImages, ...uploadedNewImages]`.

---

## Example Express + Multer Handler (TypeScript)

```ts
import express, { Request, Response } from 'express';
import multer from 'multer';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.put(
  '/api/v1/blog/:id',
  express.json(),
  upload.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'images', maxCount: 20 },
  ]),
  async (req: Request, res: Response) => {
    try {
      const blogId = req.params.id;

      const {
        title,
        excerpt,
        date,
        readTime,
        fullContent,
        category,
        images,          // JSON mode only
        existingImages,  // multipart mode only (stringified JSON)
      } = req.body as Record<string, any>;

      let imagesToKeep: string[] = [];
      if (Array.isArray(images)) {
        imagesToKeep = images.filter((u) => typeof u === 'string' && u.trim() !== '');
      } else if (typeof images === 'string') {
        try {
          const arr = JSON.parse(images);
          if (Array.isArray(arr)) {
            imagesToKeep = arr.filter((u) => typeof u === 'string' && u.trim() !== '');
          }
        } catch {}
      }

      if (typeof existingImages === 'string') {
        try {
          const arr = JSON.parse(existingImages);
          if (Array.isArray(arr)) {
            imagesToKeep = arr.filter((u) => typeof u === 'string' && u.trim() !== '');
          }
        } catch {}
      }

      const files = req.files as Record<string, Express.Multer.File[] | undefined> | undefined;
      const thumbnailFile = files?.thumbnail?.[0];
      const newImageFiles = files?.images ?? [];

      let nextThumbnailUrl: string | undefined;
      if (thumbnailFile) {
        nextThumbnailUrl = await uploadBufferAndGetUrl(thumbnailFile);
      }

      const uploadedImageUrls: string[] = [];
      for (const file of newImageFiles) {
        const url = await uploadBufferAndGetUrl(file);
        uploadedImageUrls.push(url);
      }
      const nextImages: string[] = [...imagesToKeep, ...uploadedImageUrls];

      const update: Record<string, any> = {};
      if (typeof title === 'string') update.title = title;
      if (typeof excerpt === 'string') update.excerpt = excerpt;
      if (typeof date === 'string') update.date = date;
      if (typeof readTime === 'string') update.readTime = readTime;
      if (typeof fullContent === 'string') update.fullContent = fullContent;
      if (typeof category === 'string') update.category = category;
      if (nextThumbnailUrl) update.thumbnail = nextThumbnailUrl;
      update.images = nextImages;

      const updated = await blogService.updateById(blogId, update);
      return res.status(200).json({
        success: true,
        message: 'Blog updated successfully',
        data: updated,
      });
    } catch (err: any) {
      return res.status(400).json({
        success: false,
        message: err?.message ?? 'Failed to update blog',
      });
    }
  }
);

async function uploadBufferAndGetUrl(file: Express.Multer.File): Promise<string> {
  // Implement upload to your storage (S3/Cloudinary/etc.) using file.buffer
  return `https://cdn.example.com/uploads/${Date.now()}-${file.originalname}`;
}

export default router;
```

Notes:
- If no new thumbnail is uploaded, keep the existing thumbnail.
- JSON mode: `images` is the final keep-only list.
- Multipart mode: use `existingImages` + uploaded `images` files to build the final list.

