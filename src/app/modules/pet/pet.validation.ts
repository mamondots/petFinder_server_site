import { z } from "zod";

const createPet = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required!",
    }),
    image: z.string({
      required_error: "Image is required!",
    }),
    species: z.string({
      required_error: "Species is required!",
    }),
    breed: z.string({
      required_error: "Breed is required!",
    }),
    color: z.string({
      required_error: "Color is required!",
    }),
    age: z.number({
      required_error: "Age is required!",
    }),
    gender: z.string({
      required_error: "Gender is required!",
    }),
    size: z.string({
      required_error: "Size is required!",
    }),
    location: z.string({
      required_error: "Location is required!",
    }),
    description: z.string({
      required_error: "Description is required!",
    }),
    temperament: z.string({
      required_error: "Temperament is required!",
    }),
    medicalHistory: z.string({
      required_error: "Medical History is required!",
    }),
    healthStatus: z.string({
      required_error: "Health status is required!",
    }),
    adoptionRequirements: z.string({
      required_error: "Adoption Requirements is required!",
    }),
  }),
});

const updatePet = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required!",
    }).optional(),
    image: z.string({
      required_error: "Image is required!",
    }).optional(),
    species: z.string({
      required_error: "Species is required!",
    }).optional(),
    breed: z.string({
      required_error: "Breed is required!",
    }).optional(),
    color: z.string({
      required_error: "Color is required!",
    }).optional(),
    age: z.number({
      required_error: "Age is required!",
    }).optional(),
    gender: z.string({
      required_error: "Gender is required!",
    }).optional(),
    size: z.string({
      required_error: "Size is required!",
    }).optional(),
    location: z.string({
      required_error: "Location is required!",
    }).optional(),
    description: z.string({
      required_error: "Description is required!",
    }).optional(),
    temperament: z.string({
      required_error: "Temperament is required!",
    }).optional(),
    medicalHistory: z.string({
      required_error: "Medical History is required!",
    }).optional(),
    healthStatus: z.string({
      required_error: "Health status is required!",
    }).optional(),
    adoptionRequirements: z.string({
      required_error: "Adoption Requirements is required!",
    }).optional(),
  }),
});

export const petValidation = {
  createPet,
  updatePet,
};
