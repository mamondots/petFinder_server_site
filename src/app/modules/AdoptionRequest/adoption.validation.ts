import { RequestStatus } from "@prisma/client";
import { z } from "zod";

const createAdoptionRequest = z.object({
  body: z.object({
    petId: z.string({
      required_error: "PetId is required!",
    }),
    petsHousehold: z.string({
      required_error: "Pets household is required!",
    }),
    petsNeutered: z.string({
      required_error: "Pets Neutered is required!",
    }),
    secureOutdoorArea: z.string({
      required_error: "Secure outdoor area is required!",
    }),
    animalSleep: z.string({
      required_error: "Animal sleep is required!",
    }),
    animalAlonePeriodsTime: z.string({
      required_error: "Animal alone periods time is required!",
    }),
    detailsSupport: z.string({
      required_error: "Details support time is required!",
    }),
    petOwnershipExperience: z.string({
      required_error: "Pet Ownership Experience is required!",
    }),
  }),
});

const updateAdoptionRequest = z.object({
  body: z.object({
    petId: z
      .string({
        required_error: "PetId is required!",
      })
      .optional(),
    petsHousehold: z
      .string({
        required_error: "Pets household is required!",
      })
      .optional(),
    petsNeutered: z
      .string({
        required_error: "Pets Neutered is required!",
      })
      .optional(),
    secureOutdoorArea: z
      .string({
        required_error: "Secure outdoor area is required!",
      })
      .optional(),
    animalSleep: z
      .string({
        required_error: "Animal sleep is required!",
      })
      .optional(),
    animalAlonePeriodsTime: z
      .string({
        required_error: "Animal alone periods time is required!",
      })
      .optional(),
    detailsSupport: z
      .string({
        required_error: "Details support time is required!",
      })
      .optional(),
    petOwnershipExperience: z
      .string({
        required_error: "Pet Ownership Experience is required!",
      })
      .optional(),
  }),
});

const updateAdoptionRequestStatus = z.object({
  body: z.object({
    status: z.enum([
      RequestStatus.PENDING,
      RequestStatus.APPROVED,
      RequestStatus.REJECTED,
    ]),
  }),
});

export const adoptionRequestSchema = {
  createAdoptionRequest,
  updateAdoptionRequest,
  updateAdoptionRequestStatus,
};
