import React from 'react'
import {NextSeo} from 'next-seo'
import Topic from '../components/topic'
import {find} from 'lodash'

import DefaultCTA from './default-cta'
import {VerticalResourceCollectionCard} from 'components/card/vertical-resource-collection-card'
import {CardResource} from '../../../types'

export enum CARD_TYPES {
  SUMMARY = 'summary',
  SUMMARY_LARGE_IMAGE = 'summary_large_image',
}

export type Topic = {
  name: string
  label: string
  title?: string
  description: string
}

type CuratedEssentialProps = {
  topic: Topic
  pageData?: any
  CTAComponent?: React.FC<any>
  ogImage?: string
  verticalImage?: string
  cardType?: CARD_TYPES
}

const SearchCuratedEssential: React.FC<CuratedEssentialProps> = ({
  topic,
  pageData,
  children,
  CTAComponent,
  ogImage,
  verticalImage,
  cardType = CARD_TYPES.SUMMARY_LARGE_IMAGE,
}) => {
  const location = `${topic.name} landing`
  const description = `Life is too short for long boring videos. Learn ${topic.label} using the best screencast tutorial videos online.`
  const title =
    topic.title ||
    `In-Depth ${topic.label} Tutorials for ${new Date().getFullYear()}`

  const beginner: any = find(pageData, {id: 'beginner'})
  const intermediate: any = find(pageData, {id: 'intermediate'})
  const advanced: any = find(pageData, {id: 'advanced'})

  return (
    <>
      <NextSeo
        description={description}
        title={title}
        titleTemplate={'%s | egghead.io'}
        twitter={{
          site: `@eggheadio`,
          cardType,
        }}
        openGraph={{
          title,
          description: description,
          site_name: 'egghead',
          images: [
            {
              url:
                ogImage ||
                `https://og-image-react-egghead.now.sh/topic/${topic.name}?orientation=landscape&v=20201104`,
            },
          ],
        }}
      />
      <div className="md:grid md:grid-cols-12 grid-cols-1 gap-5 items-start space-y-5 md:space-y-0 dark:bg-gray-900">
        <Topic
          className="col-span-8"
          title={topic.label}
          imageUrl={
            verticalImage ||
            `https://og-image-react-egghead.now.sh/topic/${topic.name}?orientation=portrait&v=20201104`
          }
        >
          {topic.description}
        </Topic>
        {CTAComponent ? <CTAComponent /> : <DefaultCTA location={location} />}
      </div>
      <ThreeLevels
        beginner={beginner}
        intermediate={intermediate}
        advanced={advanced}
        location={location}
      />
      {children}
    </>
  )
}

export default SearchCuratedEssential

export const ThreeLevels: React.FC<{
  beginner: CardResource
  intermediate: CardResource
  advanced: CardResource
  location?: string
}> = ({beginner, intermediate, advanced, location}) => {
  return (
    <>
      {beginner && intermediate && advanced && (
        <div className="grid md:grid-cols-3 grid-cols-1 gap-5 items-start mt-5">
          <VerticalResourceCollectionCard
            resource={beginner}
            location={location}
            className="h-full"
          />
          <VerticalResourceCollectionCard
            resource={intermediate}
            location={location}
            className="h-full"
          />
          <VerticalResourceCollectionCard
            resource={advanced}
            location={location}
            className="h-full"
          />
        </div>
      )}
    </>
  )
}
