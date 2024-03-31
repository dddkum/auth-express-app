import { useQuery } from '@tanstack/react-query'
import $api from '../../../app/api/api.ts'
import { PageLoader } from '../../../shared/loaders'

export const MainPage = () => {
    const usersQuery = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            return $api.get('/users')
        },
    })

    return (
        <>
            <PageLoader loading={usersQuery.isFetching} color="#fed321" />
            {!usersQuery.isFetching && <div>asifaisghiagsiua</div>}
        </>
    )
}
