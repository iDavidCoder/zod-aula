import z from 'zod';

const schema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    age: z.number().min(18).max(120),
    status: z.boolean(),
    characteristcs: z.array(
        z.object({
            name: z.string(),
            value: z.number()
        })
    )
});

type User = z.infer<typeof schema>;

let data: User = {
    name: "David",
    email: "david@gmail.com",
    age: 20,
    status: true,
    characteristcs: [
        { name: "dinheiro", value: 10 },
        { name: "banco", value: 1}
    ]
}

const result = schema.parse(data);

console.log(result)


