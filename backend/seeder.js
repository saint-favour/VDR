import mongoose from 'mongoose'
import { config } from 'dotenv'
config()
import colors from 'colors'
import users from './data/users.js'
import episodes from './data/episodes.js'
import User from './models/userModel.js'
import connectDB from './config/db.js'
import Record from './models/recordModel.js'

connectDB()

const importData = async () => {
  try {
    await Record.deleteMany()
    await User.deleteMany()

    const createdUsers = await User.insertMany(users)

    const adminUser = createdUsers[0]._id

    const sampleRecords = records.map(record => {
      return { ...record, user: adminUser }
    })

    await Record.insertMany(sampleRecords)

    console.log('Data Imported'.green.inverse)
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1) 
  }
} 


const destroyData = async () => {
  try {
    await Record.deleteMany()
    await User.deleteMany()

    console.log('Data Destroyed'.red.inverse)
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1) 
  }
} 

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
