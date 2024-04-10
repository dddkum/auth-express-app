import { useQuery } from '@tanstack/react-query'

import $api from '../../../app/api/api.ts'
import background from '../../../shared/images/main_background.webp'
import { PageLoader } from '../../../shared/loaders'

export const MainPage = () => {
    const usersQuery = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            return $api.get('/users')
        },
        staleTime: 600000,
    })

    return (
        <>
            <PageLoader loading={usersQuery.isFetching} />
            {!usersQuery.isFetching && (
                <div className="position-relative">
                    <img
                        src={background}
                        className="w-100 h-100 position-fixed top-0 start-0 img-fluid"
                        style={{ zIndex: '-1' }}
                        alt="background"
                    />
                </div>
            )}
        </>
    )
}
