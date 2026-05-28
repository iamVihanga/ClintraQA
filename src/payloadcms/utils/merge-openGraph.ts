import type { Metadata } from 'next'

import { getServerSideURL } from './get-url'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description: 'GCP QA & TMF Audit Consultancy',
  images: [
    {
      url: `${getServerSideURL()}/website-template-OG.webp`,
    },
  ],
  siteName: 'ClintraQA',
  title: 'ClintraQA',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
