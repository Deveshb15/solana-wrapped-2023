export default async function handler(req, res) {
  const {
    query: { address },
    method,
  } = req

  switch (method) {
    case 'GET':
      try {
        const data = {"address": address, "data": "data"}
        res.status(200).json(data)
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}