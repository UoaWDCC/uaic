'use server'
import { getPayload } from 'payload'
import config from '@payload-config'

export interface Bulletin {
  id: string
  title: string
  issueNumber: number
  publishDate: string
  description?: string
  bulletinCover: {
    url: string
    alt?: string
  }
  bulletinPDF: {
    url: string
    alt?: string
  }
}

export const getBulletins = async (): Promise<Bulletin[]> => {
  const payload = await getPayload({ config })

  try {
    const result = await payload.find({
      collection: 'bulletin',
      limit: 100,
      sort: '-publishDate',
      depth: 1,
    })

    return result.docs.map((doc: any) => ({
      id: doc.id,
      title: doc.title,
      issueNumber: doc.issueNumber,
      publishDate: doc.publishDate,
      description: doc.description,
      bulletinCover: doc.bulletinCover
        ? {
            url: doc.bulletinCover.url,
            alt: doc.bulletinCover.alt || doc.title,
          }
        : undefined,
      bulletinPDF: doc.bulletinPDF
        ? {
            url: doc.bulletinPDF.url,
            alt: doc.bulletinPDF.alt || doc.title,
          }
        : undefined,
    }))
  } catch (error) {
    console.error('Error fetching bulletins:', error)
    return []
  }
}

// --- New helper for latest bulletin ---
export const getLatestBulletin = async (): Promise<Bulletin | null> => {
  const bulletins = await getBulletins()
  if (bulletins.length === 0) return null
  return bulletins[0] // because bulletins are sorted newest first
}