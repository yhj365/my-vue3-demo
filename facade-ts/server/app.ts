import express, { Application, Request, Response, NextFunction } from 'express'
import bodyParser from 'body-parser'
import { fileOperator } from './utils'
import { ITodoData } from './typings'

const app: Application = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.all('*', (req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'POST,GET,PUT,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.get('/todoList', (req: Request, res: Response): void => {
  const todoList: string = fileOperator<ITodoData>('./todo.json') as string

  res.json({
    code: 200,
    data: JSON.parse(todoList),
  })
})
app.post('/toggle', (req: Request, res: Response): void => {
  const id: number = parseInt(req.body.id)

  fileOperator<ITodoData>('./todo.json', (todoList: ITodoData[]) => {
    return todoList.map((item: ITodoData): ITodoData => {
      if (item.id === id) {
        item.completed = !item.completed
      }
      return item
    })
  })

  res.json({
    code: 200,
    data: '操作成功',
  })
})
app.post('/add', (req: Request, res: Response): void => {
  const todo: ITodoData = req.body

  fileOperator<ITodoData>('./todo.json', (todoList: ITodoData[]) => {
    const isExist = todoList.find((item: ITodoData) => item.content === todo.content)
    if (isExist) {
      return res.json({
        code: 200,
        data: '已存在',
      })
    }
    return [...todoList, todo]
  })

  res.json({
    code: 200,
    data: '操作成功',
  })
})
app.post('/remove', (req: Request, res: Response): void => {
  const id: number = parseInt(req.body.id)

  fileOperator<ITodoData>('./todo.json', (todoList: ITodoData[]) => {
    return todoList.filter((item: ITodoData): boolean => item.id !== id)
  })

  res.json({
    code: 200,
    data: '操作成功',
  })
})

app.listen(3000, (): void => {
  console.log('server is running at http://localhost:3000')
})
