import sanityClient from '@sanity/client'

export const client = sanityClient({
  projectId: '1qdyjcg9',
  dataset: 'production',
  apiVersion: '2021-10-21', // use current UTC date - see "specifying API version"!
  token:
    'skjrCswJV0zR4kYaUusv63SSYocLoDYMGwni1X8UbRM6zT50fM3RkVU6IfE3Ni2bwhdWeMTRvsJB6ck2K1W0lld4X8WPdmGlScgzbgfslDFlCoNIkaxhgi61lfihtij89G5kCPDuXNPz5oL2JvZ8oHXWX2xDdtIugabxiT82b3z0FX0diXT6', // or leave blank for unauthenticated usage
  useCdn: false, // `false` if you want to ensure fresh data
})
