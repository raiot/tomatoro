import axios from 'axios'

import { CMS_URL } from '~/utils/config'

interface CmsResponse<T> {
  data: T[];
  meta: never;
}

interface CmsSingleEntryResponse<T> {
  data: T;
  meta: never;
}

export const getStaticPage = async (slug: string) => {
  const { data: obj } = await axios.get<CmsSingleEntryResponse<StaticPage>>(`${ CMS_URL }/${ slug }?populate[0]=seo&populate[1]=seo.image`)
  return obj.data
}

export const getPostBySlug = async (slug: string) => {
  const { data: obj } = await axios.get<CmsResponse<Post>>(`${ CMS_URL }/posts?filters[slug][$eq]=${ slug }&populate[1]=hero&populate[2]=seo&populate[3]=seo.image`)
  return obj.data[0]
}

export const getAllPosts = async () => {
  const { data: obj } = await axios.get<CmsResponse<Post>>(`${ CMS_URL }/posts?filters[category][title][$eq]=Blog`)
  return obj.data
}

export const getUpdates = async () => {
  const { data: obj } = await axios.get<CmsResponse<Update>>(`${ CMS_URL }/updates`)
  return obj.data
}