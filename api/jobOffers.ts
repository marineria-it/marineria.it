import { API } from './const'
import { JobOfferType } from './types/jobOffer'
import { ErrorResponse } from './types/errors'

// Get All offers without token
export const getAllListedOffers = async (
  language: string,
  ownerToken?: string
): Promise<JobOfferType[] | ErrorResponse> => {
  const url = `${API.OWNER_OFFERS}${ownerToken ? `/${ownerToken}` : ''}?language=${language}`

  try {
    const response = await fetch(url)
    const data = await response.json()

    if (response.ok) {
      return data as JobOfferType[]
    } else {
      return data as ErrorResponse
    }
  } catch (e) {
    throw e
  }
}

// Get Pro user All Offers
export const getProUserOffers = async (
  proToken: string,
  language: string,
  allOffers?: boolean
): Promise<JobOfferType[] | ErrorResponse> => {
  try {
    const url = API.PRO_OFFERS + `${allOffers ? '/AllOffers' : ''}/${proToken}?language=${language}`

    const response = await fetch(url)
    const data = await response.json()

    if (response.ok) {
      return data as JobOfferType[]
    } else {
      return data as ErrorResponse
    }
  } catch (e) {
    throw e
  }
}

// Get pro user offer by id
export const getProOfferById = async (
  offerId: string,
  proToken: string,
  language: string
): Promise<JobOfferType[] | ErrorResponse> => {
  const url = API.PRO_OFFERS + `/${offerId}/${proToken}?language=${language}`
  try {
    const response = await fetch(url)
    const data = await response.json()

    if (response.ok) {
      return data as JobOfferType[]
    } else {
      return data as ErrorResponse
    }
  } catch (e) {
    throw e
  }
}

// Apply for an offer
export const applyToOffer = async (
  proToken: string,
  offerId: number,
  language: string
): Promise<ErrorResponse | any> => {
  const url = API.PRO_OFFERS + `/Apply/${offerId}/${proToken}?language=${language}`
  try {
    const response = await fetch(url)
    const data = await response.json()
    if (response.ok) {
      return data as any
    } else {
      return data as ErrorResponse
    }
  } catch (e) {
    throw e
  }
}

// Get OWner Listed Offers
export const getOwnerListedOffers = async (
  ownerToken: string,
  language: string
): Promise<JobOfferType[] | ErrorResponse> => {
  const url = API.OWNER_OFFERS + `/${ownerToken}?language=${language}`
  try {
    const response = await fetch(url)
    const data = await response.json()

    if (response.ok) {
      return data as JobOfferType[]
    } else {
      return data as ErrorResponse
    }
  } catch (e) {
    throw e
  }
}

// Get owner offer by id
export const getOwnerOfferById = async (
  offerId: string,
  ownerToken: string,
  language: string
): Promise<any | ErrorResponse> => {
  const url = API.OWNER_OFFERS + `/${offerId}/${ownerToken}?language=${language}`
  try {
    const response = await fetch(url)
    const data = await response.json()

    if (response.ok) {
      return data as JobOfferType[]
    } else {
      return data as ErrorResponse
    }
  } catch (e) {
    throw e
  }
}
