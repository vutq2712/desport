import Link from "next/link";

export default function Header() {
  return (
    <header className='app__main--header'>
      <div className='header-top'>
        This is header
        <br />
        <Link href='/'>Home</Link>
        <br />
        <Link href='/auth/login'>Login</Link>
        <br />
        <Link href='/auth/register'>Register</Link>
      </div>

      <div className='header-banner'>
        This is banner
      </div>

      <div className='header-bottom'>
        This is tournament name
      </div>
    </header>
  )
}
