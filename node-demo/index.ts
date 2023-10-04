import express, { Express, Router, Request, Response } from 'express'
import axios from 'axios'
// const axios = require('axios')

const app: Express = express()

const router: Router = express.Router()

app.use('/api', router)

router.get('/list', async (req: Request, res: Response) => {
  const result = await axios.post('')
  return res.json({
    data: result?.data,
  })
})
router.get('/login', async (req: Request, res: Response) => {
  res.header('Access-Control-Allow-Origin', '*')
  if (req.query.user === 'admin' && req.query.password === '123456') {
    res.json({
      route: [
        {
          path: '/demo1',
          name: 'demo1',
          component: 'demo1.vue',
        },
        {
          path: '/demo2',
          name: 'demo2',
          component: 'demo2.vue',
        },
        {
          path: '/demo3',
          name: 'demo3',
          component: 'demo3.vue',
        },
      ],
    })
  } else if (req.query.user === 'admin2' && req.query.password === '123456') {
    res.json({
      route: [
        {
          path: '/demo1',
          name: 'demo1',
          component: 'demo1.vue',
        },
        {
          path: '/demo2',
          name: 'demo2',
          component: 'demo2.vue',
        },
      ],
    })
  } else {
    res.json({
      code: 400,
      msg: '账号密码错误',
    })
  }

  return res
})

app.listen(3333, () => {
  console.log(`sucess server http://localhost:3333`)
})
