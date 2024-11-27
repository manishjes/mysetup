import productRoute from "../module/productRoute"
import userRoute from "../module/userRoute"

export default (app:any) =>{
    app.use('/api', productRoute)
    app.use('/api', userRoute)
}