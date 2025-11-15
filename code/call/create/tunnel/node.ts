import ngrok from '@ngrok/ngrok'

export async function createTunnelWithNGrok({
  port,
  token,
}: {
  port: number
  token: string
}) {
  const listener = await ngrok.forward({ addr: port, authtoken: token })
  return { url: listener.url(), listener }
}
