type ExtractedImage = {
    src: string
    alt?: string
    width?: number
    height?: number
}

type ImageExtractionResult = {
    images: ExtractedImage[]
    htmlWithoutImages: string
}

export const extractImagesFromHtml = (html: string): ImageExtractionResult => {
    const parser = new DOMParser()
    const doc = parser.parseFromString(html, 'text/html')
    const images: ExtractedImage[] = []

    doc.querySelectorAll('img').forEach((img) => {
        const src = img.getAttribute('src')
        if (!src) return

        const alt = img.getAttribute('alt') || undefined
        const width = img.getAttribute('width')
        const height = img.getAttribute('height')

        images.push({
            src,
            alt,
            width: width ? parseInt(width) : undefined,
            height: height ? parseInt(height) : undefined,
        })

        // Remove the image from DOM
        img.remove()
    })

    return {
        images,
        htmlWithoutImages: doc.body.innerHTML,
    }
}

export default extractImagesFromHtml;