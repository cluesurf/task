import Namecheap from 'namecheap'

const namecheap = new Namecheap(
  process.env.NAMECHEAP_USERNAME!,
  process.env.NAMECHEAP_KEY!,
  process.env.NAMECHEAP_IP!,
)

export default namecheap
