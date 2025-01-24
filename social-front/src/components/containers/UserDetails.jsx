
export default function UserDetails({ user }) {
  const { email, avatarURL } = user;
  return (
    <div className="flex flex-col justify-center m-auto items-center bg-foreground/5 p-4">
      <img className="w-64 h-64 object-cover rounded-full" src={avatarURL || '/default-avatar.png'} />
      <a href={'mailto:' + email} className="text-center text-2xl font-bold underline w-full">
        {email}
      </a>
    </div>
  )
}
