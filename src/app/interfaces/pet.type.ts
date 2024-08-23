import { User } from "@prisma/client"

export type IPet = {
    name: string
    user: string
    image: string
    species: string
    breed: string
    age: number
    size: string
    location: string
    description: string
    temperament: string
    healthStatus: string
    medicalHistory: string
    adoptionRequirements: string
  }
  