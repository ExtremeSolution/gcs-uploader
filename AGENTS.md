# Agent Instructions: GCS Uploader

## Architecture & Entrypoints
- This is a vanilla Node.js Express microservice for uploading and deleting files to Google Cloud Storage (GCS).
- **Module System:** This is a **CommonJS** project (uses `require()`, no `"type": "module"`). Be careful when updating dependencies (e.g., `node-fetch`, `uuid`) to avoid installing pure-ESM versions that break the build.
- **Entrypoint:** `index.js`. There is no build step or compilation (pure JS).
- **Core Logic:** File operations and GCS interactions are isolated in `util/gcs.js`.
- **API Endpoints:** 
  - `POST /upload` (expects `multipart/form-data` handled by `multer`).
  - `DELETE /delete/*` (wildcard captures the full file path including slashes via `req.params[0]`).

## Setup & Environment
- **Environment Variables:** The app requires a `.env` file (copy from `.env.copy`). `APP_USER`, `APP_SECRET`, `PROJECT_ID`, and `BUCKET_NAME` are mandatory.
- **GCS Authentication:** 
  - In development (when `NODE_ENV !== 'production'`), you must create a `key.json` file in the repository root containing the GCS Service Account credentials.
  - In production (`NODE_ENV === 'production'`), it relies on default Google Cloud credentials.
- **API Authentication:** All routes are protected by Basic Auth (`express-basic-auth`) using the credentials from `APP_USER` and `APP_SECRET`.

## Conventions & Quirks
- **File Upload Limitations:** The app uses `multer.memoryStorage()`. The maximum file size is strictly enforced by the `FILE_LIMIT` environment variable (defaults to 5MB). Avoid changing to disk storage unless requested.
- **File Naming Mutilation:** Uploaded filenames automatically have spaces replaced by underscores. If no `path` is provided in the upload body, a UUIDv4 is prepended to the filename.
- **Testing:** There is currently no test suite configured (`npm test` will fail). Rely on manual endpoint testing for verification.

## Git Workflow Constraints
- **NEVER** run `git commit`, `git push`, or alter the git history in any way unless the user explicitly commands it.
- Present file modifications and wait for the user to manage their own git state.
