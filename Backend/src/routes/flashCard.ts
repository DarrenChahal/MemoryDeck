import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign,verify } from 'hono/jwt'


export const flashCardRouter = new Hono<{
    Bindings: {  // way to define env varibale type
        DATABASE_URL: string;
        JWT_SECRET: string;
    }
    Variables:{
        userId: string;
    }
}>();

flashCardRouter.use('/*', async (c, next) =>{
    //get the header
    //verify the header
    // if header correct we can proced
    // if not correct we can return 403
    // extract user id
    // pass it doen to the router
    const header = c.req.header("authorization") || "";
    // Bearer token
    // const token = header.split(" ")[1]

    try{
        const user = await verify(header, c.env.JWT_SECRET);

        if(user){
            //@ts-ignore
            c.set("userId", user.id);
            await next()
        }
        else{
            c.status(403)
            return c.json({error: "unauthorized"})
        }
    }
    catch(e){
        c.status(403)
        return c.json({error: "unauthorized"})
    }
    
    
    

    
})

flashCardRouter.post('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL, // in hono u get env variable from c
    }).$extends(withAccelerate())

    const body = await c.req.json();
    const flashCard = await prisma.flashcard.create({
        data: {
            question: body.question,
            answer: body.answer,
            userId: c.get("userId"), // passed using middleware
            
        }
        
    })

	return c.json({
        id: flashCard.id
    })
})

flashCardRouter.put('/', async (c) => {
	const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL, // in hono u get env variable from c
    }).$extends(withAccelerate())

    const body = await c.req.json();
    const flashCard = await prisma.flashcard.update({
        where: {
            id: body.id
        }, 
        data: {
            question: body.question,
            answer: body.answer,
            
        }
        
    })

	return c.json({
        id: flashCard.id
    })
})

flashCardRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL, // in hono u get env variable from c
    }).$extends(withAccelerate())

    const flashCards = await prisma.flashcard.findMany({
        where:{
            userId: c.get("userId")
        }
    });

    return c.json({
        flashCards
    })
})

flashCardRouter.get('/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL, // in hono u get env variable from c
    }).$extends(withAccelerate())

    try{
        const id = c.req.param("id");
        const flashCard = await prisma.flashcard.findFirst({
            where: {
                id: id
            }  
        })

	    return c.json({
            flashCard
        });

    }catch(e){
        c.status(404);
        return c.json({
            message: "Error while fetching flashCard"
        })

    }
})

flashCardRouter.delete('/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL, 
    }).$extends(withAccelerate());

    try {
        const id = c.req.param("id");

        // Delete the flashcard with the given ID
        const flashCard = await prisma.flashcard.delete({
            where: {
                id: id,
                userId: c.get("userId"), // Ensure the user is deleting their own flashcard
            },
        });

        return c.json({
            message: 'Flashcard deleted successfully',
        });

    } catch (e) {
        c.status(404);
        return c.json({
            message: 'Error while deleting flashcard',
        });
    }
});





