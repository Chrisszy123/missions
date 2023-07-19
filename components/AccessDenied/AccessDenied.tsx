import { signIn } from "next-auth/react"
import { Connect } from "../connectButton/ConnectButton"

interface Props {
  message: string
}

export default function AccessDenied({message}: Props) {
  return (
    <>
      <h1 className="text-lg text-center font-semibold">{message}</h1>
    </>
  )
}