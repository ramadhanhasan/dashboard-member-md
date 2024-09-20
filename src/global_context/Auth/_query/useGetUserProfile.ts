import { useQuery, useQueryClient } from '@tanstack/react-query'

import getUserProfile from '../_repository/getUserProfile'

const useGetUserProfile = () => {
  const queryClient = useQueryClient()
  const { isFetching, error, data, refetch } = useQuery({
    queryKey: [`get-user-profile-data`],
    queryFn: () => getUserProfile(),
    enabled: false,
    staleTime: 0,
    
  })

  return {
    userProfile: data?.data,
    loadingUserProfile: isFetching,
    errorUserProfile: error,
    refetchUserProfile: refetch,
    invalidateUserProfile: () =>
      queryClient.invalidateQueries({
        queryKey: [`get-user-profile-data`],
      }),
  }
}

export default useGetUserProfile
