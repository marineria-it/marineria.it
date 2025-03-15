import React, { FC, useCallback, useState } from 'react'
import { JobOfferTypes } from '@/api/types'
import { HStack, Loading, ListEmptyComponent, Divider } from '@/components/ui'
import JobOfferListItem from '@/components/JobOffers/JobOfferListItem'
import { useTranslation } from 'react-i18next'
import { getProUserOffers } from '@/api'
import { View, SafeAreaView, VirtualizedList } from 'react-native'
import { useAppState, useFetch } from '@/hooks'
import { useUser } from '@/Providers/UserProvider'

import JobOffersListHeader from '@/components/JobOffers/JobOffersListHeader'

const JobOfferList: FC = () => {
  const {
    t,
    i18n: { language },
  } = useTranslation()
  const { activeProfile } = useUser()

  const { token } = activeProfile as any

  const [ownOffers, setOwnOffers] = useState<string>('all')
  const state = useAppState()

  const fetchOffers = useCallback(async () => {
    return await getProUserOffers(token, language, ownOffers == 'all')
  }, [language, ownOffers, state])

  const { isLoading, data } = useFetch(fetchOffers)

  const onChange = (v: string) => setOwnOffers(v)

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
            ListHeaderComponent={() => (
              <HStack className="mb-2  p-3 items-center bg-white rounded">
                <JobOffersListHeader setOwnOffersFilter={onChange} filterValue={ownOffers} />
              </HStack>
            )}
            stickyHeaderIndices={[0]}
          />
        </View>
      )}
    </>
  )
}

export default JobOfferList
