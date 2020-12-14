import { Router } from "express"
import { createUserController } from "./useCases/CreateUser"

const router = Router()

router.post('/users', (request, response) => {
    console.log('Creating user...')
    return createUserController.handle(request, response)
})

export { router }