import Link from 'next/link'
import moment from 'moment'
export default () => (
  <div>
    Hello World.
    <Link prefetch href='/about'>
      <a>About</a>
    </Link>
    <p>{moment().format()}</p>
  </div>
)
