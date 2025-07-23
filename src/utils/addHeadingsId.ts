export const generateId = (text: string) => {
    return text
        .toLowerCase()
        .replace(/[^a-zа-яіїєґ0-9]+/gi, '-') // заміна всіх не-літер/цифр на -
        .replace(/^-+|-+$/g, '') // обрізати тире з початку/кінця
}

const addHeadingsId = (html: string): string => {
    const parser = new DOMParser()
    const doc = parser.parseFromString(html, 'text/html')
    const headings = doc.querySelectorAll('h1, h2, h3, h4, h5, h6')

    const usedIds = new Set<string>()

    headings.forEach((heading) => {
        const text = heading.textContent?.trim() || ''
        let id = generateId(text)

        // Забезпечити унікальність
        let suffix = 1
        const originalId = id
        while (usedIds.has(id)) {
            id = `${originalId}-${suffix++}`
        }

        usedIds.add(id)
        heading.id = id
    })

    return doc.body.innerHTML
}

export default addHeadingsId;