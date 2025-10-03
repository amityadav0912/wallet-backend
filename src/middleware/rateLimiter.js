import ratelimit from "../config/upstash.js";

const rateLimiter = async(req, res, next)=>{
    try {
        const {success} = await ratelimit.limit("My-rate-limit");

        if(!success){
            return res.status(429).json(
                {
                    "message": "Too many requests per minute"
                }
            )
        }

        next()
    } catch (error) {
        console.log("Error in rate Limiter", error)
    }
}

export default rateLimiter; 