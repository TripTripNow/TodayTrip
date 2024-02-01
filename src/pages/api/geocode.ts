import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { address } = req.query;

  switch (req.method) {
    case 'GET':
      try {
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(String(address))}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}&language=ko`;
        const { data } = await axios.get(url);
        res.status(201).send(data.results[0].geometry.location);
      } catch (error) {
        res.status(404).end();
      }
      break;

    default:
      res.status(404).end();
      break;
  }
};

export default handler;
