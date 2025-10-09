# AI-Powered Image Library Implementation Tasks

**Status**: 🚧 In Progress
**Started**: 2025-01-09
**Guide Reference**: [IMAGE_LIBRARY_GUIDE.md](./IMAGE_LIBRARY_GUIDE.md)

---

## Progress Overview

- **Phase 1**: ⬜ 0/7 tasks complete
- **Phase 2**: ⬜ 0/15 tasks complete
- **Phase 3**: ⬜ 0/12 tasks complete
- **Phase 4**: ⬜ 0/10 tasks complete

**Total**: ⬜ 0/44 tasks complete

---

## Phase 1: Infrastructure Setup (15 minutes)

### 1.1 Create Folder Structure
- [ ] Create `public/images/` directory if it doesn't exist
- [ ] Create `public/images/library/` subdirectory
- [ ] Verify folder permissions are correct
- [ ] Create `.gitkeep` file in library folder to preserve in git

**Command**:
```bash
mkdir -p public/images/library
touch public/images/library/.gitkeep
```

### 1.2 Create Data Directory
- [ ] Create `data/` directory in project root
- [ ] Create empty `image-metadata.json` file
- [ ] Initialize JSON with empty object `{}`
- [ ] Verify file is writable

**Command**:
```bash
mkdir -p data
echo '{}' > data/image-metadata.json
```

### 1.3 Upload Test Images
- [ ] Find 5-10 test images for initial testing
- [ ] Ensure images are relevant to blog topics (data, Salesforce, teams, dashboards)
- [ ] Rename images with descriptive filenames (e.g., `dashboard-analytics.png`)
- [ ] Copy images to `public/images/library/`
- [ ] Verify images are accessible via file system

### 1.4 Update .gitignore
- [ ] Check if `data/image-metadata.json` should be in git (YES - it's generated metadata)
- [ ] Ensure `public/images/library/*` allows image files
- [ ] Add any large test images to .gitignore if needed

### 1.5 Document Current State
- [ ] Take screenshot of folder structure
- [ ] List test images uploaded
- [ ] Document any issues encountered

---

## Phase 2: Build Metadata Generation Script (1-2 hours)

### 2.1 Create Script File
- [ ] Create `scripts/generateImageMetadata.js`
- [ ] Add file header with description and usage
- [ ] Import required dependencies (`fs`, `path`, `@google/genai`)
- [ ] Define constants (LIBRARY_PATH, METADATA_PATH)

### 2.2 Setup Gemini API Integration
- [ ] Verify GEMINI_API_KEY exists in `.env` file
- [ ] Initialize GoogleGenAI client
- [ ] Set model to `gemini-2.0-flash-exp` (or appropriate Vision model)
- [ ] Test API connection with simple request

### 2.3 Build scanImageLibrary Function
- [ ] Check if library folder exists
- [ ] Read all files in library directory
- [ ] Filter for image extensions (.png, .jpg, .jpeg, .gif, .webp)
- [ ] Return array of image filenames
- [ ] Add error handling for missing directory
- [ ] Log number of images found

**Test**: Should find all uploaded test images

### 2.4 Build loadExistingMetadata Function
- [ ] Check if metadata.json exists
- [ ] Read file contents
- [ ] Parse JSON safely with try-catch
- [ ] Return empty object if file doesn't exist or is invalid
- [ ] Log number of existing metadata entries

**Test**: Should return empty object initially, then populated object after first run

### 2.5 Build analyzeImageWithGemini Function
- [ ] Read image file as buffer
- [ ] Convert image to base64 encoding
- [ ] Get image file stats (size, dimensions if possible)
- [ ] Construct Gemini Vision prompt (use prompt from guide)
- [ ] Send image and prompt to Gemini API
- [ ] Parse JSON response from Gemini
- [ ] Handle code block formatting (```json ... ```)
- [ ] Add filename, path, fileSize, timestamps to metadata
- [ ] Return complete metadata object
- [ ] Add error handling for API failures
- [ ] Add retry logic for rate limits

**Test**: Should analyze one test image and return valid JSON metadata

### 2.6 Build saveMetadata Function
- [ ] Create data directory if it doesn't exist
- [ ] Stringify metadata object with pretty formatting (2 spaces)
- [ ] Write to image-metadata.json file
- [ ] Add error handling for write failures
- [ ] Log success message with file path

**Test**: Should write valid JSON file that can be re-read

### 2.7 Build Main Execution Flow
- [ ] Print script header/banner
- [ ] Call scanImageLibrary to get all images
- [ ] Check if images were found (exit if none)
- [ ] Call loadExistingMetadata to get current state
- [ ] Filter to find images without metadata
- [ ] Check if any new images need processing (exit if none)
- [ ] Loop through each new image
- [ ] Show progress indicator for each image
- [ ] Call analyzeImageWithGemini for each image
- [ ] Add metadata to collection after each success
- [ ] Add small delay between API calls (1 second)
- [ ] Call saveMetadata with complete collection
- [ ] Print summary statistics

### 2.8 Add Progress Indicators
- [ ] Add spinner or progress bar for long operations
- [ ] Show current image being processed
- [ ] Show success/failure status per image
- [ ] Show total progress (e.g., "3/10 images processed")

### 2.9 Add Error Handling
- [ ] Wrap main execution in try-catch
- [ ] Handle GEMINI_API_KEY missing
- [ ] Handle network/API errors gracefully
- [ ] Continue processing if one image fails
- [ ] Log all errors to console
- [ ] Don't lose existing metadata on error

### 2.10 Test Metadata Generation
- [ ] Run script with test images
- [ ] Verify metadata.json is created
- [ ] Check that JSON is valid and well-formatted
- [ ] Verify all required fields are present (description, keywords, useCases, themes, style, colors)
- [ ] Check that descriptions are detailed (2-3 sentences)
- [ ] Verify keywords are relevant (8-12 terms)
- [ ] Test with different image types (photo, illustration, diagram)

### 2.11 Test Incremental Updates
- [ ] Run script a second time (should skip existing images)
- [ ] Add 1-2 new images to library
- [ ] Run script again (should only process new images)
- [ ] Verify existing metadata is preserved
- [ ] Verify new metadata is added correctly

### 2.12 Optimize Gemini Prompt
- [ ] Review quality of generated descriptions
- [ ] Check if keywords are searchable and relevant
- [ ] Verify use cases are specific enough
- [ ] Adjust prompt if results are too generic
- [ ] Test with revised prompt on 2-3 images

### 2.13 Add Logging and Debugging
- [ ] Add verbose mode flag (optional -v argument)
- [ ] Log API requests in verbose mode
- [ ] Log API responses in verbose mode
- [ ] Save failed images list for review
- [ ] Add timestamp to log messages

### 2.14 Handle Edge Cases
- [ ] Test with corrupted/invalid image file
- [ ] Test with 0 images in library
- [ ] Test with already-complete metadata
- [ ] Test with very large images (>5MB)
- [ ] Test with various image formats

### 2.15 Document Script Usage
- [ ] Add usage comments at top of script
- [ ] Document required environment variables
- [ ] Add example output to comments
- [ ] Create troubleshooting section in comments

---

## Phase 3: Integrate with Article Generation (1 hour)

### 3.1 Backup Existing Script
- [ ] Create backup of current `createNextPost.js`
- [ ] Name it `createNextPost.backup.js`
- [ ] Test that backup works before modifications

### 3.2 Add Image Metadata Import
- [ ] Add METADATA_PATH constant at top of file
- [ ] Import existing dependencies if needed

### 3.3 Build loadImageMetadata Function
- [ ] Check if image-metadata.json exists
- [ ] Show warning if file doesn't exist
- [ ] Read and parse JSON file
- [ ] Count number of images in library
- [ ] Log count to console
- [ ] Return metadata object or null
- [ ] Add error handling for invalid JSON

**Test**: Should load test metadata correctly

### 3.4 Build selectImagesForArticle Function
- [ ] Accept articleContent and imageMetadata as parameters
- [ ] Check if metadata is available (return empty array if not)
- [ ] Construct selection prompt with article content and metadata
- [ ] Send to Gemini API
- [ ] Parse JSON response
- [ ] Handle code block formatting
- [ ] Extract selectedImages array
- [ ] Validate that selected images exist in metadata
- [ ] Log number of images selected
- [ ] Return array of image selections
- [ ] Add error handling (return empty array on failure)

**Test**: Should return 1-2 relevant images for test article

### 3.5 Build embedImagesInArticle Function
- [ ] Accept articleHTML, selectedImages, imageMetadata as parameters
- [ ] Return original HTML if no images selected
- [ ] Loop through each selected image
- [ ] Get image metadata for each selection
- [ ] Create responsive image HTML with alt text
- [ ] Determine insertion point based on placement value
  - [ ] "after-introduction" = after first `</p>` tag
  - [ ] "mid-article" = roughly middle of content
  - [ ] "before-conclusion" = before last heading
- [ ] Insert image HTML at determined position
- [ ] Log each image embedded
- [ ] Return updated HTML with embedded images

**Test**: Should embed images at correct positions

### 3.6 Update Main Post Generation Flow
- [ ] Find where article content is generated
- [ ] After content generation, add comment: "// Image Selection Phase"
- [ ] Call loadImageMetadata()
- [ ] Store result in variable
- [ ] Check if metadata loaded successfully
- [ ] If yes, call selectImagesForArticle()
- [ ] If images selected, call embedImagesInArticle()
- [ ] Use final HTML (with images) for saving
- [ ] Preserve existing functionality if no images available

### 3.7 Test Basic Integration
- [ ] Run createNextPost.js with metadata available
- [ ] Verify it loads metadata correctly
- [ ] Check that images are selected
- [ ] Verify images are embedded in output
- [ ] Confirm post file is saved with images

### 3.8 Test Without Metadata
- [ ] Temporarily rename image-metadata.json
- [ ] Run createNextPost.js
- [ ] Verify it handles missing metadata gracefully
- [ ] Check that post is still generated (without images)
- [ ] Restore metadata file

### 3.9 Verify Image Paths
- [ ] Check that image paths start with `/images/library/`
- [ ] Verify paths work in browser/preview
- [ ] Test with different image filenames (spaces, special chars)
- [ ] Ensure paths are URL-safe

### 3.10 Test Image Placement Logic
- [ ] Generate article and check "after-introduction" placement
- [ ] Verify image appears after first paragraph
- [ ] Generate another article with "mid-article" placement
- [ ] Verify image appears roughly in middle
- [ ] Test "before-conclusion" placement
- [ ] Verify image appears before final section

### 3.11 Verify Alt Text Quality
- [ ] Check that alt text comes from metadata description
- [ ] Ensure alt text is descriptive and accessible
- [ ] Verify alt text doesn't have special characters that break HTML
- [ ] Test with screen reader if possible

### 3.12 Add Integration Logging
- [ ] Log when image selection phase starts
- [ ] Log metadata loading status
- [ ] Log number of images selected
- [ ] Log each image embedded
- [ ] Log any errors during image processing
- [ ] Ensure logging doesn't break existing output

---

## Phase 4: Testing & Refinement (30-45 minutes)

### 4.1 Add npm Commands
- [ ] Open package.json
- [ ] Add `"generate-image-metadata": "node scripts/generateImageMetadata.js"`
- [ ] Add `"regenerate-metadata": "rm data/image-metadata.json && npm run generate-image-metadata"`
- [ ] Test each command works
- [ ] Document commands in README if needed

### 4.2 End-to-End Test: Tutorial Article
- [ ] Select tutorial topic from content-calendar.json
- [ ] Run `npm run create-post`
- [ ] Wait for completion
- [ ] Open generated post file
- [ ] Verify article content is good
- [ ] Check that images are embedded
- [ ] Verify image relevance to tutorial topic
- [ ] Check for diagrams or instructional images
- [ ] Review image placement (logical flow)

### 4.3 End-to-End Test: Use Case Article
- [ ] Select use case topic from content-calendar.json
- [ ] Run `npm run create-post`
- [ ] Open generated post
- [ ] Verify images match use case theme
- [ ] Check for business/team-oriented images
- [ ] Verify images enhance storytelling

### 4.4 End-to-End Test: Technical Article
- [ ] Select technical topic from content-calendar.json
- [ ] Run `npm run create-post`
- [ ] Open generated post
- [ ] Verify technical/data-focused images
- [ ] Check for charts, dashboards, or technical diagrams

### 4.5 Review Image Selection Quality
- [ ] Review all 3 test articles
- [ ] Rate relevance of each selected image (1-5 scale)
- [ ] Note any obviously wrong selections
- [ ] Check if same image is overused
- [ ] Verify diversity of image selection

### 4.6 Optimize Selection Prompt
- [ ] If selections are poor, revise selectImagesForArticle prompt
- [ ] Add more specific criteria to prompt
- [ ] Emphasize diversity in selection
- [ ] Test with revised prompt
- [ ] Compare old vs new results

### 4.7 Add Error Handling
- [ ] Test with missing GEMINI_API_KEY
- [ ] Test with invalid metadata JSON
- [ ] Test with missing image files (metadata exists but file deleted)
- [ ] Test with network errors during selection
- [ ] Ensure graceful failures don't break post generation

### 4.8 Performance Optimization
- [ ] Time full post generation with images
- [ ] Check if selection phase is slow
- [ ] Consider caching or optimization if needed
- [ ] Test with large metadata file (50+ images)

### 4.9 Add Regeneration Test
- [ ] Delete data/image-metadata.json
- [ ] Run `npm run regenerate-metadata`
- [ ] Verify all metadata regenerated correctly
- [ ] Compare old vs new metadata (should be similar)

### 4.10 Final Verification
- [ ] Generate 1 more article with full workflow
- [ ] Verify all features work together
- [ ] Check git status (all new files tracked)
- [ ] Review all changes before committing
- [ ] Build and test locally if applicable
- [ ] Commit changes with descriptive message

---

## Phase 5: Documentation & Handoff

### 5.1 Update IMAGE_LIBRARY_GUIDE.md
- [ ] Add "Implementation Status" section at top
- [ ] Mark all phases as complete
- [ ] Add any lessons learned
- [ ] Document any deviations from original plan

### 5.2 Update Main README
- [ ] Add section about image library feature
- [ ] Link to IMAGE_LIBRARY_GUIDE.md
- [ ] Document new npm commands
- [ ] Add example workflow

### 5.3 Create Usage Examples
- [ ] Add screenshots of metadata.json
- [ ] Show example of generated article with images
- [ ] Document how to add new images

### 5.4 Add to CLAUDE.md
- [ ] Document image library system
- [ ] Add guidelines for future image additions
- [ ] Note best practices for image selection

---

## Notes & Lessons Learned

### Issues Encountered
(Add issues as they come up during implementation)

### Solutions Applied
(Document solutions for future reference)

### Improvements for Later
(Ideas that came up but are out of scope for now)

---

## Checklist Before Completion

- [ ] All scripts tested and working
- [ ] npm commands added and documented
- [ ] Error handling covers main edge cases
- [ ] Generated articles have relevant images
- [ ] Metadata quality is good
- [ ] Code is committed to git
- [ ] Documentation is updated
- [ ] IMAGE_LIBRARY_GUIDE.md reflects reality

---

**Next Steps After Completion:**
1. Upload more images to library (20-30 recommended)
2. Generate metadata for full library
3. Use in regular post generation workflow
4. Monitor image selection quality over time
5. Refine prompts based on results
