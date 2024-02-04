# CrafyImageCompressJS

In-browser javascript image compression and resizing library with support for static images (JPG, PNG, WEBP) and animated GIFs, with and without transparency.

- Resize image with maximum width and maximum height.
- Compress image quality to reduce size.

Principal class `CrafyImageCompressJS` it's inside `CrafyImageCompressJS.js` file.
## Installation

Download `CrafyImageCompressJS.js` and `gif.worker.js` (more info in Class Reference section).

```
  <script src="./CrafyImageCompressJS.js"></script>
```
    
## Class Reference

#### Create new instance of class.

```
  new CrafyImageCompressJS(image, image_type)
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `image` | `blob` | **Required**. Image Blob (PNG, JPG, WEBP, GIF) |
| `image_type` | `string` | **Required**. Image mime type (example: "image/png") |
| `gifjs_workerScript_url` | `string` | **Optional**. gif.js workerScript URL (link to `gif.worker.js` file) |

#### Compress the image.

```
  compressImage(quality, maxWidth, maxHeight)
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `quality`      | `float` | **Required**. Target quality from 0 to 1 (0 is lower quality and 1 is better quality, example: 0.6). |
| `maxWidth`      | `float` | **Optional**. Result image maximum width in pixels. |
| `maxHeight`      | `float` | **Optional**. Result image maximum height in pixels. |
| `maxWidthForGIF`      | `float` | **Optional**. Result image maximum width in pixels (only for GIFs). |
| `maxHeightForGIF`      | `float` | **Optional**. Result image maximum height in pixels (only for GIFs). |
