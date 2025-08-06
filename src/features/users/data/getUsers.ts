'use server'

import { getPayload } from 'payload'
import config from '@payload-config'

export const getUsers = async () => {
  const payload = await getPayload({ config })
  const users = await payload.find({
    collection: 'users',
    depth: 1,
    pagination: false,
    sort: '_order',
  })

  return users.docs
}
