import { ClipLoader } from 'react-spinners'

interface IButtonLoaderProps {
    color?: string
    size?: number
    loading: boolean
}
export const ButtonLoader = ({ color, size, loading }: IButtonLoaderProps) => {
    return (
        <ClipLoader
            color={color || 'black'}
            size={size || 35}
            loading={loading}
            speedMultiplier={0.5}
        />
    )
}
