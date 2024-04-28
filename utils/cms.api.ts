import axios from 'axios'

import { isCleanInput } from '~/utils/clean-input'
import { CMS_URL } from '~/utils/config'

interface CmsResponse<T> {
  data: T[];
  meta: never;
}

axios.interceptors.request.use(
  config => {
    config.headers['Authorization'] = `Bearer ${ process.env.NEXT_PUBLIC_CMS_API_KEY }`
    return config
  },
  error => {
    return Promise.reject(error)
  },
)

export const getPostBySlug = async (slug: string, locale?: string) => {
  if (!isCleanInput(slug)) {
    throw new Error('Invalid slug')
  }

  const localeParam = locale ? `&locale=${ locale }` : ''
  const { data: obj } = await axios.get<CmsResponse<Post>>(`${ CMS_URL }/posts?filters[slug][$eq]=${ slug }&populate[0]=seo&populate[1]=seo.metaImage&populate[2]=hero&populate[3]=category${ localeParam }`)
  return obj.data[0]
}

export const getAllPosts = async () => {
  const { data: obj } = await axios.get<CmsResponse<Post>>(`${ CMS_URL }/posts?filters[category][id][$eq]=1`)
  return obj.data
}

export const getUpdates = async (locale?: string) => {
  const localeParam = locale ? `?locale=${ locale }` : ''
  const { data: obj } = await axios.get<CmsResponse<Update>>(`${ CMS_URL }/updates${ localeParam }`)
  return obj.data
}

export const getBanners = async (location?: string, locale?: string) => {
  const additionalLocation = location ? `filters[location][$in][1]=${ location }&` : ''
  const query = `filters[location][$in][0]=all&${ additionalLocation }sort=createdAt:desc&pagination[start]=0&pagination[limit]=1`
  const localeParam = locale ? `&locale=${ locale }` : ''
  const { data: obj } = await axios.get<CmsResponse<Banner>>(`${ CMS_URL }/banners?${ query }${ localeParam }`)
  return obj.data
}
