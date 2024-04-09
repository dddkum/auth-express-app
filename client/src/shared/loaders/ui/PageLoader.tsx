import { PropagateLoader } from 'react-spinners'

interface IPageLoaderProps {
    color?: string
    size?: number
    loading?: boolean
}
export const PageLoader = ({ color, size, loading }: IPageLoaderProps) => {
    return (
        <PropagateLoader
            color={color || '#000000'}
            cssOverride={{}}
            loading={loading}
            size={size || 15}
            speedMultiplier={1}
            className='position-absolute top-50 start-50'
        />
    )
}
