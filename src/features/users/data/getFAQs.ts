'use server'
import { getPayload } from 'payload'
import config from '@payload-config'

export const getFAQs = async (): Promise<any[]> => {
  const payload = await getPayload({ config })
  
  const faqs = await payload.find({
    collection: 'FAQ' as any,
    depth: 1,
    pagination: false,
    sort: 'createdAt',
  })
  
  return faqs.docs
}