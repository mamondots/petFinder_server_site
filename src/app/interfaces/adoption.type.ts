import { AnimelSleep, OpinionOption } from "@prisma/client";

export type IAdoptionRequest = {
  petId: string;
  petOwnershipExperience: string;
  petsHousehold: string;
  petsNeutered: OpinionOption;
  secureOutdoorArea: OpinionOption;
  animalSleep: AnimelSleep;
  animalAlonePeriodsTime: OpinionOption;
  detailsSupport: string;
};
