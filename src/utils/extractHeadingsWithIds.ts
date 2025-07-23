type HeadingData = {
  id: string
  text: string
  level: number
}

const extractHeadingsWithIds = (html: string): HeadingData[] => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')
  const headings = doc.querySelectorAll('h1, h2, h3, h4, h5, h6')

  return Array.from(headings)
    .filter(h => h.id) // тільки ті, що мають id
    .map(h => ({
      id: h.id,
      text: h.textContent?.trim() || '',
      level: parseInt(h.tagName.replace('H', '')),
    }))
}

export default extractHeadingsWithIds;