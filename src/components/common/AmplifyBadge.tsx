import { Link, Image } from '@chakra-ui/react'

const ALCHEMY_URL = `https://alchemyapi.io/?r=badge:${process.env.NEXT_PUBLIC_BADGE_ID}`
const ALCHEMY_ANALYTICS_URL = `https://analytics.alchemyapi.io/analytics`

function logBadgeClick() {
  fetch(`${ALCHEMY_ANALYTICS_URL}/badge-click`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      badge_id: process.env.NEXT_PUBLIC_BADGE_ID,
    }),
  }).catch((err) => {
    console.log(err)
  })
}

const AmplifyBadge = () => {
  return (
    <Link href={ALCHEMY_URL} isExternal>
      <Image
        onClick={logBadgeClick}
        id="badge-button"
        width="240px"
        height="53px"
        src="https://static.alchemyapi.io/images/marketing/badge.png"
        alt="Alchemy Supercharged"
        objectFit="contain"
      />
    </Link>
  )
}

export default AmplifyBadge
