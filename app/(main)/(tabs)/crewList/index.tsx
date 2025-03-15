import React, { FC, useCallback, useEffect, useState } from 'react'
import { JobOfferTypes } from '@/api/types'
import { HStack, Loading, ListEmptyComponent, Divider } from '@/components/ui'
import JobOfferListItem from '@/components/JobOffers/JobOfferListItem'
import { useTranslation } from 'react-i18next'
import { getAllListedOffers, getProUserOffers, getOwnerListedOffers } from '@/api'
import { View, SafeAreaView, VirtualizedList } from 'react-native'
import { useAppState, useFetch } from '@/hooks'
import { useUser } from '@/Providers/UserProvider'
import { AuthTypes } from '@/api/types'
import JobOffersListHeader from '@/components/JobOffers/JobOffersListHeader'
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context'

const OwnerOffersList: FC = () => {
  const {
    t,
    i18n: { language },
  } = useTranslation()
  const { activeProfile } = useUser()

  const { token } = activeProfile as any

  const state = useAppState()

  const fetchOffers = useCallback(async () => {
    return await getOwnerListedOffers(token, language)
  }, [language, state])

  const { isLoading, data } = useFetch(fetchOffers)

  const insets = useSafeAreaInsets()

  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && data && (
        <View className="h-full">
          <VirtualizedList
            data={data}
            getItemCount={(data: JobOfferTypes.JobOfferType[]) => data?.length}
            getItem={(data: JobOfferTypes.JobOfferType[], index) => data[index]}
            keyExtractor={(item) => item.reference}
            renderItem={({ item }) => <JobOfferListItem offer={item} key={item.reference} />}
            initialNumToRender={4}
            ListEmptyComponent={<ListEmptyComponent message={t('noJobOffers')} />}
            refreshing={!!data?.length}
            ItemSeparatorComponent={() => <Divider className=" bg-secondary-800 h-4" />}
            stickyHeaderIndices={[0]}
          />
        </View>
      )}
    </>
  )
}

export default OwnerOffersList
