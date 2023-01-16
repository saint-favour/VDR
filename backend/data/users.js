import bcrypt from 'bcryptjs'

const users = [
    {
        username: 'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        username: 'Jerry',
        email: 'jerry@example.com',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        username: 'Saint Favour',
        email: 'saint@example.com',
        password: bcrypt.hashSync('123456', 10),
    },
]

export default users