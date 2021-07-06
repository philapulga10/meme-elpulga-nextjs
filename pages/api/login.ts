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
    const currentTime = new Date();
    const nextYear = new Date(currentTime.getFullYear() + 1, currentTime.getMonth(), currentTime.getDay());

    const responseHeroku = await api.callJSON('/member/login.php', { method, data });

    if (responseHeroku.status === 200) {
      res.statusCode = 302;
      res.setHeader('Location', '/');
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('X-Token', 'value test');
      res.setHeader('Set-Cookie', `token=${responseHeroku.token}; expires=${nextYear.toUTCString()}; Path=/`);
      res.json(responseHeroku);
    } else {
      res.statusCode = 302;
      res.setHeader('Location', '/login?error=loginUnsuccessful');
      res.json(responseHeroku);
    }
  } catch (error) {
    res.statusCode = 200;
    res.json({
      status: 200,
      message: 'Internal Server Error'
    });
  }
}
