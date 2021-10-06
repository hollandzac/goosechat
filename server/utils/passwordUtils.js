import pkg from "bcryptjs"
const {compare, hash} = pkg

export async function validPassword(password, hash){
    return await compare(password, hash)
    
}
export async function createPassowrd(password){
    return await hash(password, 10)
}