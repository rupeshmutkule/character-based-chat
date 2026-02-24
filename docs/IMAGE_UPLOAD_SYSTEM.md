# Image Upload & Storage System

## Overview

The application now uses **Cloudinary** for storing all character avatar images. This provides reliable, scalable image storage with automatic optimization and CDN delivery.

## Architecture

### Upload Flow

```
User selects image
    ↓
FileUploader Component
    ↓
POST /api/cloudinary/upload (validates & uploads)
    ↓
Cloudinary Cloud (stores image)
    ↓
Returns secure URL
    ↓
URL saved to MongoDB with Companion record
    ↓
Image displayed throughout app
```

## Components

### 1. FileUploader Component (`src/components/FileUploader.tsx`)
- **Purpose**: Drag-and-drop file upload interface
- **Features**:
  - Drag & drop support
  - Click to select
  - File type validation (images only)
  - File size validation (max 5MB)
  - Error display
  - Loading states
- **Usage**: Used in avatar selection during character creation

### 2. Upload API Endpoint (`src/app/api/cloudinary/upload/route.ts`)
- **Method**: POST
- **Request**: FormData with `file` field
- **Response**: 
  ```json
  {
    "success": true,
    "fileUrl": "https://res.cloudinary.com/...",
    "name": "filename.jpg"
  }
  ```
- **Validations**:
  - User must be authenticated
  - File must be an image
  - File size must be < 5MB

### 3. Cloudinary Utility (`src/lib/cloudinary.ts`)
Helper functions for:
- `uploadToCloudinary()` - Upload file to Cloudinary
- `deleteFromCloudinary()` - Delete image by public ID
- `getPublicIdFromUrl()` - Extract public ID from URL

## Database Schema

### Companion Model
```prisma
model Companion {
  id      String
  name    String
  avatar  String  // Cloudinary URL stored here
  // ... other fields
}
```

The `avatar` field stores the full Cloudinary secure URL:
```
https://res.cloudinary.com/dhixmzc9s/image/upload/...
```

## Configuration

### Environment Variables
```env
CLOUDINARY_CLOUD_NAME=dhixmzc9s
CLOUDINARY_API_KEY=498281934255921
CLOUDINARY_API_SECRET=wZHjHjEyALSOngFFv-Psm9Dke40
```

### Cloudinary Settings
- **Folder**: `companion-ai/avatars/`
- **Quality**: Auto-optimized
- **CDN**: Enabled for fast delivery
- **Responsive Images**: Automatic responsive variants

## Usage Example

### Creating a Character with Avatar

1. **Upload Avatar**:
```tsx
<FileUploader 
  onchange={(url: string) => setImageUrl(url)}
/>
```

2. **Submit Companion Form**:
```tsx
const payload = {
  name: "John Doe",
  avatar: "https://res.cloudinary.com/...",
  // ... other fields
}
await axios.post("/api/companion", payload)
```

3. **Avatar Stored in BD**:
```javascript
{
  id: "123",
  name: "John Doe",
  avatar: "https://res.cloudinary.com/dhixmzc9s/image/upload/...",
}
```

## Display Images

### In Next.js Image Component
```tsx
import Image from 'next/image'

<Image 
  src={companion.avatar}
  alt={companion.name}
  fill
  sizes="160px"
  className="object-cover"
/>
```

### As Background Image
```tsx
<div 
  style={{
    backgroundImage: `url(${companion.avatar})`,
    backgroundSize: 'cover'
  }}
/>
```

## Error Handling

### Common Errors & Solutions

| Error | Cause | Solution |
|-------|-------|----------|
| "Only image files are allowed" | Wrong file type | Select JPG, PNG, GIF, or WebP |
| "File size must be less than 5MB" | File too large | Compress image before uploading |
| "Failed to upload image" | Server error | Check Cloudinary credentials in `.env` |
| "No file provided" | Missing file field | Ensure file is attached to FormData |

### Debug Upload Issues

```tsx
// Enable verbose logging
const handleFile = async (file: File) => {
  console.log("File details:", {
    name: file.name,
    type: file.type,
    size: file.size,
    sizeMB: (file.size / 1024 / 1024).toFixed(2)
  })
  // ... rest of upload
}
```

## Security

1. **Server-side Validation**:
   - File type checking
   - File size limits
   - User authentication required

2. **Client-side Validation**:
   - File type preview
   - Size warning

3. **Cloudinary Security**:
   - API secret never exposed to client
   - All uploads go through secure endpoint
   - Images are delivered via CDN with HTTPS

## Performance Optimizations

1. **Image Optimization**:
   - Cloudinary auto-optimizes images
   - Uses next-gen formats (WebP)
   - Responsive image variants

2. **Caching**:
   - CDN caching for fast delivery
   - Browser caching enabled

3. **Loading States**:
   - Visual feedback during upload
   - Prevents duplicate submissions

## Advanced Features

### Future Enhancements

1. **Cropping**: Allow users to crop images before upload
2. **Filters**: Apply Cloudinary transforms for effects
3. **Multiple Formats**: Generate thumbnails automatically
4. **Deletion**: Remove image from Cloudinary when companion is deleted
5. **Variants**: Create responsive image variants

### Image Transformations
```tsx
// Example: Get thumbnail version
const thumbnailUrl = imageUrl.replace('/upload/', '/upload/w_100,h_100,c_fill/')

// Example: Apply filter
const filteredUrl = imageUrl.replace('/upload/', '/upload/e_sepia/')
```

## Testing

### Manual Testing Steps

1. **Upload Image**:
   - Click file uploader
   - Select image < 5MB
   - Verify image appears in preview

2. **Verify in Cloudinary**:
   - Log into Cloudinary dashboard
   - Check `companion-ai/avatars/` folder
   - Confirm image is there

3. **Verify in MongoDB**:
   - Check companion document
   - Confirm `avatar` field contains full URL

4. **Display Image**:
   - Navigating to character
   - Verify image loads correctly
   - Check network tab for CDN delivery

## Monitoring

### Cloudinary Dashboard
- Monitor upload volume
- Track bandwidth usage
- Review storage quota
- Check error logs

### Application Monitoring
- Log successful uploads
- Track failed uploads
- Monitor response times
- Alert on errors

## API Reference

### Upload Endpoint

**POST** `/api/cloudinary/upload`

**Request**:
```bash
curl -X POST http://localhost:3000/api/cloudinary/upload \
  -F "file=@image.jpg"
```

**Response** (200):
```json
{
  "success": true,
  "fileUrl": "https://res.cloudinary.com/dhixmzc9s/image/upload/v1/companion-ai/avatars/abc123.jpg",
  "name": "image.jpg"
}
```

**Response** (400/401/500):
```json
{
  "message": "Error description"
}
```

## Troubleshooting

### Images Not Uploading
1. Check `.env` credentials are correct
2. Verify Cloudinary cloud name matches
3. Check API key is active in Cloudinary dashboard
4. Verify file is under 5MB

### Images Not Displaying
1. Check image URL is correct in MongoDB
2. Verify URL is accessible (not private)
3. Check Cloudinary account has storage quota
4. Verify CORS settings if accessing from different domain

### Performance Issues
1. Images should be delivered via CDN (check network tab)
2. Check image file sizes
3. Monitor Cloudinary bandwidth limits
4. Consider automatic optimization settings

---

**Last Updated**: February 22, 2026
**Cloudinary Version**: 2.9.0
**Status**: Production Ready
