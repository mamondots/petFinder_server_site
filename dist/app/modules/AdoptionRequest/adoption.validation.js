"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adoptionRequestSchema = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const createAdoptionRequest = zod_1.z.object({
    body: zod_1.z.object({
        petId: zod_1.z.string({
            required_error: "PetId is required!",
        }),
        petsHousehold: zod_1.z.string({
            required_error: "Pets household is required!",
        }),
        petsNeutered: zod_1.z.string({
            required_error: "Pets Neutered is required!",
        }),
        secureOutdoorArea: zod_1.z.string({
            required_error: "Secure outdoor area is required!",
        }),
        animalSleep: zod_1.z.string({
            required_error: "Animal sleep is required!",
        }),
        animalAlonePeriodsTime: zod_1.z.string({
            required_error: "Animal alone periods time is required!",
        }),
        detailsSupport: zod_1.z.string({
            required_error: "Details support time is required!",
        }),
        petOwnershipExperience: zod_1.z.string({
            required_error: "Pet Ownership Experience is required!",
        }),
    }),
});
const updateAdoptionRequest = zod_1.z.object({
    body: zod_1.z.object({
        petId: zod_1.z
            .string({
            required_error: "PetId is required!",
        })
            .optional(),
        petsHousehold: zod_1.z
            .string({
            required_error: "Pets household is required!",
        })
            .optional(),
        petsNeutered: zod_1.z
            .string({
            required_error: "Pets Neutered is required!",
        })
            .optional(),
        secureOutdoorArea: zod_1.z
            .string({
            required_error: "Secure outdoor area is required!",
        })
            .optional(),
        animalSleep: zod_1.z
            .string({
            required_error: "Animal sleep is required!",
        })
            .optional(),
        animalAlonePeriodsTime: zod_1.z
            .string({
            required_error: "Animal alone periods time is required!",
        })
            .optional(),
        detailsSupport: zod_1.z
            .string({
            required_error: "Details support time is required!",
        })
            .optional(),
        petOwnershipExperience: zod_1.z
            .string({
            required_error: "Pet Ownership Experience is required!",
        })
            .optional(),
    }),
});
const updateAdoptionRequestStatus = zod_1.z.object({
    body: zod_1.z.object({
        status: zod_1.z.enum([
            client_1.RequestStatus.PENDING,
            client_1.RequestStatus.APPROVED,
            client_1.RequestStatus.REJECTED,
        ]),
    }),
});
exports.adoptionRequestSchema = {
    createAdoptionRequest,
    updateAdoptionRequest,
    updateAdoptionRequestStatus,
};
