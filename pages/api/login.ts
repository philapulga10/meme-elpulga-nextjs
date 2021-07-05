// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next';

import api from '../../services/api';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const data = req.body;

  if (method !== 'POST') {
    res.statusCode = 200;
    res.json({
      status: 500,
      message: "Method is not allowed"
    })
  }

  try {
    const responseHeroku = await api.callJSON('/member/login.php', { method, data });

    res.statusCode = 200;
    res.json(responseHeroku);
  } catch (error) {
    res.statusCode = 200;
    res.json({
      status: 200,
      message: 'Internal Server Error'
    });
  }
}
