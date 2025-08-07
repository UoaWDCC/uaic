'use server'

import { getPayload } from 'payload'
import config from '@payload-config'

export const getImage = async (filename: string) => {
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'media',
    where: {
      filename: {
        equals: filename,
      },
    },
    limit: 1,
  })

  return result.docs?.[0]?.url ?? null
}
