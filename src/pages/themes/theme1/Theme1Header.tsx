
import Navbar from '../../../components/Navbar'

type Props = {
    business: any
}

const Theme1Header = ({ business }: Props) => {
    return (
        <Navbar business={business} />
    )
}

export default Theme1Header